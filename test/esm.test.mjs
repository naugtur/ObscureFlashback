import test from "node:test";
import assert from "node:assert";
import { ObscureReference } from "../obscure.js";

test("ObscureReference - works when imported in ESM", () => {
  const testString = "There is no spoon.";
  const obscure = ObscureReference(testString);
  assert.equal(`${obscure}`, testString);
});