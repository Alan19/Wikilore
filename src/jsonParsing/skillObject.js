export function SkillObject(name, blurb, cardInfo, tags, iconPath, sections) {
  this.name = name;
  this.blurb = blurb;
  this.tags = tags;
  this.cardInfo = cardInfo;
  try {
    this.icon = require('../resources/' + iconPath);
  }catch (e) {
    this.icon = require('../resources/uncertainty.svg')
  }

  this.sections = sections.map(section => new Section(section));
}

function Section(section) {
  this.name = section.name;
  this.subsections = section.subsections.map(part => new Subsection(part));
}

function Subsection(subsection) {
  this.name = subsection.name;
  this.text = subsection.text;
}
