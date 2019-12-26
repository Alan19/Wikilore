import React, { useEffect, useState } from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContent from "./components/MainContent";

import MasterJson from "./resources/combined.json";

function App() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  //Populate state with categories on App mount
  useEffect(() => {
    const populateContent = () => {
      const convertJsonToArticle = responseJson => ({
        ...responseJson, icon: require(`./resources/icons/articles/${responseJson.icon}`)
      });
      const convertJsonToCategory = category => ({
        ...category, icon: require(`./resources/icons/categories/${category.icon}`)
      });

      Object.keys(MasterJson.articles).forEach(articleKey => setArticles([...articles, convertJsonToArticle(MasterJson.articles[articleKey])]));

      Object.keys(MasterJson.categories).forEach(categoryKey => setCategories(...categories, convertJsonToCategory(MasterJson.categories[categoryKey])));
    };

    populateContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <CssBaseline />
      <MainContent articles={articles} />
    </div>
  );
}

export default App;
