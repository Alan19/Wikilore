const express = require("express");
const fs = require("fs/promises");
const app = express();
const port = 3030;
const Datastore = require("nedb"),
    db = new Datastore({ filename: "electron/db/data.db", autoload: true });

function listen() {
    fs.readdir("pages").then(fileNames =>
        fileNames.map(file => fs.readFile("pages/" + file).then(value => db.insert(JSON.parse(value.toString()))))
    );

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });

    app.get("/articles", (req, res) => {
        fs.readdir("pages").then(fileNames =>
            Promise.all(fileNames.map(file => fs.readFile("pages/" + file).then(() => db.getAllData()))).then(value =>
                res.send(value)
            )
        );
    });

    app.get("/articles/:article_id", (req, res) =>
        db.find({ _id: req.params["article_id"] }, (err, docs) => res.send(docs))
    );
}

module.exports = { listen };
