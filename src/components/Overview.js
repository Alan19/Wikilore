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
  IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper,
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
  };
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
          {this.props.currentView.map(skill => (
            this.props.isDesktop ? <Grid item sm={4}>
              <SkillCard
                updateCheatSheet={this.props.updateCheatSheet}
                learnMore={this.props.learnMore}
                skill={skill}
                isDesktop={this.props.isDesktop}
              />
            </Grid> :
                <List style={{width: '100%',
                  maxWidth: 360,
                  backgroundColor: this.props.theme.palette.background.paper}} component={"nav"}>
                  <ListItem onClick={() => this.props.learnMore(skill)}>
                    <ListItemIcon><Avatar src={skill.icon}/></ListItemIcon>
                    <ListItemText primary={skill.name} secondary={<Typography noWrap>{skill.text}</Typography>} />
                    <ListItemSecondaryAction>
                      <IconButton
                          onClick={() =>
                              this.addToCheatSheet(
                                  skill,
                                  this.props.updateCheatSheet
                              )
                          }
                      >
                        <Icon color={this.checkFavorited(skill)}>star</Icon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
          ))}
        </Grid>
      </Grow>
    );
  }
}
