import React, {Component} from "react";
import "./App.css";
import {RenderAppBar} from "./Header";
import Footer from "./Footer";
import {cultureDescription, magicDescription, wayDescription} from "./store";
import {Overview} from "./Overview";
import {InDepthView} from "./InDepthView";

class App extends Component {
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
        this.setState({
                inDepth: false
            }
        );
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

    displayInDepthView(effect) {
        console.log("Changing screens!");
        console.log(effect);
        this.setState({topic: effect, inDepth: true})
    }

    render() {
        window.scrollTo(0, 0);
        return (
            <div className="App">
                <RenderAppBar onclick={this.changeView} back={this.back} indepth={this.state.inDepth}/>
                <div style={{padding: 20}}>
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
