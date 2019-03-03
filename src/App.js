import React, { Component } from "react";
import "./App.css";
import RenderAppBar from "./components/Header";
import {allSkills, copyright, magicDescription} from "./info";
import { Overview } from "./components/Overview";
import { InDepthView } from "./components/InDepthView";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "./ThemeProvider";
import {CssBaseline, Typography} from "@material-ui/core";
import { blue, yellow } from "@material-ui/core/colors";
import { InDepthSkillList } from "./components/InDepthSkillList";
import * as PropTypes from "prop-types";

function HistoryObject(currentState) {
  this.currentState = currentState;
}

function getFavoriteSkills() {
  return JSON.parse(localStorage.getItem("favorites"));
}

class MainContent extends Component {
  render() {
    return <div
          color={"primary"}
          style={{
            padding: this.props.theme.spacing.unit * 3,
            flex: 1,
            marginLeft: this.props.theme.spacing.unit * 7 + 1
          }}
      >
        {this.props.inDepth && (
           <InDepthView toggleBool={this.props.toggleBool} skillObject={this.props.skillObject}/>
        )}
        {!this.props.inDepth && this.props.currentView != null && (
            <Overview
                theme={this.props.theme}
                learnMore={this.props.learnMore}
                currentView={this.props.currentView}
                updateCheatSheet={this.props.updateCheatSheet}
                toggleBool={this.props.toggleBool}
            />
        )}
        {this.props.cheatSheetInDepth && (
            <InDepthSkillList toggleBool={this.props.toggleBool} skillList={this.props.skillList}/>
        )}
      </div>
    ;
  }
}

MainContent.propTypes = {
  theme: PropTypes.any,
  inDepth: PropTypes.bool,
  toggleBool: PropTypes.bool,
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
      currentView: magicDescription,
      inDepth: false,
      theme: createTheme(blue, yellow, "light"),
      open: false,
      cheatSheet: false,
      cheatSheetInDepth: false
    };

    this.toggleBool=false;
    this.changeView = this.changeView.bind(this);
    this.displayInDepthView = this.displayInDepthView.bind(this);
    this.back = this.back.bind(this);
    this.switchTheme = this.switchTheme.bind(this);
    this.switchToCheatSheet = this.switchToCheatSheet.bind(this);
    this.updateCheatSheet = this.updateCheatSheet.bind(this);
    this.displayInDepthCheatSheet = this.displayInDepthCheatSheet.bind(this);
    this.getSkillObjects = this.getSkillObjects.bind(this);
    this.displayCategory = this.displayCategory.bind(this);
  }

  /**
   * Returns an array of favorited objects/skills
   * @returns {Array} All of the skill objects that you have favorited
   */
  getSkillObjects = () => {
    let skills = getFavoriteSkills();
    let skillObjects = [];
    console.log(allSkills);
    for (let i = 0; i < allSkills.length; i++) {
      if (skills.includes(allSkills[i].name)) {
        skillObjects.push(allSkills[i]);
      }
    }
    return skillObjects;
  };

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
    this.forceUpdate();
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
  displayCategory(skillCategory){
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
    this.toggleBool ? this.toggleBool = false : this.toggleBool = true;
    console.log(allSkills);
    this.stack.push(new HistoryObject(this.state));
    return (
      <React.Fragment>
        <MuiThemeProvider theme={this.state.theme}>
          <CssBaseline/>
          <div style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column'
          }}>
            <div className="App"/>
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
            <MainContent theme={this.state.theme} inDepth={this.state.inDepth} toggleBool={this.toggleBool}
                         skillObject={this.state.topic} currentView={this.state.currentView}
                         learnMore={this.displayInDepthView} updateCheatSheet={this.updateCheatSheet}
                         cheatSheetInDepth={this.state.cheatSheetInDepth} skillList={this.state.skillList}/>


            <Typography style={{textAlign: 'right', paddingRight: 5}} variant={"overline"}>{copyright}</Typography>
          </div>

        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
