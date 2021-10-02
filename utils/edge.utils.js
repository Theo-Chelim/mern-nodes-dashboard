const fs = require("fs");
const ping = require("ping");
const child_process = require("child_process");

exports.get_host = (edge) => {
  return "Edge" + edge;
};

exports.get_ip_address = (edge) => {
  return "172.16.100." + edge;
};

exports.get_availability = async (edge) => {
  const ip = exports.get_ip_address(edge);
  const host = exports.get_host(edge);
  if (parseInt(edge) >= 1 && parseInt(edge) <= 10) {
    let rawdata = fs.readFileSync("config/status.json");
    let status = JSON.parse(rawdata);
    return status[host];
  } else {
    const cfg = { timeout: 1 };
    const status = await ping.promise.probe(ip, cfg);
    return status.alive;
  }
};

exports.get_cpu_usage = async (edge) => {
  const host = exports.get_host(edge);
  const ip = exports.get_ip_address(edge);
  let command;

  if (false) {
    command = "ssh " + host + " vmstat 1 2 | awk 'NR==4 {print ($13+$14)}'";
  } else {
    command =
      'ssh -o "StrictHostKeyChecking=no" ' +
      ip +
      " vmstat 1 2 | awk 'NR==4 {print ($13+$14)}'";
  }
  try {
    const result = child_process.execSync(command).toString();
    return parseInt(result);
  } catch (e) {
    console.log(e);
  }
};

exports.get_available_storage = (edge) => {
  const host = get_host(edge);
  try {
    ret = child_process
      .execSync(
        "ssh " + host + "  df /dev/mmcblk1p1 | tail -n 1 | awk '{print ($3)}'"
      )
      .toString();
    return parseInt(ret);
  } catch (error) {
    console.log(error);
    return 0;
  }
};

exports.verify_smp_limit = (edges) => {
  let smp = 0;
  edges.forEach((edge) => {
    smp += edge.smp;
  });
  return smp <= process.env.VIRTUAL_EDGES_MAX_SMP;
};

exports.verify_memory_limit = (edges) => {
  let memory = 0;
  edges.forEach((edge) => {
    memory += edge.memory;
  });
  return memory <= process.env.VIRTUAL_EDGES_MAX_MEMORY;
};

exports.start_qemu_edge = (id, machine, arch, cpu, smp, memory) => {
  if (arch === "arm64") {
    return child_process.exec(
      `python /srv/edges/scripts/start_arm64_edge.py ${id} ${machine} ${cpu} ${smp} ${memory}`
    );
  }
};

exports.stop_qemu_edge = (id) => {
  return child_process.exec(`python /srv/edges/scripts/stop_edge.py ${id}`);
};

exports.status_qemu_edge = (id) => {
  const path = `/var/run/edge-${id}.pid`;
  try {
    if (fs.existsSync(path)) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
};
