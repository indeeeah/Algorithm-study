const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  input = line.split(" ").map((e) => parseInt(e));
}).on("close", () => {
  let answer = -1;

  const numbers = [...new Set(input)];

  if (numbers.length === 3) {
    const maxNumber = Math.max(...numbers);

    answer = maxNumber * 100;
  } else if (numbers.length === 2) {
    const sameNumber = input.find(
      (e) => input.filter((num) => num === e).length === 2
    );

    answer = 1000 + sameNumber * 100;
  } else {
    answer = 10000 + numbers[0] * 1000;
  }

  console.log(answer);
});
