import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grow,
  Icon,
  IconButton,
  Typography
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

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
        <CardContent
          style={{ height: 175, textOverflow: "ellipsis", overflow: "hidden" }}
        >
          <Typography variant={"body1"}>{this.props.skill.text}</Typography>
        </CardContent>
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
          <IconButton
            onClick={() =>
              this.addToCheatSheet(
                this.props.skill,
                this.props.updateCheatSheet
              )
            }
          >
            <Icon color={this.checkFavorited(this.props.skill)}>star</Icon>
          </IconButton>
        </CardActions>
      </Card>
    );
  }

  checkFavorited = skill => {
    if (localStorage.getItem("favorites") === null) {
      return "inherit";
    } else {
      if (JSON.parse(localStorage.getItem("favorites")).includes(skill.name)) {
        return "secondary";
      } else {
        return "inherit";
      }
    }
  };

  /**
   * Method for adding item to cheat sheet
   * @param skill The skill that is to be added to the cheat sheet
   * @param cheatSheetMethod The method reference to update the cheat sheet
   */
  addToCheatSheet(skill, cheatSheetMethod) {
    if (localStorage.hasOwnProperty("favorites")) {
      let favoriteArray = JSON.parse(localStorage.getItem("favorites"));
      if (!favoriteArray.includes(skill.name)) {
        favoriteArray.push(skill.name);
        localStorage.setItem("favorites", JSON.stringify(favoriteArray));
      } else {
        favoriteArray = favoriteArray.filter(name => skill.name !== name);
        localStorage.setItem("favorites", JSON.stringify(favoriteArray));
      }
    } else {
      let favoriteArray = [skill.name];
      localStorage.setItem("favorites", JSON.stringify(favoriteArray));
    }
    cheatSheetMethod();
    this.forceUpdate();
  }
}

export class Overview extends React.Component {
  render() {
    return (
      <Grow in={true} mountOnEnter unmountOnExit>
        <Grid container justify="flex-start" alignItems={"stretch"}>
          {this.props.currentView.map(skill => (
            <Grid item sm={4} style={{ padding: 20 }}>
              <SkillCard
                updateCheatSheet={this.props.updateCheatSheet}
                learnMore={this.props.learnMore}
                skill={skill}
              />
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }
}
