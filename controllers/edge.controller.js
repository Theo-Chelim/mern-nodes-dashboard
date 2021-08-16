<<<<<<< HEAD
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
=======
const ping = require("ping");
const child_process = require("child_process");

module.exports.allEdges = (req, res) => {};
module.exports.updateConfig = (req, res) => {};
>>>>>>> bf35cc804fc77d2a66795201b6e678797d64eede

module.exports.start = (req, res) => {};
module.exports.stop = (req, res) => {};
module.exports.reboot = (req, res) => {};
module.exports.stress = (req, res) => {};

module.exports.getAvailability = async (req, res) => {
<<<<<<< HEAD
  var host = "172.16.100." + req.params.id;
  const available = await edgeUtils.get_availability(host);
  res.status(200).json({ available });
};

module.exports.getCpuUsage = async (req, res) => {
  const host = "172.16.100." + req.param.id;
  const cpu = await edgeUtils.get_cpu_usage(host);
  res.status(200).json({ cpu });
};

module.exports.getStorageUsage = async (req, res) => {
  const host = "172.16.100." + req.param.id;
  const storage = await edgeUtils.get_available_storage(host);
  res.status(200).json({ storage });
=======
  if (req.params.id > 0) {
    const host = "172.16.100." + req.params.id;
    const cfg = {
      timeout: 2,
      extra: ["-c", "2"],
    };
    await ping.sys.probe(
      host,
      function (isAlive) {
        res.status(200).json({ available: isAlive });
      },
      cfg
    );
  } else {
    res.status(500).json("ID not valid");
  }
};

module.exports.getCpuUsage = (req, res) => {
  child_process.exec(
    "ssh " + edge + " vmstat 1 2 | awk 'NR==4 {print ($13+$14)}'",
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return null;
      }
      if (stderr) {
        return null;
      }
      return stdout.substring(0, 3);
    }
  );
};

module.exports.getStorageUsage = (req, res) => {
  try {
    ret = child_process
      .execSync(
        "ssh " + edge + "  df /dev/mmcblk1p1 | tail -n 1 | awk '{print ($3)}'"
      )
      .toString();
    return parseInt(ret);
  } catch (error) {
    console.log(error);
    return 0;
  }
>>>>>>> bf35cc804fc77d2a66795201b6e678797d64eede
};
