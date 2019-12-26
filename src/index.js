import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MasterJson from "./resources/combined";

export let jsonArticles = [];
export let jsonCategories = [];
const convertJsonToArticle = responseJson => ({
  ...responseJson, icon: require(`./resources/icons/articles/${responseJson.icon}`)
});
const convertJsonToCategory = category => ({
  ...category, icon: require(`./resources/icons/categories/${category.icon}`)
});
Object.keys(MasterJson.articles).forEach(articleKey => jsonArticles.push(convertJsonToArticle(MasterJson.articles[articleKey])));
Object.keys(MasterJson.categories).forEach(categoryKey => jsonCategories.push(convertJsonToCategory(MasterJson.categories[categoryKey])));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
