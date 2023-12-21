const test = require("node:test");
const assert = require("node:assert");

const { secretSauce, getHeapStrings, canConcatenate } = require("./tools.js");
const { ObscureReference } = require("../obscure.js");

test("concatenation detection function works", (t) => {
  // after chatgpt had a few tries
  let arr = ["g", "goo", "do", "ca", "zoo", "t", "g", "g"];
  assert.ok(canConcatenate(arr, "catdoggg"));
  assert.ok(!canConcatenate(arr, "dodozoo"));
  const word = secretSauce().get();
  assert.ok(canConcatenate(word.split(""), word));
});

test("concatenation detection defeats simple protections", async (t) => {
  const dummyProtect = (value) => {
    const halfIndex = Math.floor(value.length / 2);
    const firstHalf = value.slice(0, halfIndex);
    const secondHalf = value.slice(halfIndex);
    return {
      toString() {
        return firstHalf + secondHalf;
      },
    };
  };
  const s = secretSauce();
  const secret = dummyProtect(s.get());

  const memory = await getHeapStrings();

  assert.ok(!memory.includes(s.get()));
  assert.ok(canConcatenate(memory, s.get()));
  assert.equal(secret.toString(), s.get());
});

test("with protections, against a slightly more sophisticated search", async (t) => {
  const s = secretSauce();

  const secret = ObscureReference(s.get());
 
  const memory = await getHeapStrings();

  assert.ok(!memory.includes(s.get()));
  assert.ok(!canConcatenate(memory, s.get()));
  assert.equal(secret.toString(), s.get());
});
