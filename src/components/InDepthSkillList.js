import React from "react";
import InDepthView from "./InDepthView";

export class InDepthSkillList extends React.Component {
  render() {
    let skillList = this.props.skillList;
    let skillListComponents = [];
    for (let i = 0; i < skillList.length; i++) {
      if (i === skillList.length - 1) {
        skillListComponents.push(
          <InDepthView
            skillObject={skillList[i]}
            isDesktop={this.props.isDesktop}
          />
        );
      } else {
        skillListComponents.push(
          <React.Fragment>
            <InDepthView
              skillObject={skillList[i]}
              isDesktop={this.props.isDesktop}
            />
            <hr />
          </React.Fragment>
        );
      }
    }
    return skillListComponents;
  }
}
