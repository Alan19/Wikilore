let ncp = require("ncp").ncp;
let pjson = require("./package.json");
let zipFolder = require("zip-folder");

const exec = require("child_process").exec;
console.log("Starting Build...");

exec("npm run build", function () {
  ncp(pjson.nginxDirectory, pjson.name + pjson.version, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log("Copied nginx folder!");
    ncp("build", pjson.name + pjson.version + "/html", function(err) {
      if (err) {
        return console.error(err);
      }
      console.log("Copied build folder!");
      zipFolder(
          pjson.name + pjson.version,
          pjson.name + pjson.version + ".zip",
          function(err) {
            if (err) {
              console.log("oh no!", err);
            } else {
              console.log("Distribution Zipped");
            }
          }
      );
    });
  });
});

