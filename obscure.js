const { min, ceil, random } = Math;
const { entries, create, defineProperty } = Object;
const { isArray } = Array;
// TODO: more defensive coding

const getCharValue = (c) =>
  typeof c === "number" ? String.fromCharCode(c) : c;
const saveCharValue = (c) => (random() > 0.5 ? c.charCodeAt(0) : c);

// in-memory structures
const stores = [
  function asRev(str) {
    const storage = str.split("").reverse().join("");
    str = ""; //for good measure
    return {
      toJSON: () => storage,
      toString: () => storage.split("").reverse().join(""),
    };
  },
  function asArray(str) {
    const storage = str.split("").map(saveCharValue);
    str = ""; //for good measure
    return {
      toJSON: () => storage,
      toString: () => storage.map(getCharValue).join(""),
    };
  },
  function asObject(str) {
    const storage = create(null);
    str
      .split("")
      .map((c, i) => [`${i}`, c])
      //assigning in random order should be reflected in how the object is actually stored
      .sort(() => random() - 0.5)
      .forEach(([k, v]) => {
        if (random() > 0.5) {
          storage[k] = saveCharValue(v);
        } else {
          defineProperty(storage, k, {
            value: saveCharValue(v),
            enumerable: true,
            configurable: false,
            writable: false,
          });
        }
      });
    str = ""; //for good measure
    return {
      toJSON: () => storage,
      toString: () =>
        entries(storage)
          .sort((a, b) => {
            return a[0] - b[0];
          })
          .map(([k, v]) => getCharValue(v))
          .join(""),
    };
  },
];

const decode = function (arrayFromJSON) {
  return arrayFromJSON
    .map((item) => {
      if (typeof item === "string") {
        return item.split("").reverse().join("");
      } else if (typeof item === "number") {
        return String.fromCharCode(item);
      } else if (isArray(item)) {
        return item.map(getCharValue).join("");
      } else if (typeof item === "object") {
        return entries(item)
          .sort((a, b) => {
            return Number(a[0]) - Number(b[0]);
          })
          .map(([k, v]) => getCharValue(v))
          .join("");
      }
    })
    .join("");
};

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

module.exports.__TEST__ = {
  stores,
  decode,
};
