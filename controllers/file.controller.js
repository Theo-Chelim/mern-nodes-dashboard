const multer = require("multer");
const splitFile = require("split-file");

const FileModel = require("../models/file.model");

<<<<<<< HEAD
const dss = require("../utils/dss.utils");
=======
const dss = require("../utils/secure_storage");
>>>>>>> bf35cc804fc77d2a66795201b6e678797d64eede

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
};
