import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import * as PropTypes from "prop-types";
import React from "react";
import { Article } from "../Article/Article";
import { Navigation } from "./Navigation";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export function ArticleView(props) {
  const isMobilePortrait = !useMediaQuery("(min-width:600px)") && window.innerHeight > window.innerWidth;
  return (
    <>
      <Grid key={"article-view"} direction={isMobilePortrait ? "column-reverse" : "row"} wrap={"nowrap"} container spacing={2}>
        <Fade in={true}>
          <Grid item md={8} sm={9}>
            {props.loadedArticles.map(article => (
              <Article key={article} json={article} setSection={props.setSection} />
            ))}
          </Grid>
        </Fade>
        <Fade in={true}>
          <Grid item md={4} sm={3}>
            <Navigation isMobilePortrait={isMobilePortrait} articles={props.loadedArticles} setSection={props.setSection} />
          </Grid>
        </Fade>
      </Grid>
    </>
  );
}

ArticleView.propTypes = {
  loadedArticles: PropTypes.any
};
