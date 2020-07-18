import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";
import React from "react";
import SearchBar from "../SearchBar";
import Tooltip from "@material-ui/core/Tooltip";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import DarkModeIcon from "@material-ui/icons/WbIncandescent"
import {ViewsEnum} from "../MainContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}));

function ViewTypeToggleButton(props) {
  return (
    <>
      {props.view === ViewsEnum.GRID ? (
        <Tooltip title={"Article View"}>
          <IconButton color={"inherit"} onClick={props.onClick}>
            <ViewListIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={"Grid View"}>
          <IconButton color={"inherit"} onClick={props.onClick1}>
            <ViewModuleIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}

ViewTypeToggleButton.propTypes = {
  view: PropTypes.any,
  onClick: PropTypes.func,
  onClick1: PropTypes.func
};


export const RulebookAppbar = props => {
  const { appBar, appBarShift } = props.classes;
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(appBar, {
        [appBarShift]: props.open
      })}
    >
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={props.onClick} edge="start">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Rulebook V3
        </Typography>
        <SearchBar changeview={props.changeView} theme={props.theme} />
        <div className={classes.grow} />
        <ViewTypeToggleButton view={props.view} onClick={() => props.setView(ViewsEnum.ARTICLE)} onClick1={() => props.setView(ViewsEnum.GRID)} />
        <IconButton color={"inherit"} onClick={event => {
          event.preventDefault();
          props.switchTheme()
        }}>
          <DarkModeIcon/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

RulebookAppbar.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  onClick: PropTypes.func
};
