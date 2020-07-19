import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import BackIcon from "@material-ui/icons/ArrowBack"
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";
import React from "react";
import SearchBar from "../SearchBar";
import Tooltip from "@material-ui/core/Tooltip";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import DarkModeIcon from "@material-ui/icons/WbIncandescent";
import { ViewsEnum } from "../MainContent";
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
          <IconButton color={"inherit"} onClick={props.toggleViewType}>
            <ViewListIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={"Grid View"}>
          <IconButton color={"inherit"} onClick={props.toggleViewType}>
            <ViewModuleIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}

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
        {props.history.length > 0 ? (
          <IconButton color="inherit" aria-label="open drawer" onClick={props.back} edge="start">
            <BackIcon />
          </IconButton>
        ) : (
          <IconButton color="inherit" aria-label="open drawer" onClick={props.onClick} edge="start">
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap>
          Rulebook V3
        </Typography>
        <SearchBar changeview={props.changeView} theme={props.theme} />
        <div className={classes.grow} />
        <ViewTypeToggleButton view={props.view} toggleViewType={props.toggleViewType} />
        <IconButton
          color={"inherit"}
          onClick={event => {
            event.preventDefault();
            props.switchTheme();
          }}
        >
          <DarkModeIcon />
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

ViewTypeToggleButton.propTypes = {
  toggleViewType: PropTypes.func.isRequired,
  view: PropTypes.object.isRequired
}