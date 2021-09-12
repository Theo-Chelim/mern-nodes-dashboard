const ping = require("ping");
const child_process = require("child_process");

exports.get_host = (edge) => {
  return "Edge" + edge;
};

exports.get_ip_address = (edge) => {
  return "172.16.100." + edge;
};

exports.get_availability = async (edge) => {
  const ip = get_ip_address(edge);
  const cfg = { timeout: 1 };
  return await ping.promise.probe(ip, cfg).alive;
};

exports.get_cpu_usage = (edge) => {
  const host = get_host(edge);
  child_process.exec(
    "ssh " + host + " vmstat 1 2 | awk 'NR==4 {print ($13+$14)}'",
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
  let qemu_binary;
  const mac = "00:00:00:00:00:12";

  switch (arch) {
    case "arm64":
      qemu_binary = "qemu-system-aarch64";
      break;

    default:
      return -1;
  }
  //-append "rootwait root=/dev/vda console=ttyAMA0"
  //  -netdev tap,ifname=edge${id},id=edge${id},script=/srv/edges/scripts/qemu-ifup -device virtio-net-pci,mac=${mac},netdev=edge${id}
  const subprocess = child_process.spawn(`${qemu_binary}`, [`-machine ${machine} -cpu ${cpu} -smp ${smp} -m ${memory} -nographic -kernel /srv/edges/qemu/${arch}/kernel.bin  -initrd /srv/edges/qemu/${arch}/rootfs.cpio.gz`]);

  subprocess.stdout.on('data', (data) => {
    console.log(`Received chunk ${data}`);
  });

  subprocess.on('error', (error) => {
    console.log(`Received chunk ${error}`);
  });

  return true;
}