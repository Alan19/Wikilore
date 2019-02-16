import React, { Component } from "react";
import "./App.css";
import RenderAppBar from "./components/Header";
import Footer from "./components/Footer";
import { magicDescription } from "./info";
import { Overview } from "./components/Overview";
import { InDepthView } from "./components/InDepthView";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "./ThemeProvider";
import { CssBaseline } from "@material-ui/core";
import { blue, yellow } from "@material-ui/core/colors";

function HistoryObject(currentState) {
  this.currentState = currentState;
}

class App extends Component {
  stack = [];

  constructor(props) {
    super(props);
    this.state = {
      currentView: magicDescription,
      inDepth: false,
      theme: createTheme(blue, yellow, "light"),
        open: false,
      cheatSheet: false
    };
    this.changeView = this.changeView.bind(this);
    this.displayInDepthView = this.displayInDepthView.bind(this);
    this.back = this.back.bind(this);
    this.switchTheme = this.switchTheme.bind(this);
    this.switchToCheatSheet = this.switchToCheatSheet.bind(this);
    this.updateCheatSheet = this.updateCheatSheet.bind(this);
  }

  updateCheatSheet(){
    if (this.state.cheatSheet) {
      this.setState({
        currentView: JSON.parse(localStorage.getItem('favorites')),
        inDepth: false
      });
    }
  };

  back() {
    this.stack.pop();
    let stateObject = this.stack.pop();
    this.setState(stateObject.currentState);
    this.setState({
      open: false
    })
  }

  toggleDrawer = () => {
    if (!this.state.open) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  };

  changeView(overviewType) {
    if (overviewType !== this.state.currentView) {
      this.setState({
        currentView: overviewType,
        inDepth: false
      });
    }
    this.setState({
      cheatSheet: false
    });
    this.forceUpdate();
  }

  switchToCheatSheet(){
    if (!this.state.cheatSheet) {
      this.setState({
        cheatSheet:true,
        currentView: JSON.parse(localStorage.getItem('favorites')),
        inDepth: false
      });
    }
  }

  displayInDepthView(effect) {
    console.log("Changing screens!");
    console.log(effect);
    this.setState({ topic: effect, inDepth: true, currentView: null, open:false });
  }

  switchTheme() {
    console.log("Switching themes!");
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
    this.stack.push(new HistoryObject(this.state));
    console.log(this.stack);
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
              backable={this.state.inDepth}
                cheatSheet={this.switchToCheatSheet}
            />
            <div
              color={"primary"}
              style={{ width: "80%", margin: "auto", padding: 20 }}
            >
              {this.state.inDepth && (
                <InDepthView skillObject={this.state.topic} />
              )}
              {!this.state.inDepth && (
                <Overview
                  learnMore={this.displayInDepthView}
                  currentView={this.state.currentView}
                  updateCheatSheet={this.updateCheatSheet}
                />
              )}
            </div>
            <Footer />
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
