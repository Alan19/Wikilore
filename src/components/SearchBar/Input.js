import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Icon} from "@material-ui/core";
import React from "react";

export function renderInputComponent(props) {
  const {classes, inputRef = () => {}, ref, ...other} = props;

  let inputProps = {
    inputRef: node => {
      ref(node);
      inputRef(node);
    },
    classes: {root: classes.inputRoot, input: classes.input, focused: classes.cssFocused},
    disableUnderline: true,
    startAdornment: <InputAdornment position="start"><Icon color={"primary"}>search</Icon></InputAdornment>
  };
  return <TextField fullWidth InputProps={inputProps} {...other}/>;
}