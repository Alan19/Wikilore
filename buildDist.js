let packageJSON = require("./package.json");
const { zip } = require('zip-a-folder');
const exec = require("child_process").exec;
console.log("Starting Build...");
exec("npm run build", async function() {
  await zip("build", `./distributions/${packageJSON.name}${packageJSON.version}.zip`).then(value => console.log(value));
});
