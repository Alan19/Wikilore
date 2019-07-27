export function CategoryObject(name, overviewIcon, listIcon){
    this.name = name;
    this.overviewIcon = require('../resources/' + overviewIcon);
    this.indexIcon = require('../resources/' + listIcon);
    this.articles = [];
}