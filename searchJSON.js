const fs = require("fs");

function writeCategoryFile(catFileString) {
  fs.writeFileSync(
    "./src/jsonParsing/jsonLocations.js",
    catFileString,
    function(err) {
      if (err) {
        return console.log(err);
      } else {
        console.log("File saved successfully!");
      }
    }
  );
}

module.exports = {
  createCategoryFile: function() {
    const catFolder = "./src/categories/";
    let categoryFiles = [];
    fs.readdirSync(catFolder).forEach(file => {
      categoryFiles.push(file);
    });
    console.log(categoryFiles);

    let fileContent = "export let catJSONS = [];\n";
    categoryFiles.forEach(
      fileName =>
        (fileContent += `catJSONS.push(require('../categories/${fileName.replace(
          /\.[^/.]+$/,
          ""
        )}'));\n`)
    );
    fileContent.trim();
    console.log(fileContent);
    writeCategoryFile(fileContent);
  }
};
