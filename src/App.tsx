import React, {useEffect, useState} from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Route, Router} from "react-router";
import {createBrowserHistory} from "history";
import {Typography} from "@material-ui/core";
import { Chip } from "@material-ui/core";

const history = createBrowserHistory();

function Home() {
    return <Typography>
        The Far Horizons is a Fantasy setting. As a fantasy setting the world reflects the morality of the characters
        back onto them and their surroundings. Ethics and Philosophy is a key component for the setting’s stories,
        having a coherent set of character beliefs will be required. As a setting where morality is reflected, villains
        and monsters create horrible environs. While there will be horrific monsters and victims therof, PCs will always
        be in a position to take action to improve things, this is not a horror story.
    </Typography>;
}

function Page(props: { article: any }) {
    return <>
        {props.article.keywords.map((keyword: any) => <Chip>{keyword}</Chip>)}
    </>;
}

function App() {
    const [skillsoftAdept, setSkillsoftAdept] = useState({});
    useEffect(() => {
        fetch("/articles/skillsoft_adept").then(res => setSkillsoftAdept(res.json()));
    }, []);
    return (
        <div className="App">
            <CssBaseline/>
            <Router history={history}>
                <Route exact path={"/"}>
                    <Home/>
                </Route>
                <Route exact path={"/skillsoft_adept"}>
                    <Page article={skillsoftAdept} />
                </Route>
            </Router>
        </div>
    );
}

export default App;
