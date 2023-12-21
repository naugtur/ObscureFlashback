// use this to generate heapdumps and look for the secret
const v8 = require("node:v8");
const { ObscureReference } = require("../obscure");


(async function demo() {
  await new Promise((resolve) => setTimeout(resolve, 1));
  global.gc(); // needs --expose_gc flag

  v8.writeHeapSnapshot();

  const secret1 = "There is no spoon";
  const secret2 = ObscureReference("There is no spoon");
  global.SECRETS = { secret1, secret2 };
  await new Promise((resolve) => setTimeout(resolve, 1));
  global.gc(); // needs --expose_gc flag

  v8.writeHeapSnapshot();

  console.log(`${secret1} == ${secret2}`);
})();
