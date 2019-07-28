import { entryJSONS } from "./entryJsonLocations";
import { catJSONS } from "./categoryJsonLocations";
import { CategoryObject } from "./categoryObject";
import { SkillObject } from "./skillObject";

export let categories = [];
export let entries = [];
entryJSONS.forEach(entry =>
  entries.push(
    new SkillObject(entry.name, entry.cardInfo, entry.tags, entry.icon, entry.sections)
  )
);

catJSONS.forEach(category => {
  let categoryObj = new CategoryObject(
    category.name,
    category.overviewIcon,
    category.indexIcon
  );
  entries.forEach(entry => {
    if (entry.tags.includes(category.name)) {
      categoryObj.articles.push(entry);
    }
  });
  categories.push(categoryObj);
});
