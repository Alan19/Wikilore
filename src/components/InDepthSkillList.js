import React from "react";
import { InDepthView } from "./InDepthView";
import {ExpansionPanel, ExpansionPanelDetails} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";

export class InDepthSkillList extends React.Component {
    render() {
      this.collapsed = [];
    let skillList = this.props.skillList;
    let skillListComponents = [];
    for (let i = 0; i < skillList.length; i++) {
        this.collapsed[i] = !this.props.isDesktop;
        skillListComponents.push(
          <ExpansionPanel defaultExpanded={this.props.isDesktop}>
              <ExpansionPanelSummary><Typography>{skillList[i].name}</Typography></ExpansionPanelSummary>
              <ExpansionPanelDetails>
            <InDepthView
              skillObject={skillList[i]}
              isDesktop={this.props.isDesktop}
            />
              </ExpansionPanelDetails>
          </ExpansionPanel>
        );

    }
    return skillListComponents;
  }
}
