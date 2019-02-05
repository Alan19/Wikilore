import React, {Component} from 'react';
import './App.css';
import Header from './Header.js';
import Footer from "./Footer";
import {cultureDescription, magicDescription, wayDescription} from "./store";
import {Card, CardContent, Typography} from "@material-ui/core";
import FallBack from "./resources/psychic-waves.svg";
import Grid from '@material-ui/core/Grid';


function generateInfo(currentView) {
    return (<Grid container spacing={40}>
        {currentView.map((skill) => (
            <Grid item sm style={{flexGrow: 1, padding: 30}}>
                <Card>
                    <CardContent>
                        <Typography variant={"title"} style={{margin: 10}}>
                            <img src={skill.icon} height={24} style={{flex: 1}}
                                 alt={FallBack}/> {skill.name}
                        </Typography>
                        <Typography variant={"body1"}
                                    style={{margin: 10}}>{skill.description}</Typography></CardContent>
                </Card>
            </Grid>

        ))}
    </Grid>);
}

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
        console.log(magicDescription);
        return (
            <div className="App">
                <Header onclick={this.changeView}/>
                <div style={{padding: 20}}>
                    {generateInfo(this.state.currentView)}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;