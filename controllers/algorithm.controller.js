const child_process = require("child_process");
const fs = require("fs");

module.exports.heuristic = async (req, res) => {
  const functions = ["f1", "f2", "f3", "f4"];
  const bdwVNF = ["f1f2", "f2f3", "f3f4"];

  const Ns = 10;

  let CPU_server = {};
  [...Array(Ns).keys()].map((i) => {
    CPU_server[`s${i + 1}`] = 0.8;
  });

  let BDW_server = {};
  [...Array(Ns).keys()].map((i) => {
    [...Array(Ns - i - 1).keys()].map((j) => {
      BDW_server[`s${i + 1}s${i + j + 2}`] = 4;
    });
  });

  console.log(req.body);

  const parametersCPU = { f1: 0.1, f2: 0.1, f3: 0.2, f4: 0.2 };
  const parametersBDW = { f1f2: 1.5, f2f3: 1.4, f3f4: 1.2 };

  const data = {
    Ns: Ns,
    samples: { 1: [CPU_server, parametersCPU, BDW_server, parametersBDW] },
  };

  try {
    fs.writeFileSync("orchestration/parameters.json", JSON.stringify(data));
    const result = child_process
      .execSync("python3 orchestration/heuristic_approach.py", {
        timeout: 1500,
      })
      .toString();
    res.status(200).json(eval(result));
  } catch (e) {
    console.log(e);
    res.status(500).json("Unable to execute heuristic algorithm");
  }
};
