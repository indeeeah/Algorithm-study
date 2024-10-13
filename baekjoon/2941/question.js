const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  input = line;
}).on("close", () => {
  const croatia = ["c=", "c-", "dz=", "d-", "lj", "nj", "s=", "z="];

  const map = new Map();
  croatia.forEach((e) => {
    map.set(e, 0);
  });

  let prevLength = input.length;
  [...map.entries()].forEach((e) => {
    input = input.replaceAll(e[0], "|");

    const changedLength = input.replaceAll("|", "").length;

    if (changedLength !== prevLength) {
      const diff = prevLength - changedLength;

      map.set(e[0], e[1] + diff / e[0].length);
      prevLength = changedLength;
    }
  });

  input = input.replaceAll("|", "");

  const croatiaCount = [...map.values()].reduce((cur, prev) => cur + prev, 0);

  console.log(input.length + croatiaCount);
});
