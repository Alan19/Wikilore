import PropTypes from "prop-types";
import React from "react";

export function Span(props) {
  return <span>{props.children}</span>;
}

Span.propTypes = {props: PropTypes.any};