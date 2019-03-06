import React from "react";
import { InDepthView } from "./InDepthView";
import {ExpansionPanel, ExpansionPanelDetails} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";

export class InDepthSkillList extends React.Component {
  render() {
    let skillList = this.props.skillList;
    console.log(this.props.skillList);
    let skillListComponents = [];
    for (let i = 0; i < skillList.length; i++) {
      if (i < skillList.length - 1) {
        skillListComponents.push(
          <ExpansionPanel>
              <ExpansionPanelSummary><Typography>{skillList[i].name}</Typography></ExpansionPanelSummary>
              <ExpansionPanelDetails>
            <InDepthView
              skillObject={skillList[i]}
              isDesktop={this.props.isDesktop}
            />
              </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      } else {
        skillListComponents.push(
          <ExpansionPanel>
            <InDepthView skillObject={skillList[i]} />
          </ExpansionPanel>
        );
      }
    }
    return skillListComponents;
  }
}
