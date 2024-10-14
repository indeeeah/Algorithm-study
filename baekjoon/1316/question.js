const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
rl.on("line", (line) => {
  if (!isNaN(Number(line))) return;

  input = line.split("");

  const alpabet = new Set();
  let flag = true;
  for (i = 0; i < input.length; i += 1) {
    if (alpabet.size === 0) alpabet.add(input[i]);

    const lastAlpabet = [...alpabet][alpabet.size - 1];
    if (alpabet.has(input[i]) && lastAlpabet !== input[i]) {
      flag = false;
      break;
    }

    alpabet.add(input[i]);
  }

  if (flag) {
    count += 1;
  }
}).on("close", () => {
  console.log(count);
});
