import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { RulebookAppbar } from "./Header";
import { Container, createMuiTheme, MuiThemeProvider, useMediaQuery } from "@material-ui/core";
import { RulebookDrawer } from "./Drawer";
import { GridView } from "./GridView";
import { blue, orange } from "@material-ui/core/colors";
import ArticleView from "./ArticleView";
import Typography from "@material-ui/core/Typography";
import { copyright } from "../config";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
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
    whiteSpace: "nowrap",
    zIndex: theme.zIndex.drawer
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

export const ViewsEnum = Object.freeze({ GRID: "GRID", ARTICLE: "ARTICLE" });

export function getFavoriteArticles(articles) {
  return localStorage.getItem("favoriteArticles") ? articles.filter(article => JSON.parse(localStorage.getItem("favoriteArticles")).includes(article.name)) : articles;
}

export default props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") ? localStorage.getItem("darkMode") === "true" : useMediaQuery("(prefers-color-scheme: dark)"));

  //State
  const [view, setView] = useState(ViewsEnum.GRID);
  const [loadedArticles, setLoadedArticles] = useState(getFavoriteArticles(props.articles));
  const [targetId, setTargetId] = useState("");
  const [history, setHistory] = useState([]);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: blue,
          secondary: orange,
          type: darkMode ? "dark" : "light"
        }
      }),
    [darkMode]
  );

  /**
   * Function to look at a certain article
   * @param article The article to set as the view
   * @param sectionId The ID of the section to scroll to
   */
  const learnMore = (article, sectionId = "") => {
    window.scrollTo(0, 0);
    if (sectionId !== "") {
      setTargetId(sectionId);
    }
    handleArticleChange([article]);
    setView(ViewsEnum.ARTICLE);
  };

  /**
   * Scroll to a certain part of the page when the view is changed and supplied with an ID to jump to
   */
  useEffect(() => {
    if (targetId && document.getElementById(targetId)) {
      window.scrollTo(0, document.getElementById(targetId).offsetTop - 100);
    }
    setTargetId("");
  }, [targetId]);

  /**
   * Switch between light and dark theme
   */
  const switchTheme = () => {
    setDarkMode(!darkMode);
  };

  /**
   * Updates the localstorage when the light/dark theme is toggled
   */
  useEffect(() => localStorage.setItem("darkMode", darkMode ? "true" : "false"), [darkMode]);

  /**
   * Changes the current view type, and updates the history
   * @param view The view type to switch to
   */
  const handleViewChange = view => {
    pushHistory();
    setView(view);
  };

  /**
   * Changes the current article, and updates the history
   * @param articles The list of articles to display
   */
  const handleArticleChange = articles => {
    pushHistory();
    setLoadedArticles(articles);
  };

  /**
   * Pushes an element to the history 'stack', which includes the view and loaded article
   */
  const pushHistory = () => {
    history.push({ view: view, loadedArticles: loadedArticles, verticalPosition: window.scrollY });
    setHistory(history);
  };

  /**
   * Pops the history 'stack' and set the article and view state to the popped element
   */
  const back = () => {
    const newState = history.pop();
    setHistory(history);
    setView(newState.view);
    setLoadedArticles(newState.loadedArticles);
  };

  /**
   * Toggles the view type (article/grid), but does not update the history
   */
  const toggleViewType = () => {
    if (view === ViewsEnum.GRID) {
      setView(ViewsEnum.ARTICLE);
    } else {
      setView(ViewsEnum.GRID);
    }
  };

  const changeCategory = articles => {
    pushHistory();
    setLoadedArticles(articles);
    setOpen(false);
    setView(ViewsEnum.GRID);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <RulebookAppbar toggleViewType={toggleViewType} history={history} back={back} switchTheme={switchTheme} classes={classes} open={open} onClick={toggleDrawer} theme={theme} changeView={learnMore} setView={handleViewChange} view={view} />
        <RulebookDrawer articles={props.articles} categories={props.categories} switchArticles={changeCategory} classes={classes} open={open} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container>
            {view === ViewsEnum.ARTICLE && <ArticleView loadedArticles={loadedArticles} setSection={setTargetId} />}
            {view === ViewsEnum.GRID && <GridView learnMore={learnMore} loadedArticles={loadedArticles} />}
          </Container>
        </main>
        <Typography style={{ textAlign: "right", paddingRight: 5 }} variant={"overline"}>
          {copyright}
        </Typography>
      </div>
    </MuiThemeProvider>
  );
};
