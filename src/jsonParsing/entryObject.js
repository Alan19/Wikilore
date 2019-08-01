export function EntryObject(entryJSON) {
  this.name = entryJSON.name;
  this.blurb = entryJSON.blurb;
  this.tags = entryJSON.tags;
  this.cardInfo = entryJSON.cardInfo;
  try {
    this.icon = require('../resources/' + entryJSON.icon);
  }catch (e) {
    this.icon = require('../resources/uncertainty.svg')
  }

  this.sections = entryJSON.sections.map(section => new Section(section));
}

function Section(section) {
  this.name = section.name;
  this.subsections = section.subsections.map(part => new Subsection(part));
}

function Subsection(subsection) {
  this.name = subsection.name;
  this.text = subsection.text;
}
