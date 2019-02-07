import React, {Component} from "react";
import "./App.css";
import Header from "./Header.js";
import Footer from "./Footer";
import {cultureDescription, magicDescription, wayDescription} from "./store";
import {GenerateInfo} from "./SkillCard";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: magicDescription,
            inDepth: false
        };
        this.changeView = this.changeView.bind(this);
    }

    changeView(viewName) {
        if (viewName === "magic" && this.state.currentView !== magicDescription) {
            this.setState({currentView: magicDescription, inDepth: false});
        } else if (viewName === "way" && this.state.currentView !== wayDescription) {
            this.setState({currentView: wayDescription, inDepth: false});
        } else if (viewName === "culture" && this.state.currentView !== cultureDescription) {
            this.setState({currentView: cultureDescription, inDepth: false});
        }
    }

    render() {
        return (
            <div className="App">
                <Header onclick={this.changeView}/>
                <div style={{padding: 20}}>
                    <GenerateInfo currentView={this.state.currentView}/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
