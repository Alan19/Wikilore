const catCreator = require("./searchJSON");

const exec = require("child_process").exec;

catCreator.createCategoryFile();
console.log("Category file written");
console.log("Executing npm run start");
exec("npm run start");