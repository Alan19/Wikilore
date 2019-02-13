import React, {Component} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grow, Icon,
    IconButton,
    Slide,
    Typography
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid'

function SkillTitle(props) {
    return (
        <span>
            {props.skill.name}
            &nbsp;
            <img
                src={props.skill.icon}
                height={20}
                alt={props.skill.name}
            />{" "}
        </span>
    );
}

export class SkillCard extends Component {
    render() {
        return (
            <Card>
                <CardHeader title={<SkillTitle skill={this.props.skill}/>}/>
                <CardContent style={{height: 175, textOverflow: 'ellipsis', overflow: 'hidden'}}>
                    <Typography variant={"body1"}>{this.props.skill.text}</Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                    <div className={"left"} style={{flexGrow: 1}}>
                        <Button size="small" onClick={() => this.props.learnMore(this.props.skill)}>Learn
                            More</Button>
                    </div>
                    <IconButton><Icon>favorite</Icon></IconButton>
                </CardActions>
            </Card>
        );
    }

}

export class Overview extends React.Component {
    render() {
        return (
            <Grow in={true} mountOnEnter unmountOnExit>
                <Grid container justify="flex-start" alignItems={"stretch"}>
                    {this.props.currentView.map(skill => (
                        <Grid key={skill.id} item sm={4} style={{padding: 20}}>
                            <SkillCard learnMore={this.props.learnMore} skill={skill}/>
                        </Grid>
                    ))}
                </Grid>
            </Grow>

        )
    }

}