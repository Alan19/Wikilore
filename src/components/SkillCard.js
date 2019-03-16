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
import { Link } from "react-router-dom";

function SkillTitle(props) {
  return (
    <span>
      {props.skill.name}
      &nbsp;
      <img src={props.skill.icon} height={20} alt={props.skill.name} />{" "}
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
            <Typography
              style={{ textOverflow: "ellipsis", overflow: "hidden" }}
              variant={"body1"}
            >
              {this.props.skill.text}
            </Typography>
          </CardContent>
        )}
        <CardActions disableActionSpacing>
          <div className={"left"} style={{ flexGrow: 1 }}>
            <Link
              to={{
                pathname: `/indepth/${this.props.skill.name
                  .toLowerCase()
                  .replace(/\s/g, "")}`,
                state: { topic: this.props.skill.id }
              }}
            >
              <Button
                size="small"
                color={"primary"}
                // onClick={() => this.props.learnMore(this.props.skill)}
              >
                Learn More
              </Button>
            </Link>
          </div>
          <IconButton onClick={this.props.addToCheatSheet}>
            <Icon color={Overview.checkFavorited(this.props.skill)}>star</Icon>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}
