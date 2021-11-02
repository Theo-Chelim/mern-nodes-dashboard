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
  const edges_config = req.body;

  //console.log(edges_config);
  if (!edgeUtils.verify_smp_limit(edges_config)) {
    res.status(403).json("Max number of cores exceeded");
  } else if (!edgeUtils.verify_memory_limit(edges_config)) {
    res.status(403).json("Memory limit exceeded");
  } else {
    // others verifications

    // stop edges

    await EdgeModel.deleteMany({}, () => console.log("Flush edges database"));

    for (const edge of edges_config) {
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
  if (parseInt(req.params.id) >= 1 && parseInt(req.params.id) <= 10) {
    res.status(403).json("No start for rpi");
  } else {
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
  }
};

module.exports.stop = async (req, res) => {
  if (parseInt(req.params.id) >= 1 && parseInt(req.params.id) <= 10) {
    let ret = edgeUtils.stop_rpi(req.params.id);
    if(ret) {
      res.status(200).json();
    } else {
      res.status(400).json("Error to stop Rpi");
    }
  } else {
    await EdgeModel.findOne({ id: req.params.id }, async (error, doc) => {
      if (error) {
        res.status(500).json(error);
      } else {
        if (doc) {
          const status = await edgeUtils.status_qemu_edge(req.params.id);
          if (status) {
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
  }
};

module.exports.reboot = async (req, res) => {
  if (parseInt(req.params.id) >= 1 && parseInt(req.params.id) <= 10) {
    let ret = edgeUtils.restart_rpi(req.params.id);
    if (ret) {
      res.status(200).json();
    } else {
      res.status(400).json("Error to stop Rpi");
    }
  } else {
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
  }
};

module.exports.stress = (req, res) => {};

module.exports.getAvailability = async (req, res) => {
  const available = await edgeUtils.get_availability(req.params.id);
  res.status(200).json({ available });
};

module.exports.getCpuAvailable = async (req, res) => {
  const cpu = await edgeUtils.get_cpu_available(req.params.id);
  res.status(200).json({ cpu });
};

module.exports.getCpuCapacity = async (req, res) => {
  const cpu = await edgeUtils.get_cpu_capacity(req.params.id);
  res.status(200).json({ cpu });
};

module.exports.getStorageUsage = async (req, res) => {
  const storage = await edgeUtils.get_available_storage(req.params.id);
  res.status(200).json({ storage });
};
