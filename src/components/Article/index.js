import PropTypes from "prop-types";
import React from "react";
import { Paper, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { ImportantIdea } from "../ArticleComponents/ImportantIdea";
import ReactMarkdown from "react-markdown";

const generateTitle = ({ blurb, icon, name }) => (
  <>
    <Typography
      id={name.toLowerCase().replace(/\s/g, "")}
      variant={"h3"}
      style={{ overflow: "auto", overflowY: "hidden" }}
    >
      {name} <img style={{ height: "1em" }} src={icon} alt={name} />
    </Typography>
    <Typography variant={"subtitle2"} paragraph={true}>
      {blurb}
    </Typography>
  </>
);

const renderSections = json => (
  <>
    {json.sections
      .map(section => {
        const processComponent = component => {
          switch (component.type) {
            case "emphasis":
              return (
                <ImportantIdea
                  name={component.name}
                  description={component.text}
                />
              );
            default:
              return (
                <>
                  {component.name && (
                    <Typography variant={"h6"}>{component.name}</Typography>
                  )}
                  <Typography variant={"body1"}>
                    <ReactMarkdown source={component.text} />
                  </Typography>
                </>
              );
          }
        };

        return (
          <>
            {section.name.trim() !== "" && (
              <>
                <Typography
                  id={
                    json.name.toLowerCase().replace(/\s/g, "") +
                    section.name.toLowerCase().replace(/\s/g, "")
                  }
                  paragraph
                  style={{ paddingTop: 16 }}
                  variant={"h4"}
                >
                  {section.name}
                </Typography>
              </>
            )}
            {section.subsections.map(subsection => (
              <React.Fragment>
                <Typography
                  id={
                    json.name.toLowerCase().replace(/\s/g, "") +
                    subsection.name.toLowerCase().replace(/\s/g, "")
                  }
                  variant={"h6"}
                >
                  {subsection.name}
                </Typography>
                <Typography paragraph>
                  {subsection.components.map(component =>
                    processComponent(component)
                  )}
                </Typography>
              </React.Fragment>
            ))}
          </>
        );
      })
      .reduce((prev, curr) => [
        prev,
        <Divider variant={"middle"} light />,
        curr
      ])}
  </>
);

export const generateArticle = (json, theme) => (
  <Paper style={{ padding: theme.spacing(3, 2) }}>
    {generateTitle(json)}
    {renderSections(json)}
  </Paper>
);

export const Article = props => {
  return (
    <Grid wrap={"nowrap"} direction={"column-reverse"} container spacing={2}>
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
