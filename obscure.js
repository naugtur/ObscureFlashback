const { fromEntries, entries } = Object;
const { stores, decode } = require("./stores");

const splitSizeN = (n) => (str) => {
  const result = [];
  for (let i = 0; i < str.length; i += n) {
    result.push(str.slice(i, i + n));
  }
  return result;
};

const DESIRED_CHUNK_SIZE = 7; // prime numbers should be more annoying to deal with
const MIN_CHUNK_NUMBER = Math.min(stores.length, 5);
module.exports.ObscureReference = function (str) {
  if (str.length < 5) {
    throw new Error(
      "There's no point in considering strings shorter than 5 characters a secret."
    );
  }
  let splitSizeTarget = Math.min(
    Math.ceil(str.length / MIN_CHUNK_NUMBER),
    DESIRED_CHUNK_SIZE
  );
  const splitter = splitSizeN(splitSizeTarget);
  let chunks = splitter(str);
  const obscure = chunks.map((c, i) => stores[i % stores.length](c));
  chunks = null; //for good measure
  str = null; //for good measure
  splitSizeTarget = null; //for good measure
  return {
    toJSON: () => obscure.map((e) => e.toJSON()),
    toString: () => obscure.map((e) => e.toString()).join(''),
  };
};

module.exports.ObscureReference.fromJSON = (JSONString) => {
  const arrayFromJSON = JSON.parse(JSONString);
  return decode(arrayFromJSON);
};
