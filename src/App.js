import "./App.css";
import RulebookAppBar from "./components/Header";
import { Overview } from "./components/Overview";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "./ThemeProvider";
import { Container, CssBaseline, useMediaQuery } from "@material-ui/core";
import { blue, yellow } from "@material-ui/core/colors";
import { InDepthSkillList } from "./components/InDepthSkillList";
import InDepthView from "./components/InDepthView";
import { entries } from "./jsonParsing/jsonProcessingUtils";
import React, { PureComponent, useState } from "react";
import * as PropTypes from "prop-types";
import { CopyrightFooter } from "./components/footer/copyright_footer";

function HistoryObject(currentState) {
  this.currentState = currentState;
}

function getFavoriteArticles() {
  return JSON.parse(localStorage.getItem("favorites"));
}

function MainContent(props: {
  theme: PropTypes.any,
  inDepth: PropTypes.bool,
  toggleBool: PropTypes.bool,
  skillObject: PropTypes.any,
  currentView: PropTypes.any,
  learnMore: PropTypes.func,
  updateCheatSheet: PropTypes.func,
  cheatSheetInDepth: PropTypes.bool,
  skillList: PropTypes.any
}) {
  const isDesktop = useMediaQuery("(min-width:600px)");
  var isViewingSkill =
    !isDesktop && [views.INDEPTH, views.LIST].includes(props.currentView);
  return (
    <div
      color={"primary"}
      style={{
        padding: isViewingSkill ? "0" : props.theme.spacing(3),
        flex: 1,
        marginLeft: isDesktop
          ? props.theme.spacing.unit * 9 + 1
          : props.theme.spacing.unit * 7 + 1
      }}
    >
      <Container
        style={{
          paddingLeft: isViewingSkill && "0",
          paddingRight: isViewingSkill && "0"
        }}
      >
        {props.currentView === views.INDEPTH && (
          <InDepthView
            displayTableOfContents={true}
            isDesktop={isDesktop}
            toggleBool={props.toggleBool}
            skillObject={props.skillObject}
            theme={props.theme}
          />
        )}
        {props.currentView === views.OVERVIEW && (
          <Overview
            theme={props.theme}
            learnMore={props.learnMore}
            currentView={props.skillObject}
            updateCheatSheet={props.updateCheatSheet}
            toggleBool={props.toggleBool}
            isDesktop={isDesktop}
          />
        )}
        {props.currentView === views.LIST && (
          <InDepthSkillList
            toggleBool={props.toggleBool}
            skillList={props.skillObject}
            isDesktop={isDesktop}
            theme={props.theme}
          />
        )}
      </Container>
    </div>
  );
}

MainContent.propTypes = {
  cheatSheetInDepth: PropTypes.bool,
  currentView: PropTypes.any,
  inDepth: PropTypes.bool,
  learnMore: PropTypes.func,
  skillList: PropTypes.any,
  skillObject: PropTypes.any,
  theme: PropTypes.any,
  toggleBool: PropTypes.bool,
  updateCheatSheet: PropTypes.func
};

const views = {
  OVERVIEW: "Overview",
  INDEPTH: "",
  LIST: "List"
};

class App extends PureComponent {
  stack = [];

  constructor(props) {
    super(props);
    let hasFavoritedSkills = this.getFavoritedSkills().length > 0;
    /**
     * States:
     * currentView: The view the overview should display (magic, culture, etc.)
     * inDepth: Whether the program should display in depth information
     * theme: Dark/light mode
     * cheatSheet: Whether the cheat sheet overview should be displayed
     * cheatSheetInDepth: Whether the cheat sheet in depth page should be displayed
     * @type {{cheatSheet: boolean, currentView: *[], theme, cheatSheetInDepth: boolean, open: boolean, inDepth: boolean}}
     */
    this.state = {
      currentView: views.OVERVIEW,
      viewInfo: hasFavoritedSkills ? this.getFavoritedSkills() : entries,
      theme: createTheme(blue, yellow, "light"),
      open: false,
      name: hasFavoritedSkills ? "Cheat Sheet" : `All Skills ${views.OVERVIEW}`
    };
    this.toggleBool = false;
  }

  /**
   * Returns an array of favorited objects/skills
   * @returns {Array} All of the skill objects that you have favorited
   */
  getFavoritedSkills = () => {
    let favorites = getFavoriteArticles();
    let skillObjects = [];
    if (favorites) {
      entries.forEach(article => {
        if (favorites.includes(article.name)) skillObjects.push(article);
      });
    }
    return skillObjects;
  };

  /**
   * Re-renders the cheat sheet when the cheat sheet is being modified
   */
  updateCheatSheet = () => {
    if (this.state.view === views.OVERVIEW) {
      this.setState({
        viewInfo: this.getFavoritedSkills()
      });
    }
  };

  /**
   * Go back to the previous state, close side bar, and keep light/dark mode the same
   */
  back = () => {
    let lightMode = this.state.theme.palette.type === "light";
    this.stack.pop();
    let stateObject = this.stack.pop();
    this.setState(stateObject.currentState);
    this.setState({
      open: false
    });
    this.setLightOrDarkMode(lightMode);
  };

  /**
   * Sets the mode: true for light mode, false for dark mode
   * @param lightMode The boolean for whether light mode is on or off
   */
  setLightOrDarkMode = lightMode => {
    if (lightMode) {
      this.setState({
        theme: createTheme(blue, yellow, "light")
      });
    } else {
      this.setState({
        theme: createTheme(blue, yellow, "dark")
      });
    }
  };

  /**
   * Toggles the drawer
   */
  toggleDrawer = () => {
    if (!this.state.open) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  };

  /**
   * Change the information the overview should display
   * @param overviewType The object containing the information that should be displayed
   * @param viewName The name of the view that will be displayed
   * @param customName A custom name for the view
   */
  displayOverview = (overviewType, viewName, customName = "") => {
    console.log("Changing overview!");
    console.log(overviewType);
    window.scrollTo(0, 0);
    this.setState({
      currentView: views.OVERVIEW,
      viewInfo: overviewType,
      name: customName ? customName : `${viewName} ${views.OVERVIEW}`
    });
  };

  /**
   * Have the overview display the cheat sheet
   */
  displayCheatSheet = () => {
    window.scrollTo(0, 0);
    this.setState({
      currentView: views.OVERVIEW,
      viewInfo: this.getFavoritedSkills(),
      name: "Cheat Sheet"
    });
    this.forceUpdate();
  };

  /**
   * Displays in depth information about a skill
   * @param effect The skill that is being displayed
   * @param scrollTo A section that will be scrolled to when the view changes
   */
  displayInDepthView = (effect, scrollTo = null) => {
    window.scrollTo(0, 0);
    console.log(effect);
    this.setState(
      {
        viewInfo: effect,
        currentView: views.INDEPTH,
        open: false,
        name: `${effect.name} ${views.INDEPTH}`
      },
      () => {
        if (scrollTo !== null) {
          window.scrollTo(
            0,
            document.getElementById(`${scrollTo}`).offsetTop - 100
          );
          // window.history.replaceState({}, document.title, ".");
        }
      }
    );
  };

  /**
   * Sets the state for an in depth cheat sheet
   */
  displayInDepthCheatSheet = () => {
    window.scrollTo(0, 0);
    this.setState({
      currentView: views.LIST,
      open: false,
      viewInfo: this.getFavoritedSkills(),
      name: "Cheat Sheet"
    });
  };

  /**
   * Sets the state to display a list of all skills in a category
   * @param skillCategory The category to display all skills of
   * @param categoryName The name of the category being displayed
   * @param customName A custom name for the view
   */
  displayList = (skillCategory, categoryName, customName = "") => {
    window.scrollTo(0, 0);
    this.setState({
      viewInfo: skillCategory,
      currentView: views.LIST,
      open: false,
      name: customName ? customName : `${categoryName} ${views.LIST}`
    });
  };

  /**
   * Switch between light and dark theme
   */
  switchTheme = () => {
    if (this.state.theme.palette.type === "light") {
      this.setState({
        theme: createTheme(blue, yellow, "dark")
      });
    } else {
      this.setState({
        theme: createTheme(blue, yellow, "light")
      });
    }
    this.stack.pop();
  };

  render() {
    this.toggleBool ? (this.toggleBool = false) : (this.toggleBool = true);
    this.stack.push(new HistoryObject(this.state));
    return (
      <MuiThemeProvider theme={this.state.theme}>
        <CssBaseline />
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column"
          }}
        >
          <div className="App" />
          <RulebookAppBar
            toggleDrawer={this.toggleDrawer}
            open={this.state.open}
            switchTheme={this.switchTheme}
            changeview={this.displayInDepthView}
            onclick={this.displayOverview}
            back={this.back}
            backable={
              this.state.currentView === views.INDEPTH ||
              this.state.currentView === views.LIST
            }
            name={this.state.name}
            cheatSheet={this.displayCheatSheet}
            cheatSheetInDepth={this.displayInDepthCheatSheet}
            renderCategory={this.displayList}
            theme={this.state.theme}
          />
          <MainContent
            theme={this.state.theme}
            toggleBool={this.toggleBool}
            skillObject={this.state.viewInfo}
            currentView={this.state.currentView}
            learnMore={this.displayInDepthView}
            updateCheatSheet={this.updateCheatSheet}
          />
          <CopyrightFooter />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
