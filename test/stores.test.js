const test = require("node:test");
const assert = require("node:assert");

const { stores, decode } = require("../obscure.js").__TEST__;

text = "hello world";
stores.forEach((store) => {
  test(`${store.name} preserves a string`, (t) => {
    assert.equal(store(text).toString(), text);
  });
});

test("JSON serialization and back", (t) => {
    const chunks = "aaa bbb ccc".split(" ");
    const encoded = chunks.map((c,i) => stores[i%stores.length](c).toJSON());
    const serialized = JSON.stringify(encoded);
    const deserialized = JSON.parse(serialized);
    const decoded = decode(deserialized);
    assert.deepEqual(decoded, chunks.join(''));
})
