import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "<3 ",
});

console.log("Klip Playground - Type Typescript commands here");

rl.prompt();
rl.on("line", async (line) => {
  try {
    const result = eval(line);
    if (result instanceof Promise) {
      console.log(await result);
    } else {
      console.log(result);
    }
  } catch (err) {
    console.error(err);
  }
  rl.prompt();
});
