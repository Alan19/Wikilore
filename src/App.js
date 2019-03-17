import React, { Component } from "react";
import "./App.css";
import RenderAppBar from "./components/Header";
import { allSkills, copyright, defaultCategory, info } from "./info";
import { Overview } from "./components/Overview";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "./ThemeProvider";
import { CssBaseline, Typography } from "@material-ui/core";
import { blue, yellow } from "@material-ui/core/colors";
import { InDepthSkillList } from "./components/InDepthSkillList";
import * as PropTypes from "prop-types";
import unstable_useMediaQuery from "@material-ui/core/useMediaQuery/unstable_useMediaQuery";
import InDepthView from "./components/InDepthView";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function HistoryObject(currentState) {
  this.currentState = currentState;
}

function getFavoriteSkills() {
  return JSON.parse(localStorage.getItem("favorites")) === null
    ? []
    : JSON.parse(localStorage.getItem("favorites"));
}

function MainContent(props) {
  const isDesktop = unstable_useMediaQuery("(min-width:600px)");
  // console.log(props.getSkillsFromCheatSheet);
  return (
    <div
      color={"primary"}
      style={{
        padding: props.theme.spacing.unit * 3,
        flex: 1,
        marginLeft: isDesktop
          ? props.theme.spacing.unit * 9 + 1
          : props.theme.spacing.unit * 7 + 1
      }}
    >
      <Switch>
        <Route
          path={"/overview"}
          render={routeProps => (
            <Overview
              theme={props.theme}
              learnMore={props.learnMore}
              currentView={findSection(
                routeProps.location.state.displayedSection
              )}
              updateCheatSheet={props.updateCheatSheet}
              isDesktop={isDesktop}
            />
          )}
        />
        <Route
          path={"/indepth"}
          render={routeProps => (
            <InDepthView
              isDesktop={isDesktop}
              skillObject={findSkill(routeProps.location.state.topic)}
              theme={props.theme}
            />
          )}
        />
        <Route
          path={"/indepthlist"}
          render={routeProps => (
            <InDepthSkillList
              isDesktop={isDesktop}
              skillList={findSection(routeProps.location.state.displayedList)}
              theme={props.theme}
            />
          )}
        />
        <Route
          path={"/favorites"}
          render={routeProps => {
            return (
              <Overview
                theme={props.theme}
                learnMore={props.learnMore}
                currentView={props.getSkillsFromCheatSheet}
                updateCheatSheet={props.updateCheatSheet}
                isDesktop={isDesktop}
              />
            );
          }}
        />
        <Route
          path={"/cheatsheet"}
          render={routeProps => {
            return (
              <InDepthSkillList
                isDesktop={isDesktop}
                skillList={props.getSkillsFromCheatSheet}
                theme={props.theme}
              />
            );
          }}
        />
        <Route
          path={"/index"}
          render={routeProps => (
            <Overview
              theme={props.theme}
              learnMore={props.learnMore}
              currentView={allSkills}
              updateCheatSheet={props.updateCheatSheet}
              isDesktop={isDesktop}
            />
          )}
        />
        <Route
          path={"/glossary"}
          render={routeProps => (
            <InDepthSkillList
              isDesktop={isDesktop}
              skillList={allSkills}
              theme={props.theme}
            />
          )}
        />
      </Switch>
    </div>
  );
}

function findSection(id) {
  return info[id].infoObj;
}

function findSkill(id) {
  return allSkills.filter(skill => skill.id === id)[0];
}

MainContent.propTypes = {
  theme: PropTypes.any,
  inDepth: PropTypes.bool,
  skillObject: PropTypes.any,
  currentView: PropTypes.any,
  learnMore: PropTypes.func,
  updateCheatSheet: PropTypes.func,
  cheatSheetInDepth: PropTypes.bool,
  skillList: PropTypes.any
};

class App extends Component {
  stack = [];

  constructor(props) {
    super(props);
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
      currentView: defaultCategory,
      inDepth: false,
      theme: createTheme(blue, yellow, "light"),
      open: false,
      cheatSheet: false,
      cheatSheetInDepth: false
    };

    this.changeView = this.changeView.bind(this);
    this.displayInDepthView = this.displayInDepthView.bind(this);
    this.back = this.back.bind(this);
    this.switchTheme = this.switchTheme.bind(this);
    this.switchToCheatSheet = this.switchToCheatSheet.bind(this);
    this.updateCheatSheet = this.updateCheatSheet.bind(this);
    this.displayInDepthCheatSheet = this.displayInDepthCheatSheet.bind(this);
    this.displayCategory = this.displayCategory.bind(this);
  }

  /**
   * Returns an array of favorited objects/skills
   * @returns {Array} All of the skill objects that you have favorited
   */
  getSkillObjects() {
    let skills = getFavoriteSkills();
    let skillObjects = [];
    console.log(allSkills);
    for (let i = 0; i < allSkills.length; i++) {
      if (skills.includes(allSkills[i].name)) {
        skillObjects.push(allSkills[i]);
      }
    }
    return skillObjects;
  }

  /**
   * Re-renders the cheat sheet when the cheat sheet is being modified
   */
  updateCheatSheet() {
    if (this.state.cheatSheet) {
      this.setState({
        currentView: this.getSkillObjects()
      });
    }
  }

  /**
   * Go back to the previous state, close side bar, and keep light/dark mode the same
   */
  back() {
    let lightMode = this.state.theme.palette.type === "light";
    this.stack.pop();
    let stateObject = this.stack.pop();
    this.setState(stateObject.currentState);
    this.setState({
      open: false
    });
    this.setLightOrDarkMode(lightMode);
  }

  /**
   * Sets the mode: true for light mode, false for dark mode
   * @param lightMode The boolean for whether light mode is on or off
   */
  setLightOrDarkMode(lightMode) {
    if (lightMode) {
      this.setState({
        theme: createTheme(blue, yellow, "light")
      });
    } else {
      this.setState({
        theme: createTheme(blue, yellow, "dark")
      });
    }
  }

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
   */
  changeView(overviewType) {
    window.scrollTo(0, 0);
    if (overviewType !== this.state.currentView) {
      this.setState({
        currentView: overviewType,
        inDepth: false
      });
    }
    this.setState({
      cheatSheet: false,
      cheatSheetInDepth: false
    });
  }

  /**
   * Have the overview display the cheat sheet
   */
  switchToCheatSheet() {
    window.scrollTo(0, 0);
    console.log("Switching to cheat sheet");
    if (!this.state.cheatSheet) {
      this.setState({
        cheatSheet: true,
        currentView: this.getSkillObjects(),
        inDepth: false,
        cheatSheetInDepth: false
      });
    }
    this.forceUpdate();
  }

  /**
   * Displays in depth information about a skill
   * @param effect The skill that is being displayed
   */
  displayInDepthView(effect) {
    window.scrollTo(0, 0);
    console.log(effect);
    this.setState({
      topic: effect,
      inDepth: true,
      currentView: null,
      open: false,
      cheatSheetInDepth: false
    });
  }

  /**
   * Sets the state for an in depth cheat sheet
   */
  displayInDepthCheatSheet() {
    window.scrollTo(0, 0);
    this.setState({
      topic: null,
      inDepth: false,
      currentView: null,
      open: false,
      cheatSheetInDepth: true,
      cheatSheet: false,
      skillList: this.getSkillObjects()
    });
  }

  /**
   * Sets the state to display a list of all skills in a section
   * @param skillCategory The category to display all skills of
   */
  displayCategory(skillCategory) {
    window.scrollTo(0, 0);
    this.setState({
      topic: null,
      inDepth: false,
      currentView: null,
      open: false,
      cheatSheetInDepth: true,
      cheatSheet: false,
      skillList: skillCategory
    });
  }

  /**
   * Switch between light and dark theme
   */
  switchTheme() {
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
  }

  render() {
    // console.log(allSkills);
    this.stack.push(new HistoryObject(this.state));
    return (
      <Router>
        <ScrollToTop>
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
              <RenderAppBar
                toggleDrawer={this.toggleDrawer}
                open={this.state.open}
                switchTheme={this.switchTheme}
                changeview={this.displayInDepthView}
                onclick={this.changeView}
                back={this.back}
                backable={this.state.inDepth || this.state.cheatSheetInDepth}
                cheatSheet={this.switchToCheatSheet}
                cheatSheetInDepth={this.displayInDepthCheatSheet}
                renderCategory={this.displayCategory}
              />
              <MainContent
                theme={this.state.theme}
                inDepth={this.state.inDepth}
                skillObject={this.state.topic}
                currentView={this.state.currentView}
                learnMore={this.displayInDepthView}
                updateCheatSheet={this.updateCheatSheet}
                cheatSheetInDepth={this.state.cheatSheetInDepth}
                skillList={this.state.skillList}
                getSkillsFromCheatSheet={this.getSkillObjects()}
              />

              <Typography
                style={{ textAlign: "right", paddingRight: 5 }}
                variant={"overline"}
              >
                {copyright}
              </Typography>
            </div>
          </MuiThemeProvider>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
