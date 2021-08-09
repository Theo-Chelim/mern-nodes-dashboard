const express = require("express");
const cors = require("cors");
const http = require("http");
const ping = require("ping");
const multer = require("multer");
const os = require("os");
const pty = require("node-pty");
const splitFile = require("split-file");
const mongoose = require("mongoose");

const dss = require("./secure_storage");

const FileModel = require("./models/file.model");

mongoose
  .connect(`mongodb://localhost:27017/ionet`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to mongoose"))
  .catch((err) => console.log("Unable to connect to mongoose", err));

const app = express();

const PORT = 9000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const key = Buffer.from(
  "f3c5609f082fed1bf6176f84a4ccbda44e0ec570fe43be5e9cc83a2804c0652b",
  "hex"
);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ".");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

app.get("/api/available/:id", async (req, res) => {
  var host = "127.0.0.1";
  if (req.params.id == 6) {
    host = "172.16.100." + req.params.id;
  }
  const cfg = {
    timeout: 2,
    extra: ["-i", "2"],
  };
  await ping.sys.probe(
    host,
    function (isAlive) {
      res.status(200).json({ available: isAlive });
    },
    cfg
  );
});

app.get("/api/files", async (req, res) => {
  await FileModel.find((err, docs) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else res.status(200).json(docs);
  });
});

app.get("/api/file/:id/infos", async (req, res) => {
  await FileModel.findById(req.params.id, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else res.status(200).json(doc);
  });
});

app.post("/api/file", async (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    ciphered_file = req.file.path + ".ciphered";

    dss.cipher_file_AES256(req.file.path, ciphered_file, key);

    dss.remove_chunks([req.file.path]);

    splitFile
      .splitFile(ciphered_file, 3)
      .then(async (chunks) => {
        dss.remove_chunks([ciphered_file]);
        console.log(chunks);
        try {
          let strategy = [];
          await FileModel.find({ name: req.file.path }, (err, docs) => {
            if (err || docs.length == 0) {
              const edges = [...Array(10).keys()].map((x) => "Edge" + (x + 1));
              strategy = dss.random_optimization(chunks, edges);
              const newFile = new FileModel({
                name: req.file.path,
                strategy: strategy,
              });
              newFile.save();
            } else {
              strategy = docs[0].strategy;
              docs[0].update();
            }
          });

          console.log(strategy);

          /* dss.deploy_chunks(strategy); */
          dss.remove_chunks(chunks);
        } catch (error) {
          console.log(error);
          dss.remove_chunks(chunks);
        }
      })
      .catch((err) => {
        dss.remove_chunks([ciphered_file]);
        return res.status(500).json(err);
      });

    return res.status(200).send(req.file);
  });
});

const server = http.createServer(app);

/* const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New connection user");
  const shell = os.platform() === "win32" ? "pwsh.exe" : "bash";

  let ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 250,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env,
  });

  ptyProcess.on("data", function (data) {
    console.log(data);
    socket.emit("data", data);
  });

  socket.on("input", function (data) {
    ptyProcess.write(data + "\r");
  });

  socket.on("disconnect", function () {
    ptyProcess.destroy();
    console.log("bye");
  });
}); */

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
