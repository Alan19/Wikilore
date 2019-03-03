import React from "react";
import { InDepthView } from "./InDepthView";

export class InDepthSkillList extends React.Component {
  render() {
    let skillList = this.props.skillList;
    console.log(this.props.skillList);
    let skillListComponents = [];
    for (let i = 0; i < skillList.length; i++) {
      if (i < skillList.length - 1) {
        skillListComponents.push(
          <React.Fragment>
            <InDepthView skillObject={skillList[i]} />
            <hr />
          </React.Fragment>
        );
      } else {
        skillListComponents.push(
          <React.Fragment>
            <InDepthView skillObject={skillList[i]} />
          </React.Fragment>
        );
      }
    }
    return skillListComponents;
  }
}
