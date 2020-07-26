import PropTypes from "prop-types";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { GridCard } from "../GridCard";

export const GridView = props => (
  <Grid spacing={2} container>
    {props.loadedArticles.map(article => (
      <Grid item md={4} sm={6}>
        <GridCard learnMore={props.learnMore} article={article}/>
      </Grid>
    ))}
  </Grid>
);

GridView.propTypes = {
  loadedArticles: PropTypes.array.isRequired
};
