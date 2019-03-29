import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Typography
} from "@material-ui/core";
import { Overview } from "./Overview";

function SkillTitle(props) {
  return (
    <span>
      {props.skill.name}
      &nbsp;
      <img style={{height: '1em'}} src={props.skill.icon} alt={props.skill.name} />{" "}
    </span>
  );
}

export class SkillCard extends Component {
  render() {
    return (
      <Card>
        <CardHeader title={<SkillTitle skill={this.props.skill} />} />
        {this.props.isDesktop && (
          <CardContent
            style={{
              height: 175,
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}
          >
            <Typography style={{textOverflow: "ellipsis", overflow: 'hidden'}} variant={"body1"}>{this.props.skill.text}</Typography>
          </CardContent>
        )}
        <CardActions disableActionSpacing>
          <div className={"left"} style={{ flexGrow: 1 }}>
            <Button
              size="small"
              color={"primary"}
              onClick={() => this.props.learnMore(this.props.skill)}
            >
              Learn More
            </Button>
          </div>
          <IconButton onClick={this.props.addToCheatSheet}>
            <Icon color={Overview.checkFavorited(this.props.skill)}>star</Icon>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}
