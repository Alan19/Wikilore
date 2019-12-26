const fs = require("fs");
let data = {
  articles: {},
  categories: {}
};

const readFiles = (dirname, onFileContent, onError) => new Promise((resolve, reject) => {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function (filename) {
      fs.readFile(dirname + filename, "utf-8", function (err, content) {
        if (err) {
          onError(err);
          reject(err);
        }
        onFileContent(filename, content);
        resolve("file successfully read");
      });
    });
  });
});


/**
 * Reads all of the JSON files in resources and combines them into one file before executing `npm run start`
 */
Promise.all([
  //Read categories
  readFiles(
    "./src/resources/categories/",
    (fileName, content) => data.categories[fileName] = JSON.parse(content),
    error => console.log(error)
  ),
  //Read articles
  readFiles(
    "./src/resources/articles/",
    (fileName, content) => data.articles[fileName] = JSON.parse(content),
    error => console.log(error)
  )
]).then(() => {
  //Write combined JSON to combined.json
  fs.writeFileSync("./src/resources/combined.json", JSON.stringify(data));
});
