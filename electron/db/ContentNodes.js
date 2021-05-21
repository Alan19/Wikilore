const { Item } = require("./Item");
const Document = require("camo").Document;

class Content extends Document {
    constructor() {
        super();
        this.type = String;
        this.name = String;
        this.items = [Item];
    }
}

module.exports = { Content };
