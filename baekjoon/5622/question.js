const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  input = line.split("");
}).on("close", () => {
  let seconds = 0;
  while (input.length > 0) {
    switch (input[0]) {
      case "A":
      case "B":
      case "C":
        seconds += 3;
        break;
      case "D":
      case "E":
      case "F":
        seconds += 4;
        break;
      case "G":
      case "H":
      case "I":
        seconds += 5;
        break;
      case "J":
      case "K":
      case "L":
        seconds += 6;
        break;
      case "M":
      case "N":
      case "O":
        seconds += 7;
        break;
      case "P":
      case "Q":
      case "R":
      case "S":
        seconds += 8;
        break;
      case "T":
      case "U":
      case "V":
        seconds += 9;
        break;
      case "W":
      case "X":
      case "Y":
      case "Z":
        seconds += 10;
      default:
        break;
    }
    input.shift();
  }
  console.log(seconds);
});
