import PropTypes from "prop-types";
import React from "react";

export default function LinkComponent(props) {
  return <span onClick={props.setSection} className={"link"}>{props.children}</span>;
}

LinkComponent.propTypes = {linkProps: PropTypes.func};
