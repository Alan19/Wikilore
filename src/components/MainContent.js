import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { RulebookAppbar } from "./Header";
import { Container, createMuiTheme, MuiThemeProvider, useMediaQuery } from "@material-ui/core";
import { RulebookDrawer } from "./Drawer";
import { Article } from "./Article/Article";
import Grid from "@material-ui/core/Grid";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { GridView } from "./GridView";
import {blue, orange} from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(9) + 1
    }
  }
}));

export default props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const ViewsEnum = Object.freeze({ GRID: "GRID", ARTICLE: "ARTICLE" });
  const [view, setView] = useState(ViewsEnum.GRID);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [loadedArticles, setLoadedArticles] = useState(props.articles);
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: blue,
          secondary: orange,
          type: prefersDarkMode ? "dark" : "light"
        }
      }),
    [prefersDarkMode]
  );

  function learnMore(article, sectionId) {
    console.log(article);
    window.scrollTo(0, 0);
    setLoadedArticles([article]);
    setView(ViewsEnum.ARTICLE);
    if (sectionId != null){
      window.scrollTo(0, document.getElementById(sectionId));
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <RulebookAppbar classes={classes} open={open} onClick={toggleDrawer} theme={theme} changeView={learnMore} />
        <RulebookDrawer classes={classes} open={open} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container>
            <Grid container justify={"flex-end"}>
              {view === ViewsEnum.GRID ? (<Tooltip title={"Article View"}><IconButton onClick={() => setView(ViewsEnum.ARTICLE)}><ViewListIcon /></IconButton></Tooltip>) :
                (<Tooltip title={"Grid View"}><IconButton onClick={() => setView(ViewsEnum.GRID)}><ViewModuleIcon /></IconButton></Tooltip>)}
            </Grid>
            {view === ViewsEnum.ARTICLE && (<>{loadedArticles.map(article => (<Article key={article} json={article} />))}</>)}
            {view === ViewsEnum.GRID && <GridView learnMore={learnMore} loadedArticles={loadedArticles} />}
          </Container>
        </main>
      </div>
    </MuiThemeProvider>
  );
};
