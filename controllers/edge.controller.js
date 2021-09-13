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

module.exports.updateConfig = async (req, res) => {
  console.log(req.body);
  const examples = [];
  [...Array(10).keys()].map((i) => {
    examples.push({
      id: i + 11,
      arch: "arm64",
      machine: "virt",
      cpu: "cortex-a57",
      smp: 1,
      memory: 256,
    });
  });

  console.log(examples);
  if (!edgeUtils.verify_smp_limit(examples)) {
    res.status(403).json("Max number of cores exceeded");
  } else if (!edgeUtils.verify_memory_limit(examples)) {
    res.status(403).json("Memory limit exceeded");
  } else {
    // others verifications

    // stop edges

    await EdgeModel.deleteMany({}, () => console.log("Flush edges database"));

    for (const edge of examples) {
      await new EdgeModel(edge).save();
      edgeUtils.start_qemu_edge(
        edge.id,
        edge.machine,
        edge.arch,
        edge.cpu,
        edge.smp,
        edge.memory
      );
    }
    res.status(200).json();
  }
};

module.exports.start = async (req, res) => {
  await EdgeModel.findOne({ id: req.params.id }, (error, doc) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (doc) {
        if (!edgeUtils.status_qemu_edge(req.params.id)) {
          const ret = edgeUtils.start_qemu_edge(
            req.params.id,
            doc.machine,
            doc.arch,
            doc.cpu,
            doc.smp,
            doc.memory
          );
          res.status(200).json();
        } else {
          res.status(400).json("Edge already started");
        }
      } else {
        res.status(400).json("No edge with this id");
      }
    }
  });
};

module.exports.stop = async (req, res) => {
  await EdgeModel.findOne({ id: req.params.id }, async (error, doc) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (doc) {
        const status = await edgeUtils.status_qemu_edge(req.params.id);
$        if (status) {
          const ret = edgeUtils.stop_qemu_edge(req.params.id);
          res.status(200).json();
        } else {
          res.status(400).json("Edge not started");
        }
      } else {
        res.status(400).json("No edge with this id");
      }
    }
  });
};

module.exports.reboot = async (req, res) => {
  await EdgeModel.findOne({ id: req.params.id }, (error, doc) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (doc) {
        edgeUtils.stop_qemu_edge(req.params.id);
        const ret = edgeUtils.start_qemu_edge(
          req.params.id,
          doc.machine,
          doc.arch,
          doc.cpu,
          doc.smp,
          doc.memory
        );
        res.status(200).json();
      } else {
        res.status(400).json("No edge with this id");
      }
    }
  });
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
