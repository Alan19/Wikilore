import { entryJSONS } from "./entryJsonLocations";
import { catJSONS } from "./categoryJsonLocations";
import { CategoryObject } from "./categoryObject";
import {SkillObject} from "./skillObject";

export function matchCategories() {
  catJSONS.forEach(category => {
      console.log(category);
    let categoryObj = new CategoryObject(
      category.name,
      category.overviewIcon,
      category.indexIcon
    );
    entryJSONS.forEach(entry => {
      if (entry.tags.includes(category.name)) {
        categoryObj.articles.push(new SkillObject(entry.name, entry.tags, entry.icon, entry.sections));
      }
    });
    console.log(categoryObj);
  });
}
