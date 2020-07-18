import Typography from "@material-ui/core/Typography";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import React from "react";

export function TextComponent(props) {
  return (
    <>
      {props.component.name && <Typography variant={"h6"}>
        {props.component.name}
      </Typography>}
      <Typography component={"p"} variant={"body1"}>
        <ReactMarkdown escapeHtml={false} renderers={{paragraph: props => <p style={{marginTop: 0}}>{props.children}</p>}} source={props.component.text} />
      </Typography>
    </>
  );
}

TextComponent.propTypes = {
  component: PropTypes.any,
  index: PropTypes.any
};
