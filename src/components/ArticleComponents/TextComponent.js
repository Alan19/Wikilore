import Typography from "@material-ui/core/Typography";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import React from "react";
import { titleRenderer } from "../Article/RenderSections";

export function TextComponent(props) {
  return (
    <>
      <Typography component={"p"} variant={"body1"}>
        <ReactMarkdown
          escapeHtml={false}
          className={"contentMarkdown"}
          renderers={{
            heading: markdownProps => <Typography variant={"body1"}>{markdownProps.children}</Typography>,
            paragraph: markdownProps => <p style={{ marginTop: 0 }}>{markdownProps.children}</p>,
            ...titleRenderer(props.articleName, props.setSection)
          }}
          source={props.component.text}
        />
      </Typography>
    </>
  );
}

TextComponent.propTypes = {
  component: PropTypes.any,
  index: PropTypes.any
};
