import PropTypes from "prop-types";
import React from "react";

export function CardTitle({ icon, name }) {
  return (
    <span>
      {name}
      &nbsp;
      <img style={{ height: "1em" }} src={icon} alt={name} />{" "}
    </span>
  );
}

CardTitle.propTypes = {
  icon: PropTypes.any,
  name: PropTypes.string.isRequired
};
