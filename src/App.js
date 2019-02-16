import React, { Component } from "react";
import "./App.css";
import RenderAppBar from "./components/Header";
import Footer from "./components/Footer";
import {allSkills, magicDescription} from "./info";
import { Overview } from "./components/Overview";
import { InDepthView } from "./components/InDepthView";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "./ThemeProvider";
import { CssBaseline } from "@material-ui/core";
import { blue, yellow } from "@material-ui/core/colors";
import {InDepthCheatSheet} from "./components/InDepthCheatSheet";

function HistoryObject(currentState) {
  this.currentState = currentState;
}

function getFavoriteSkills() {
  return JSON.parse(localStorage.getItem("favorites"));
}

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
    this.changeView = this.changeView.bind(this);
    this.displayInDepthView = this.displayInDepthView.bind(this);
    this.back = this.back.bind(this);
    this.switchTheme = this.switchTheme.bind(this);
    this.switchToCheatSheet = this.switchToCheatSheet.bind(this);
    this.updateCheatSheet = this.updateCheatSheet.bind(this);
    this.displayInDepthCheatSheet = this.displayInDepthCheatSheet.bind(this);
    this.getSkillObjects = this.getSkillObjects.bind(this);
  }

  /**
   * Returns an array of favorited objects/skills
   * @returns {Array} All of the skill objects that you have favorited
   */
  getSkillObjects = () => {
      let skills = getFavoriteSkills();
      let skillObjects = [];
      console.log(allSkills);
      for (let i = 0; i < allSkills.length; i++){
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
        currentView: this.getSkillObjects(),
      });
    }
  }

  /**
   * Go back to the previous state
   */
  back() {
    this.stack.pop();
    let stateObject = this.stack.pop();
    this.setState(stateObject.currentState);
    this.setState({
      open: false
    });
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
  displayInDepthCheatSheet(){
    this.setState({
      topic:null,
      inDepth: false,
      currentView: null,
      open: false,
      cheatSheetInDepth: true,
      cheatSheet: false,
    })
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
  }

  render() {
      console.log(allSkills);
    this.stack.push(new HistoryObject(this.state));
    window.scrollTo(0, 0);
    return (
      <React.Fragment>
        <MuiThemeProvider theme={this.state.theme}>
          <CssBaseline />
          <div className="App">
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
            />
            <div
              color={"primary"}
              style={{ width: "70%", margin: "auto", padding: 20 }}
            >
              {this.state.inDepth && (
                <InDepthView skillObject={this.state.topic} />
              )}
              {!this.state.inDepth && this.state.currentView != null && (
                <Overview
                  learnMore={this.displayInDepthView}
                  currentView={this.state.currentView}
                  updateCheatSheet={this.updateCheatSheet}
                />
              )}
              {this.state.cheatSheetInDepth && <InDepthCheatSheet skillList={this.getSkillObjects()} />}
            </div>
            <Footer />
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
