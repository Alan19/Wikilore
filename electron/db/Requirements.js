var Document = require('camo').Document;

class Requirements extends Document{
    constructor() {
        super();

        this.display = String;
        this.requirements = [String];
    }
}

module.exports = {Requirements}