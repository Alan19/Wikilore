import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";
import React from "react";
import SearchBar from "./SearchBar";

export const RulebookAppbar = props => {
  const { appBar, appBarShift } = props.classes;
  return (
    <AppBar
      position="fixed"
      className={clsx(appBar, {
        [appBarShift]: props.open
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.onClick}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Rulebook V3
        </Typography>
        <SearchBar theme={props.theme}/>
      </Toolbar>
    </AppBar>
  );
};

RulebookAppbar.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  onClick: PropTypes.func
};
