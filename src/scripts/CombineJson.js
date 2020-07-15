const fs = require("fs");
let data = {
  articles: {},
  categories: {}
};

const readFiles = (dirname, onFileContent, onError) => new Promise((resolve, reject) => {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      reject(`error on reading folder ${dirname}}`);
      return;
    }
    filenames.forEach(function (filename) {
      onFileContent(filename, fs.readFileSync(dirname + filename, {encoding:'utf8'}));
    });
    resolve("files successfully read");
  });
});


/**
 * Reads all of the JSON files in resources and combines them into one file before executing `npm run start`
 */
Promise.allSettled([
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
