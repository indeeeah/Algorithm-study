const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const result = {
  grade: 0,
  score: 0,
};
rl.on("line", (line) => {
  input = line.split(" ");

  const [grade, score] = [parseInt(input[1]), input[2]];

  if (score === "P") {
    return;
  }

  const SCORES = {
    "A+": 4.5,
    A0: 4.0,
    "B+": 3.5,
    B0: 3.0,
    "C+": 2.5,
    C0: 2.0,
    "D+": 1.5,
    D0: 1.0,
    F: 0.0,
  };

  result.grade += grade;
  result.score += SCORES[score] * grade;
}).on("close", () => {
  const calc = result.score / result.grade;

  console.log(calc);
});
