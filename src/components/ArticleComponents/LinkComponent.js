import PropTypes from "prop-types";
import React from "react";

//TODO Replace with goto behavior
export default function LinkComponent(props) {
  return <span className={"link"}>{props.children}</span>;
}

LinkComponent.propTypes = {linkProps: PropTypes.func};
