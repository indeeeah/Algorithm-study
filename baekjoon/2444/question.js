const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", () => {
  let star = [];

  function drawStars() {
    const blanks = " ".repeat(input - (i + 1));
    const stars = "*".repeat(i + (i + 1));

    star.push(`${blanks}${stars}`);
  }

  for (i = 0; i < input; i += 1) {
    drawStars();
  }

  for (i = input - 2; i >= 0; i -= 1) {
    drawStars();
  }

  console.log(star.join("\n"));
});
