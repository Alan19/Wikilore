const {Content} = require("./ContentNodes");
const {Requirements} = require("./Requirements");
var connect = require('camo').connect;
var Document = require('camo').Document;

class Arcana extends Document {
    constructor() {
        super();

        this.name = String;
        this.keywords = Array;
        this.requirements = Requirements;
        this.content = [Content];
    }
}

module.exports = {Arcana}