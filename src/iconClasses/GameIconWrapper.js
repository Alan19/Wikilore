import { SvgIcon } from "@material-ui/core";
import React from "react";

function GameIconWrapper(props) {
  return (
    <React.Fragment>
      <SvgIcon viewBox={"0 0 512 512"}>
        <path d={props.path} />
      </SvgIcon>
    </React.Fragment>
  );
}

export default GameIconWrapper;
