const multer = require("multer");
const splitFile = require("split-file");
const path = require("path");

const FileModel = require("../models/file.model");

const dss = require("../utils/dss.utils");

const key = Buffer.from(process.env.DEFAULT_KEY, "hex");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ".");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

module.exports.allFiles = async (req, res) => {
  await FileModel.find((err, docs) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else res.status(200).json(docs);
  });
};

module.exports.getInfos = async (req, res) => {
  await FileModel.findById(req.params.id, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else res.status(200).json(doc);
  });
};

module.exports.addFile = async (req, res) => {
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
      .splitFile(ciphered_file, req.body.chunks)
      .then(async (chunks) => {
        dss.remove_chunks([ciphered_file]);
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

          await dss.deploy_chunks(strategy);
          //dss.remove_chunks(chunks);
        } catch (error) {
          console.log(error);
          //dss.remove_chunks(chunks);
        }
      })
      .catch((err) => {
        //dss.remove_chunks([ciphered_file]);
        return res.status(500).json(err);
      });

    return res.status(200).send(req.file);
  });
};

module.exports.downloadFile = async (req, res) => {
  try {
    await FileModel.findById(req.params.id, (err, doc) => {
      if (err) {
        res.status(404).send("No file with this ID");
      } else {
        console.log(doc.strategy);
        dss.get_chunks(doc.strategy);

        let names = [];
        doc.strategy.forEach((element) => {
          names = [...names, element["chunk"]];
        });

        splitFile
          .mergeFiles(names, names[0].slice(0, -9))
          .then(() => {
            dss.decipher_file_AES256(
              names[0].slice(0, -9),
              names[0].slice(0, -18),
              key
            );
            var options = {
              root: path.join(__dirname, ".."),
            };
            res.sendFile(names[0].slice(0, -18), options);
          })
          .catch((err) => {
            console.log("Error: ", err);
          });
      }
    });
  } catch (error) {
    res.status(500).send("Unable to get file strategy");
  }
};
