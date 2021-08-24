const child_process = require("child_process");

const edgeUtils = require("../utils/edge.utils");

const EdgeModel = require("../models/edge.model");

module.exports.allEdges = async (req, res) => {
  await EdgeModel.find((err, docs) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else res.status(200).json(docs);
  });
};

module.exports.updateConfig = (req, res) => {
  console.log(req.body);
  const example = []
  res.status(200).json({});
};

module.exports.start = (req, res) => {};
module.exports.stop = (req, res) => {};
module.exports.reboot = (req, res) => {};
module.exports.stress = (req, res) => {};

module.exports.getAvailability = async (req, res) => {
  const available = await edgeUtils.get_availability(req.params.id);
  res.status(200).json({ available });
};

module.exports.getCpuUsage = async (req, res) => {
  const cpu = await edgeUtils.get_cpu_usage(req.params.id);
  res.status(200).json({ cpu });
};

module.exports.getStorageUsage = async (req, res) => {
  const storage = await edgeUtils.get_available_storage(req.params.id);
  res.status(200).json({ storage });
};
