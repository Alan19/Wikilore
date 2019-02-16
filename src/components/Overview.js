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
    constructor(props){
        super(props);
        this.setState({
            savedSkills: JSON.stringify(localStorage.getItem('favorites'))
        })
    }

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
          <IconButton onClick={() => this.addToCheatSheet(this.props.skill, this.props.updateCheatSheet)}>
            <Icon color={this.checkFavorited(this.props.skill)}>star</Icon>
          </IconButton>
        </CardActions>
      </Card>
    );
  }

    checkFavorited(skill) {

        if (localStorage.getItem('favorites') === null){
            return 'inherit'
        }
        else{
            if (this.inArray(skill, JSON.parse(localStorage.getItem('favorites')))){
                return 'secondary'
            }
            else {
                return 'inherit'
            }
        }
    }

    inArray(item, arrayToCheck){
        for (var i = 0; i < arrayToCheck.length; i++){
            if (item.name === arrayToCheck[i].name){
                return true;
            }
        }
        return false;
    }

    addToCheatSheet(skill, cheatSheetMethod) {
      if (localStorage.hasOwnProperty('favorites')){
          let favoriteArray = JSON.parse(localStorage.getItem('favorites'));
          if (!this.inArray(skill, favoriteArray)){
              favoriteArray.push(skill);
              localStorage.setItem('favorites', JSON.stringify(favoriteArray));
              this.setState({
                  savedSkills: favoriteArray
              })
          }
          else {
              this.removeItemFromArray(skill, favoriteArray);
              localStorage.setItem('favorites', JSON.stringify(favoriteArray));
              this.setState({
                  savedSkills: favoriteArray
              })
          }

      }
        else {
            let favoriteArray = [skill];
            localStorage.setItem('favorites', JSON.stringify(favoriteArray));
          this.setState({
              savedSkills: favoriteArray
          })
      }
        cheatSheetMethod();
    }

    removeItemFromArray(skill, favoriteArray) {
       for (let i = 0; i < favoriteArray.length; i++){
           if (skill.name === favoriteArray[i].name) {
               favoriteArray.splice(i, 1);
               return true;
           }
       }
       return false;
    }
}

export class Overview extends React.Component {

  render() {
      console.log(this.props.currentView);
    return (
      <Grow in={true} mountOnEnter unmountOnExit>
        <Grid container justify="flex-start" alignItems={"stretch"}>
          {this.props.currentView.map(skill => (
            <Grid key={skill.id} item sm={4} style={{ padding: 20 }}>
              <SkillCard updateCheatSheet={this.props.updateCheatSheet} learnMore={this.props.learnMore} skill={skill} />
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }
}
