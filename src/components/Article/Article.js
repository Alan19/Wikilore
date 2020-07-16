import PropTypes from "prop-types";
import React from "react";
import {Paper, useTheme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import {renderSections} from "./RenderSections";

export const Article = props => {
  return (
    <Grid key={props.json.name} wrap={"nowrap"} direction={"column-reverse"} container spacing={2}>
      <Fade in={true}>
        <Grid item md={8}>
          {generateArticle(props.json, useTheme())}
        </Grid>
      </Fade>

    </Grid>
  );
};

Article.propTypes = {
  json: PropTypes.object.isRequired
};


export function generateArticle(json, theme) {
  return <Paper style={{padding: theme.spacing(3, 2)}}>
    {generateTitle(json)}
    {renderSections(json)}
  </Paper>;
}

const removeWhiteSpaceAndLowercase = name => name.toLowerCase().replace(/\s/g, "");

const generateTitle = ({blurb, icon, name}) => (
  <>
    <Typography id={removeWhiteSpaceAndLowercase(name)} variant={"h3"}
                style={{overflow: "auto", overflowY: "hidden"}}>
      {name} <img style={{height: "1em"}} src={icon} alt={name}/>
    </Typography>
    <Typography variant={"subtitle2"} paragraph={true}>
      {blurb}
    </Typography>
  </>
);





