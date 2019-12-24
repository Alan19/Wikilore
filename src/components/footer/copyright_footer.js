import { Typography } from "@material-ui/core";
import { copyright } from "../../config";
import React from "react";

export function CopyrightFooter() {
  return (
    <Typography
      style={{ textAlign: "right", paddingRight: 5 }}
      variant={"overline"}
    >
      {copyright}
    </Typography>
  );
}
