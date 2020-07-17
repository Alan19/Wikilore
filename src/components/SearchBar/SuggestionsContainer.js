import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";

export function SuggestionsContainer(props) {
  return <Paper{...props.options.containerProps} style={{backgroundColor: props.theme.palette.background.paper}} square>{props.options.children}</Paper>;
}

SuggestionsContainer.propTypes = {
  options: PropTypes.any,
  theme: PropTypes.any
};