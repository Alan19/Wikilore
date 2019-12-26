import React, { useState } from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContent from "./components/MainContent";
import {jsonArticles, jsonCategories} from "./index";


function App() {
  const [articles] = useState(jsonArticles);
  const [categories] = useState(jsonCategories);
  return (
    <div className="App">
      <CssBaseline />
      <MainContent articles={articles} categories={categories} />
    </div>
  );
}

export default App;
