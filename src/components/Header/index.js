import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import BackIcon from "@material-ui/icons/ArrowBack";
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
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

const RulebookAppbar = props => {
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
        {!useMediaQuery("(min-width:600px)") && window.innerHeight > window.innerWidth && (
          <Typography variant="h6" noWrap>
            {props.name}
          </Typography>
        )}
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

export default React.memo(RulebookAppbar);

RulebookAppbar.propTypes = {
  back: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  switchTheme: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  toggleViewType: PropTypes.func.isRequired,
  view: PropTypes.object.isRequired
};
