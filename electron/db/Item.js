const { Requirements } = require("./Requirements");
const Document = require("camo").Document;

class Item extends Document {
    constructor() {
        super();

        this.name = String;
        this.keywords = Array;
        this.requirements = Requirements;
        this.text = String;
    }
}

module.exports = { Item };
