const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function upsideDown() {
  const n = parseInt(input[0].split(" ")[0]);
  const basket = Array.from({ length: n }, (_, i) => i + 1);

  input.shift();

  while (input.length) {
    const [prev, cur] = input[0].split(" ").map((e) => parseInt(e));

    const switchCount = Math.round((cur - prev) / 2);

    for (i = 0; i < switchCount; i += 1) {
      [basket[cur - 1 - i], basket[prev - 1 + i]] = [
        basket[prev - 1 + i],
        basket[cur - 1 - i],
      ];
    }

    input.shift();
  }

  console.log(basket.join(" "));
}

upsideDown();
