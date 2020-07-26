import PropTypes from "prop-types";
import React from "react";
import { Paper, useTheme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { renderSections } from "./RenderSections";

export const Article = props => {
  return <>{generateArticle(props.json, useTheme())}</>;
};

Article.propTypes = {
  json: PropTypes.object.isRequired
};

export function generateArticle(json, theme) {
  return (
    <Paper style={{ padding: theme.spacing(3, 2), marginBottom: theme.spacing(1) }}>
      {generateTitle(json)}
      {renderSections(json)}
    </Paper>
  );
}

export const removeWhiteSpaceAndLowercase = name => name.toLowerCase().replace(/\s/g, "");

const generateTitle = ({ blurb, icon, name }) => (
  <>
    <Typography id={removeWhiteSpaceAndLowercase(name)} variant={"h3"} style={{ overflow: "auto", overflowY: "hidden" }}>
      {name} <img style={{ height: ".85em" }} src={icon} alt={name} />
    </Typography>
    <Typography variant={"subtitle2"} paragraph={true}>
      {blurb}
    </Typography>
  </>
);
