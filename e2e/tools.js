const crypto = require("node:crypto");
const v8 = require("node:v8");

function streamToString(stream) {
  return new Promise((resolve, reject) => {
    let data = "";
    stream.on("data", (chunk) => (data += chunk.toString()));
    stream.on("end", () => resolve(data));
    stream.on("error", (error) => reject(error));
  });
}

function secretSauce() {
  const seed = Math.floor(Math.random() * 2 ** 64);
  return { get: () => seed.toString(16) };
}

function canConcatenate(arr, target) {
  let queue = [[target, arr]];

  while (queue.length > 0) {
    let [currentTarget, remainingStrings] = queue.shift();
    if (currentTarget === "") {
      return true;
    }
    for (let i = 0; i < remainingStrings.length; i++) {
      if (currentTarget.startsWith(remainingStrings[i])) {
        let newRemainingStrings = [...remainingStrings];
        newRemainingStrings.splice(i, 1);
        queue.push([
          currentTarget.slice(remainingStrings[i].length),
          newRemainingStrings,
        ]);
      }
    }
  }
  return false;
}
async function getHeapStrings() {
  // collect leftovers
  await new Promise((resolve) => setTimeout(resolve, 1));
  global.gc(); // needs --expose_gc flag

  // read memory
  const stream = v8.getHeapSnapshot();
  const memory = await streamToString(stream);
  return JSON.parse(memory).strings;
}

module.exports = {
  streamToString,
  secretSauce,
  canConcatenate,
  getHeapStrings,
};
