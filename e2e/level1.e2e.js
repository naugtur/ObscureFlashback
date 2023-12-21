const test = require("node:test");
const assert = require("node:assert");

const { secretSauce, getHeapStrings } = require("./tools.js");
const { ObscureReference } = require("../obscure.js");

test("no protections", async (t) => {
  const s = secretSauce();

  const secret = s.get();
  const memory = await getHeapStrings();

  assert.ok(memory.includes(s.get()));
  assert.equal(secret.toString(), s.get());
});

test("with protections", async (t) => {
  const s = secretSauce();

  const secret = ObscureReference(s.get());
  const memory = await getHeapStrings();

  assert.ok(!memory.includes(s.get()));
  assert.equal(secret.toString(), s.get());
});
