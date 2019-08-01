import { entryJSONS } from "./entryJsonLocations";
import { catJSONS } from "./categoryJsonLocations";
import { CategoryObject } from "./categoryObject";
import { EntryObject } from "./entryObject";

export let categories = [];
export let entries = [];
entryJSONS.forEach(entry =>
  entries.push(
    new EntryObject(entry)
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
