const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let basket;
rl.on("line", (line) => {
  if (!basket) {
    const n = parseInt(line.split(" ")[0]);
    basket = Array.from({ length: n }, (_, i) => i + 1);
  } else {
    const [prev, cur] = line.split(" ").map((e) => parseInt(e));

    [basket[prev - 1], basket[cur - 1]] = [basket[cur - 1], basket[prev - 1]];
  }
}).on("close", () => {
  console.log(basket.join(" "));
});
