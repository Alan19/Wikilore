import React, {PureComponent} from "react";
import Grid from "@material-ui/core/Grid";
import {SkillCard} from "./SkillCard";
import {MobileSkillList} from "./MobileSkillList";
import Fade from "@material-ui/core/Fade";

export class Overview extends PureComponent {
  static checkFavorited = skill => {
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
      <Fade in={true}>
        <Grid
          container
          spacing={3}
          justify="flex-start"
          alignItems={"stretch"}
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
      </Fade>
    );
  }
}
