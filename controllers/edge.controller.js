const ping = require("ping");

module.exports.allEdges = (req, res) => {};
module.exports.updateConfig = (req, res) => {};

module.exports.start = (req, res) => {};
module.exports.stop = (req, res) => {};
module.exports.reboot = (req, res) => {};
module.exports.stress = (req, res) => {};

module.exports.getAvailability = async (req, res) => {
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
};

module.exports.getCpuUsage = (req, res) => {};
module.exports.getStorageUsage = (req, res) => {};
