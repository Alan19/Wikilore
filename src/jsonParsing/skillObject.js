export function SkillObject(name, cardInfo, tags, iconPath, sections) {
  this.name = name;
  this.tags = tags;
  this.cardInfo = cardInfo;
  this.icon = require('../resources/' + iconPath);
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
