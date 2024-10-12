const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  input = line;
}).on("close", () => {
  const reverse = input.split("").reverse().join("");

  if (input === reverse) {
    console.log("1");
  } else {
    console.log("0");
  }
});
