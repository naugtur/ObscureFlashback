const { min, ceil } = Math;
const { stores, decode } = require("./stores");

const splitSizeN = (n) => (str) => {
  const result = [];
  for (let i = 0; i < str.length; i += n) {
    result.push(str.slice(i, i + n));
  }
  str = ""; //for good measure
  return result;
};

const DESIRED_CHUNK_SIZE = 7; // prime numbers should be more annoying to deal with
const MIN_CHUNK_NUMBER = min(stores.length, 5);

module.exports.ObscureReference = function (str) {
  if (str.length < 5) {
    throw Error(
      "There's no point in considering strings shorter than 5 characters a secret."
    );
  }
  let splitSizeTarget = min(
    ceil(str.length / MIN_CHUNK_NUMBER),
    DESIRED_CHUNK_SIZE
  );
  const splitter = splitSizeN(splitSizeTarget);
  let chunks = splitter(str);
  const obscure = chunks.map((c, i) => stores[i % stores.length](c));
  chunks = []; //for good measure
  str = ""; //for good measure
  splitSizeTarget = 0; //for good measure
  return {
    toJSON: () => obscure.map((e) => e.toJSON()),
    toString: () => obscure.map((e) => e.toString()).join(""),
  };
};

module.exports.ObscureReference.fromJSON = (JSONString) => {
  const arrayFromJSON = JSON.parse(JSONString);
  return decode(arrayFromJSON);
};
