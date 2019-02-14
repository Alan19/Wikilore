import React, {Component} from "react";
import "./App.css";
import {RenderAppBar} from "./components/Header";
import Footer from "./components/Footer";
import {cultureDescription, magicDescription, wayDescription} from "./store";
import {Overview} from "./components/Overview";
import {InDepthView} from "./components/InDepthView";
import SearchBar from "./components/SearchBar";

function HistoryObject(currentState){
    this.currentState = currentState;
}

class App extends Component {
    stack = [];

    constructor(props) {
        super(props);
        this.state = {
            currentView: magicDescription,
            inDepth: false
        };
        this.changeView = this.changeView.bind(this);
        this.displayInDepthView = this.displayInDepthView.bind(this);
        this.back = this.back.bind(this);
    }

    back() {
        this.stack.pop();
        let stateObject = this.stack.pop();
        this.setState(stateObject.currentState);
    }

    changeView(viewName) {
        if (viewName === "magic" && this.state.currentView !== magicDescription) {
            this.setState({currentView: magicDescription, inDepth: false});
        } else if (viewName === "way" && this.state.currentView !== wayDescription) {
            this.setState({currentView: wayDescription, inDepth: false});
        } else if (viewName === "culture" && this.state.currentView !== cultureDescription) {
            this.setState({currentView: cultureDescription, inDepth: false});
        }
        this.forceUpdate();
    }

    displayInDepthView(effect) {
        console.log("Changing screens!");
        console.log(effect);
        this.setState({topic: effect, inDepth: true, currentView:null})
    }

    render() {
        this.stack.push(new HistoryObject(this.state));
        console.log(this.stack);
        window.scrollTo(0, 0);
        return (
            <div className="App">
                <RenderAppBar changeview={this.displayInDepthView} onclick={this.changeView} back={this.back} backable={this.stack.length > 1}/>
                <div style={{"width": "70%", margin: 'auto', padding: 20}}>
                    {this.state.inDepth && <InDepthView skillObject={this.state.topic}/>}
                    {!this.state.inDepth &&
                    <Overview learnMore={this.displayInDepthView} currentView={this.state.currentView}/>}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
