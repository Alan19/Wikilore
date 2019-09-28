const fs = require("fs");

function writeCategoryFile(catFileString) {
  fs.writeFileSync(
    "./src/jsonParsing/categoryJsonLocations.js",
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

function writeEntryFile(entryFileContent) {
  fs.writeFileSync(
    "./src/jsonParsing/entryJsonLocations.js",
    entryFileContent,
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

    console.log("Writing entries to file");
    const entryFolder = "./src/entries/";
    let entryFiles = [];
    fs.readdirSync(entryFolder).forEach(file => {
      entryFiles.push(file);
    });

    let entryFileContent = "export let entryJSONS = [];\n";
    entryFiles.forEach(fileName => {
      entryFileContent += `entryJSONS.push(require("../entries/${fileName.replace(
        /\.[^/.]+$/,
        ""
      )}"));\n`;
    });

    writeEntryFile(entryFileContent);
  }
};
