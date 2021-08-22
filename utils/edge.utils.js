const ping = require("ping");
const child_process = require("child_process");

exports.get_host = (edge) => {
  return "Edge" + edge;
};

exports.get_ip_address = (edge) => {
  return "172.16.100." + edge;
};

exports.get_availability = async (edge) => {
  const host = edge;
  const cfg = {
    timeout: 1,
    //extra: ["-c", "2"],
  };
  return await ping.promise.probe(host, cfg).alive;
};

exports.get_cpu_usage = (edge) => {
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

exports.get_available_storage = (edge) => {
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
};
