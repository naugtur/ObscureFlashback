const { fromEntries, entries, create, keys, defineProperty } = Object;
const { isArray } = Array;

const getCharValue = (c) =>
  typeof c === "number" ? String.fromCharCode(c) : c;
const saveCharValue = (c) => (Math.random() > 0.5 ? c.charCodeAt(0) : c);

// in-memory structures
module.exports.stores = [
  function asRev(str) {
    const storage = str.split("").reverse().join("");
    str = null; //for good measure
    return {
      toJSON: () => storage,
      toString: () => storage.split("").reverse().join(""),
    };
  },
  function asArray(str) {
    const storage = str.split("").map(saveCharValue);
    str = null; //for good measure
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
      .sort(() => Math.random() - 0.5)
      .forEach(([k, v]) => {
        if (Math.random() > 0.5) {
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
    str = null; //for good measure
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

module.exports.decode = function (arrayFromJSON) {
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
