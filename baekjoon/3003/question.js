const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  input = line.split(" ").map((e) => parseInt(e));
}).on("close", () => {
  const length = 6;
  const set = [1, 1, 2, 2, 2, 8];
  const result = Array.from({ length }, () => 0);

  for (i = 0; i < length; i += 1) {
    const num = set[i] - input[i];
    result[i] = num;
  }

  console.log(result.join(" "));
});
