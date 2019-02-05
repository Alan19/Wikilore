import React, {Component} from 'react';
import './App.css';
import Header from './Header.js';
import Footer from "./Footer";
import {magicDescription, wayDescription, cultureDescription} from "./store";
import InfoGrid from './InfoGrid'



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: magicDescription
        };
        this.changeView = this.changeView.bind(this);
    }

    changeView(viewName) {
        console.log('Received ' + viewName);
        if (viewName === 'magic') {
            this.setState({currentView: magicDescription});
        } else if (viewName === 'way') {
            this.setState({currentView: wayDescription});
        } else if (viewName === 'culture') {
            this.setState({currentView: cultureDescription});
        }
    }

    render() {
        return (
            <div className="App">
                <Header onclick={this.changeView}/>
                <div style={{padding: 20}}>
                    {<InfoGrid />}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
