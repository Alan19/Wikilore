import React from "react";
import Grid from "./App";
import {Card, CardContent, Typography} from "@material-ui/core";
import FallBack from "./resources/psychic-waves.svg";
export default InfoGrid;

function InfoGrid(props) {
        return ( () => {
                console.log("Hello!");
                return (<Grid container spacing={40}>
                    {this.props.currentView.map((skill) => (
                        <Grid item sm style={{flexGrow: 1, padding: 30}}>
                            <Card>
                                <CardContent>
                                    <Typography variant={"title"} style={{margin: 10}}>
                                        <img src={skill.icon} height={24} style={{flex: 1}}
                                             alt={FallBack}/> {skill.name}
                                    </Typography>
                                    <Typography variant={"h5"}
                                                style={{margin: 10}}>{skill.description}</Typography></CardContent>
                            </Card>
                        </Grid>

                    ))}
                </Grid>);
            }

        )
}