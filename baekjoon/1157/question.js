const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  input = line.split("").map((e) => e.toUpperCase());
}).on("close", () => {
  const group = [...new Set(input)];
  const map = new Map();

  for (i = 0; i < group.length; i += 1) {
    const filter = input.filter((e) => e === group[i]);

    map.set(group[i], filter.length);
  }

  const maxCount = Math.max(...map.values());
  const biggistGroup = [...map.entries()].filter((e) => e[1] === maxCount);

  if (biggistGroup.length > 1) {
    console.log("?");
  } else {
    console.log(biggistGroup.flat()[0]);
  }
});
