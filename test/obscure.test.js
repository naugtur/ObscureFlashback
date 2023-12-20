const test = require("node:test");
const assert = require("node:assert");
const { ObscureReference } = require("../obscure");

test("ObscureReference - returns correct value", () => {
  const testString = "There is no spoon.";
  const obscure = ObscureReference(testString);
  assert.equal(`${obscure}`, testString);
});
test("ObscureReference - returns correct value - long", () => {
  const testString = longText;
  const obscure = ObscureReference(testString);
  assert.equal(`${obscure}`, testString);
});

test("ObscureReference - supports wide characters", () => {
  const testString = "There is no spoon. 🏋️‍♀️🕶️";
  const obscure = ObscureReference(testString);
  assert.equal(`${obscure}`, testString);
});

test("ObscureReference - JSON serialization", () => {
  const testString = "There is no spoon. 🏋️‍♀️🕶️";
  const obscure = ObscureReference(testString);
  const payload = JSON.stringify(obscure);
  const obscure2 = ObscureReference.fromJSON(payload);
  assert.equal(`${obscure}`, testString);
  assert.equal(`${obscure2}`, testString);
});

test("ObscureReference - JSON serialization - long", () => {
  const testString = longText;
  const obscure = ObscureReference(testString);
  const payload = JSON.stringify(obscure);
  const obscure2 = ObscureReference.fromJSON(payload);
  assert.equal(`${obscure}`, testString);
  assert.equal(`${obscure2}`, testString);
});

// hurray for hoisting

var longText = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡤⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡤⠶⠦⡞⢳⣶⡄⠙⡄⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡏⠀⣠⣤⣹⡜⠛⠁⣠⠗⠛⠉⠙⢳⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⣄⣘⣟⠿⠋⠉⠉⠀⠀⠀⠀⢈⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠾⠛⠉⠀⠀⠀⠀⠀⠀⣀⣠⣤⣴⠛⣟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡇⣰⠀⠀⠀⢀⣠⣴⣾⣿⣿⣿⣿⣿⡄⠸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡀⠛⠻⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⡄⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⢀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣄⠀⠀⠈⠙⠻⠿⠿⠿⠟⠋⠀⢀⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠉⠻⢦⣄⣀⠀⠀⠀⠀⠀⢀⣰⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠈⠉⠉⠙⠚⠒⠀⠈⢀⠈⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠇⣰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡆⢹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⢠⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠇⠈⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⣸⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢼⡷⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣈⡓⢤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡶⢋⡄⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠚⣿⠍⢀⣀⠉⠓⣮⣟⣦⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣠⠞⢡⡤⡾⢻⡾⢿⡏⠛⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠄⢰⠃⠀⡞⠁⣰⡀⢻⣽⣄⣙⣦⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⣾⡷⢶⣿⢀⣇⣸⣇⣸⣿⣰⣼⣤⣴⠶⠶⣤⣄⣾⠿⠶⣿⣦⣾⢴⣾⣿⠤⠿⣧⡿⠛⠛⡛⢻⣧⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣾⠏⢀⣀⣀⣹⣿⡿⠉⣹⣯⣀⠙⣿⡏⢠⣤⣄⠈⢻⣿⠀⠀⢻⡟⠁⣸⠟⣿⠀⠀⣿⣿⠀⠸⠟⢻⡇⠀⠀⠀⠀⠀
⠀⠀⠀⢸⣟⠀⣸⡏⠙⣛⣹⡇⠀⣿⡙⣿⠀⣿⡇⢸⣏⣹⡇⢠⣿⠀⠀⣀⠀⠰⣿⠀⢹⡀⠀⣿⢿⡇⠀⣴⣾⣷⡆⠀⠀⠀⠀
⠀⠀⠀⠸⣿⡀⠹⣷⡾⠛⢻⣷⡀⠙⠿⠋⢠⣿⣧⠀⠛⠋⢀⣾⢿⡆⠀⣿⣧⡀⢹⣧⢸⡇⢀⡏⢸⣇⠀⠀⠀⢸⣧⠀⠀⠀⠀
⠀⢠⣤⣠⣹⢿⣦⣤⣤⣴⣿⣩⣿⠿⢾⣶⣿⣧⣽⣿⣶⣶⣿⣧⣼⣿⡶⢿⣿⣿⠾⢿⣿⠿⣿⣿⠾⠿⠷⢿⡟⠛⠛⠛⢿⣦⠀
⠀⢸⠇⠀⠻⣷⡏⠁⠀⣿⣿⠁⢀⣤⡀⠈⢻⡇⠀⠀⣿⣿⠀⢿⡇⠀⢀⣤⣿⡄⠀⠀⠀⠀⢈⣿⠀⢸⣶⣾⡇⠈⣿⠦⣀⣿⠆
⠀⣾⠀⢠⡀⠉⠀⣀⠀⢻⡇⠀⣿⡏⣿⠀⠈⣿⠀⠀⠘⠛⠀⢸⣷⣄⠘⢿⣿⣟⣿⠀⠀⣿⠛⣿⠀⢠⣤⣿⡇⠀⠀⠀⢿⡏⠀
⠀⡏⠀⣼⢿⣦⡾⣿⠀⢸⣇⠀⠙⠗⠋⠀⣰⡟⢀⣿⡄⠀⠀⢸⡿⠿⠂⠀⠈⣿⢿⡀⢀⡏⠀⢸⡄⠘⠋⢻⡇⠀⣿⣆⠘⣿⡄
⢠⣿⣤⣿⠀⠉⠀⣿⣤⣼⡟⢷⣤⣤⣤⣶⢿⣧⣼⡟⠿⠶⠶⢾⣧⣤⣤⣤⡾⠏⢸⣧⣼⡇⠀⠸⠿⠶⠶⠿⣷⣶⡿⢻⣶⡿⠗
⠀⠈⠀⠈⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠀⠀⠀⠀⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;
