import {
  AppBar,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
import classNames from "classnames";
import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheatSheetIcon from "../iconClasses/CheatSheetIcon";
import ExpandedCheatSheetIcon from "../iconClasses/ExpandedCheatSheetIcon";
import GameIconWrapper from "../iconClasses/GameIconWrapper";
import { categories, entries } from "../jsonParsing/jsonProcessingUtils";

const drawerWidth = 240;

const styles = theme => ({
  menuButton: {
    marginLeft: 0,
    marginRight: 36
  },
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: {
    ...theme.mixins.toolbar
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});

function AppBarButtons(props) {
  return (
    <React.Fragment>
      <Tooltip title={"Toggle Light/Dark Theme"}>
        <IconButton
          onClick={props.switchTheme}
          color={"inherit"}
          label={"Switch Light/Dark Theme"}
        >
          <Icon>highlight</Icon>
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

AppBarButtons.propTypes = {
  onClick: PropTypes.func,
  onClick1: PropTypes.func,
  onClick2: PropTypes.func
};

function CheatSheetItems(props) {
  const { cheatSheetInDepth, onClick } = props;
  return (
    <React.Fragment>
      <Tooltip title={"Your Favorites"} placement={"right"}>
        <ListItem onClick={onClick} button>
          <ListItemIcon>
            <CheatSheetIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ noWrap: true }}
            primary={"Your Favorites"}
          />
        </ListItem>
      </Tooltip>
      <Tooltip title={"Cheat Sheet"} placement={"right"}>
        <ListItem
          onClick={() => cheatSheetInDepth()}
          button
          key={"Cheat Sheet"}
        >
          <ListItemIcon>
            <ExpandedCheatSheetIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ noWrap: true }}
            primary={"Cheat Sheet"}
          />
        </ListItem>
      </Tooltip>
    </React.Fragment>
  );
}

CheatSheetItems.propTypes = { onClick: PropTypes.func };

let indexIcon = (
  <GameIconWrapper
    path={
      "M146.217 28.218l-100.07 42.86 106.296 248.194 41.188-17.64-27.606-191.945-1.28-8.909 78.567-11.3-12.519-29.23c-16.682 3.773-28.871 3.449-47.402 21.062l-5.993 5.693-6.181-5.484c-18.118-16.072-20.828-36.566-25-53.301zm18.912.492c3.243 12.805 5.535 24.275 12.777 33.68 12.818-10.212 24.447-14.227 34.951-16.733-14.485-7.674-29.652-12.217-47.728-16.947zm127.746 71.826l-107.752 15.496 38.436 267.25 36.978-5.318 23.188-193.996 1.068-8.936 86.086 10.29-4.598-31.96c-17.092-.671-28.78-4.14-51.24 8.076l-7.26 3.95-4.552-6.899c-13.34-20.213-10.655-40.708-10.354-57.953zm18.139 5.367c-.182 13.21-.937 24.883 3.625 35.842 15.025-6.547 27.298-7.415 38.093-7.117-12.006-11.162-25.481-19.477-41.718-28.725zm-10.485 89.139l-32.043 268.092 172.77 20.648 24.598-205.793c-16.337-5.073-26.73-11.452-51.586-5.465l-8.034 1.936-2.61-7.84c-7.655-22.977.243-42.079 4.997-58.658zm124.225 22.799c-3.594 12.713-7.345 23.792-5.775 35.558 16.207-2.435 28.286-.097 38.636 2.985-8.708-13.889-19.571-25.409-32.861-38.543z"
    }
  />
);

function Index(props) {
  return (
    <Tooltip title={"Index"} placement={"right"}>
      <ListItem onClick={props.onClick} button>
        <ListItemIcon>{indexIcon}</ListItemIcon>
        <ListItemText primary={"Index"} />
      </ListItem>
    </Tooltip>
  );
}

Index.propTypes = { onClick: PropTypes.func };

let indexListIcon = (
  <GameIconWrapper
    path={
      "M402.488 45.148c-29.932 24.474-69.636 42.525-111.175 57.262C335.04 94.3 376.27 83.816 413.135 69.98c-2.7-8.61-6.116-16.916-10.647-24.83zM41 73v135.764c11.918-41.227 23.38-84.748 34.512-126.996L77.82 73H41zm41.518 0l5.884 3.096c27.917 14.682 57.075 28.881 87.127 42.482 2.96-.305 5.913-.62 8.866-.937L169.514 73H82.518zm366.652 1.447c-88.208 40.349-203.608 56.834-319.715 66.387L131.451 151h327.77c-4.066-30.318-7.69-57.252-10.051-76.553zM90.059 97.143C71.419 167.87 51.807 241.39 30.283 302.035l24.479 10.158L88.697 151h24.412l-3.246-16.525-1.947-9.91 10.07-.795c7.394-.584 14.783-1.197 22.164-1.84A1638.49 1638.49 0 0 1 90.06 97.143zM103.303 169L43.092 455h381.605l60.211-286H103.303zM477.27 292.654l-19.336 91.852c9.008-.398 17.683-.77 27.27-1.213-.725-21.697-3.794-54.23-7.934-90.639zM41 325.97v51.594l9.99-47.45L41 325.97z"
    }
  />
);

function Glossary(props) {
  return (
    <Tooltip title={"Glossary"} placement={"right"}>
      <ListItem onClick={props.onClick} button>
        <ListItemIcon>{indexListIcon}</ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ noWrap: true }}
          primary={"Glossary"}
        />
      </ListItem>
    </Tooltip>
  );
}

Glossary.propTypes = { onClick: PropTypes.func };

class SkillDrawer extends PureComponent {
  render() {
    const {
      classes,
      open,
      renderCategory,
      cheatSheetInDepth,
      onclick,
      cheatSheet
    } = this.props;
    return (
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar} />
        <List>
          <CheatSheetItems
            cheatSheetInDepth={cheatSheetInDepth}
            onClick={() => cheatSheet()}
            key={"Cheat Sheet"}
          />
          <Divider />
          <React.Fragment>
            <Index
              onClick={() => onclick(entries, "Index", "Index")}
              key={"Index"}
            />
            <Glossary
              onClick={() => renderCategory(entries, "Index", "Index")}
              key={"Glossary"}
            />
            <Divider />
          </React.Fragment>
          {categories.map(category => this.generateCategoryEntries(category))}
          <Divider />
          {categories.map(category => this.generateListEntries(category))}
        </List>
      </Drawer>
    );
  }

  generateListEntries(category) {
    const { renderCategory } = this.props;
    const { indexIcon: indexIcon1, articles, name } = category;
    return (
      <Tooltip title={name + " List"} placement={"right"}>
        <ListItem
          onClick={() => renderCategory(articles, name)}
          button
          key={name + " List"}
        >
          <ListItemIcon>
            <GameIconWrapper path={indexIcon1} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ noWrap: true }}
            primary={name + " List"}
          />
        </ListItem>
      </Tooltip>
    );
  }

  /**
   * Generates entries in the drawer
   * @param category The variable containing information about a category
   * @returns {*}
   */
  generateCategoryEntries(category) {
    const { overviewIcon, name } = category;
    return (
      <Tooltip title={name} placement={"right"}>
        <ListItem
          onClick={() => {
            return this.props.onclick(category.articles, category.name);
          }}
          button
          key={name}
        >
          <ListItemIcon>
            <GameIconWrapper path={overviewIcon} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ noWrap: true }}
            primary={name}
          />
        </ListItem>
      </Tooltip>
    );
  }
}

SkillDrawer.propTypes = {
  classes: PropTypes.any,
  open: PropTypes.bool
};

function BackButton(props) {
  const { classes, visibility, onClick } = props;
  return (
    <IconButton
      style={{ visibility: visibility }}
      color="inherit"
      aria-label="Menu"
      onClick={onClick}
      className={classes.menuButton}
    >
      <Icon>arrow_back</Icon>
    </IconButton>
  );
}

BackButton.propTypes = {
  visibility: PropTypes.any,
  onClick: PropTypes.func
};

function DrawerButton({ classes, onClick, open }) {
  return (
    <IconButton
      color="inherit"
      aria-label="Open drawer"
      onClick={onClick}
      className={classNames(classes.menuButton, {
        [classes.hide]: open
      })}
    >
      <Icon>menu</Icon>
    </IconButton>
  );
}

DrawerButton.propTypes = {
  onClick: PropTypes.func,
  classes: PropTypes.any,
  open: PropTypes.any
};

export function NavBar(props) {
  const { classes } = props;
  const {
    switchTheme,
    theme,
    open,
    renderCategory,
    back,
    backable,
    cheatSheetInDepth,
    name,
    changeview,
    cheatSheet,
    toggleDrawer,
    onclick
  } = props;
  return (
    <React.Fragment>
      <AppBar position="sticky" className={classes.appBar} color={"primary"}>
        <Toolbar>
          {backable && <BackButton classes={classes} onClick={() => back()} />}
          {!backable && (
            <DrawerButton
              onClick={toggleDrawer}
              classes={classes}
              open={open}
            />
          )}
          <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
            {name}&nbsp;&nbsp;
          </Typography>
          <SearchBar changeview={changeview} theme={theme} />

          <div style={{ marginLeft: 30 }}>
            <AppBarButtons switchTheme={() => switchTheme()} />
          </div>
        </Toolbar>
      </AppBar>
      <SkillDrawer
        cheatSheet={cheatSheet}
        cheatSheetInDepth={cheatSheetInDepth}
        classes={classes}
        open={open}
        renderCategory={renderCategory}
        onclick={onclick}
      />
    </React.Fragment>
  );
}

export default withStyles(styles, { withTheme: true })(NavBar);
