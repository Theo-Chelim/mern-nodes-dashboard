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
  const example = [
    {
      name: "Edge1",
      arch: "arm64",
      machine: "virt",
      cpu: "cortex-a59",
      smp: 2,
      memory: 256,
    },
  ];
  if (!verify_smp_limit(example)) {
  } else if (!verify_memory_limit(example)) {
  } else {
    example.forEach(edge => {
      
    });
    res.status(200).json({});
  }
  
};

module.exports.start = (req, res) => {
  // Get information of edge from database
  // Verify if edge.pid exist 
  // Exec bash command to start qemu
};

module.exports.stop = (req, res) => {
  // Verify if edge.pid exist
  // Exec kill command
};

module.exports.reboot = (req, res) => {
  // stop edge bash command
  // start edge bash command
};

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
