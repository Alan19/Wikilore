function page(obj) {
  this.id = obj.id;
  this.name = obj.name;
  this.sections = obj.sections.map(section => sectionInfo(section));
  this.icon=obj.icon;
}

function sectionInfo(section) {
  this.title = section.title;
  this.parts = section.parts.map(part => sectionPart(part));
}

function sectionPart(sectionPart) {
  this.title = sectionPart.title;
  this.text = sectionPart.text;
}
