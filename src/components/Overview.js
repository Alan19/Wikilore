import React, { Component } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grow,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import * as PropTypes from "prop-types";

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
            <Typography variant={"body1"}>{this.props.skill.text}</Typography>
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

class MobileSkillList extends Component {
  render() {
    return (
      <List
        style={{
          width: "100%",
          maxWidth: 360,
          backgroundColor: this.props.theme.palette.background.paper
        }}
        component={"nav"}
      >
        <ListItem onClick={this.props.onClick}>
          <ListItemIcon>
            <Avatar src={this.props.skill.icon} />
          </ListItemIcon>
          <ListItemText
            primary={this.props.skill.name}
            secondary={<Typography noWrap>{this.props.skill.text}</Typography>}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={this.props.addToCheatSheet}>
              <Icon color={Overview.checkFavorited(this.props.skill)}>
                star
              </Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
}

MobileSkillList.propTypes = {
  theme: PropTypes.any,
  onClick: PropTypes.func,
  skill: PropTypes.any,
  addToCheatSheet: PropTypes.func
};

export class Overview extends React.Component {
  static checkFavorited(skill) {
    if (localStorage.getItem("favorites") === null) {
      return "inherit";
    } else {
      if (JSON.parse(localStorage.getItem("favorites")).includes(skill.name)) {
        return "secondary";
      } else {
        return "inherit";
      }
    }
  }

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

  render() {
    return (
      <Grow in={true}>
        <Grid
          container
          spacing={this.props.theme.spacing.unit * 3}
          justify="flex-start"
          alignItems={"stretch"}
          style={{
            width: this.props.isDesktop ? "70%" : "100%",
            margin: "auto"
          }}
        >
          {this.props.currentView.map(skill =>
            this.props.isDesktop ? (
              <Grid item sm={4}>
                <SkillCard
                  addToCheatSheet={() =>
                    this.addToCheatSheet(skill, this.props.updateCheatSheet)
                  }
                  checkFavorited={Overview.checkFavorited.bind(this)}
                  updateCheatSheet={this.props.updateCheatSheet}
                  learnMore={this.props.learnMore}
                  skill={skill}
                  isDesktop={this.props.isDesktop}
                />
              </Grid>
            ) : (
              <MobileSkillList
                  theme={this.props.theme}
                  onClick={() => this.props.learnMore(skill)}
                  skill={skill}
                  addToCheatSheet={() =>
                  this.addToCheatSheet(skill, this.props.updateCheatSheet)
                }
              />
            )
          )}
        </Grid>
      </Grow>
    );
  }
}
