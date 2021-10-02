const fs = require("fs");
const child_process = require("child_process");

const edges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let status = {
  Edge1: false,
  Edge2: false,
  Edge3: false,
  Edge4: false,
  Edge5: false,
  Edge6: false,
  Edge7: false,
  Edge8: false,
  Edge9: false,
  Edge10: false,
};

while (true) {
  edges.forEach((edge) => {
    try {
      let command = "ssh Edge" + edge + " date";
      child_process.execSync(command, {timeout: 1000});
      status["Edge" + edge] = true;
    } catch (e) {
      status["Edge" + edge] = false;
    }
  });

  let data = JSON.stringify(status);
  fs.writeFileSync("config/status.json", data);
}
