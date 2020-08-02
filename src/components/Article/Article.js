import PropTypes from "prop-types";
import React from "react";
import { Paper, useTheme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Sections from "./RenderSections";

function Article(props) {
  const { setSection, json } = props;
  return (
    <Paper style={{ padding: useTheme().spacing(3, 2), marginBottom: useTheme().spacing(1) }}>
      {generateTitle(json)}
      <Sections json={json} setSection={setSection} />
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

Article.propTypes = {
  json: PropTypes.object.isRequired,
  setSection: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

export default React.memo(Article)
