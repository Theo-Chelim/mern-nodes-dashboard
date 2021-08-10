const fs = require("fs");
const crypto = require("crypto");
const child_process = require("child_process");

const iv = Buffer.from("4f11b3b8e34a29f433c3b1038b041b1d", "hex");

exports.cipher_file_AES256 = (input_file, output_file, key) => {
  data = fs.readFileSync(input_file);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let result = cipher.update(data);
  result = Buffer.concat([result, cipher.final()]);
  fs.writeFileSync(output_file, result);
};

exports.decipher_file_AES256 = (input_file, output_file, key) => {
  data = fs.readFileSync(input_file);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(data);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  fs.writeFileSync(output_file, decrypted);
};

/* cipher_file_AES256("upload/avatar.jpg", "upload/avatar.jpg.ciphered", key);
decipher_file_AES256("upload/avatar.jpg.ciphered", "upload/avatar2.jpg", key); */
/* 
splitFile
  .splitFile("upload/avatar.jpg.ciphered", 3)
  .then((names) => {
    console.log(names);
  })
  .catch((err) => {
    console.log("Error: ", err);
  }); */

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

exports.random_optimization = (chunks, edges) => {
  strategy = [];

  available_edges = [];
  edges.forEach((edge) => {
    //if (get_available_storage(edge) > 5 * 1000 * 1000) {
    available_edges.push(edge);
    //}
  });

  chunks.forEach((chunk) => {
    const available_edge =
      available_edges[Math.floor(Math.random() * available_edges.length)];
    strategy.push({ edge: available_edge, chunk });
  });

  return strategy;
};

exports.bestfit_cpu = (chunks, edges) => {
  return [];
};

exports.deploy_chunks = (strategy) => {
  strategy.forEach((x) => {
    edge = x["edge"];
    chunk = x["chunk"];
    child_process.exec(
      "scp '" + chunk + "' " + edge + ":/home/ifc/data_storage/",
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return null;
        }
        if (stderr) {
          return null;
        }
      }
    );
  });
};

exports.get_chunks = (strategy) => {
  strategy.forEach((edge, chunk) => {
    child_process.exec(
      "scp " + edge + ":'/home/ifc/data_storage/" + chunk + "' .",
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return null;
        }
        if (stderr) {
          return null;
        }
      }
    );
  });
};

exports.remove_chunks = (chunks) => {
  chunks.forEach((chunk) => {
    try {
      fs.unlinkSync(chunk);
    } catch (err) {
      console.log("Unable to remove " + chunk);
    }
  });
};
