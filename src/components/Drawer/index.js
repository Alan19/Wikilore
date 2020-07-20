import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import * as PropTypes from "prop-types";
import React from "react";
import {CategoryIcon} from "./CategoryIcon";
import {getFavoriteArticles} from "../MainContent";
import {bookmarklet, ruleBook} from "./icons";

export function RulebookDrawer(props) {
  return (
    <Drawer
      variant="permanent"
      className={clsx(props.classes.drawer, {
        [props.classes.drawerOpen]: props.open,
        [props.classes.drawerClose]: !props.open
      })}
      classes={{
        paper: clsx({
          [props.classes.drawerOpen]: props.open,
          [props.classes.drawerClose]: !props.open
        })
      }}
    >
      <div className={props.classes.toolbar} />
      <Divider />
      <List>
        <CategoryIcon name={"Cheat Sheet"} path={bookmarklet} switchArticles={() => props.switchArticles(getFavoriteArticles(props.articles))}/>
        <CategoryIcon switchArticles={() => props.switchArticles(props.articles)} path={ruleBook} name={"Index"}/>
      </List>
      <Divider/>
      <List>
        {props.categories.map(category =>
          <CategoryIcon name={category.overviewName} path={category.icon} switchArticles={() => props.switchArticles(props.articles.filter(article => article.tags.includes(category.overviewName)))}/>
        )}
      </List>
    </Drawer>
  );
}

RulebookDrawer.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool
};
