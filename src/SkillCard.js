import React, {Component} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Grow, Slide, Typography} from "@material-ui/core";
import Grid from '@material-ui/core/Grid'

function SkillTitle(props) {
    return (
        <>
            <img
                src={props.skill.icon}
                height={20}
                alt={props.skill.name}
            />{" "}
            {props.skill.name}
        </>
    );
}

export class SkillCard extends Component {
    render() {
        return (
            <Card>
                <CardHeader title={<SkillTitle skill={this.props.skill}/>}/>
                <CardContent style={{height: 200, textOverflow: 'ellipsis', overflow: 'hidden'}}>
                    <Typography variant={"body1"}>{this.props.skill.description}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => this.props.learnMore(this.props.skill)}>Learn
                        More</Button>
                </CardActions>
            </Card>
        );
    }

}

export class GenerateInfo extends React.Component {
    render() {
        return (
            <Grow in={true} mountOnEnter unmountOnExit>
                <Grid container justify="flex-start" alignItems={"stretch"}>
                    {this.props.currentView.map(skill => (
                        <Grid key={skill.id} item sm={3} style={{padding: 30}}>
                            <SkillCard learnMore={this.props.learnMore} skill={skill}/>
                        </Grid>
                    ))}
                </Grid>
            </Grow>

        )
    }

}