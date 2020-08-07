let packageJSON = require("./package.json");
let zipFolder = require("zip-folder");

const exec = require("child_process").exec;
console.log("Starting Build...");
exec("npm run build", function() {
  zipFolder("build", `./distributions/${packageJSON.name}${packageJSON.version}.zip`, function(err) {
    if (err) {
      console.log("oh no!", err);
    } else {
      console.log("Distribution Zipped");
    }
  });
});
