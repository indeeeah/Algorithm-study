const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, m;
let arrayA = [];
let arrayB = [];
rl.on("line", (line) => {
  input = line.split(" ").map((e) => parseInt(e));

  if (!n && !m) {
    [n, m] = input;
    return;
  }

  if (arrayA.length === n) {
    arrayB.push(input);
  } else {
    arrayA.push(input);
  }
}).on("close", () => {
  let result = [];

  for (i = 0; i < n; i += 1) {
    let calcResult = [];
    for (j = 0; j < m; j += 1) {
      const calc = arrayA[i][j] + arrayB[i][j];

      calcResult.push(calc);
    }

    result.push(calcResult.join(" "));
  }

  console.log(result.join("\n"));
});
