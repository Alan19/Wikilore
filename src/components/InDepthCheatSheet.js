import React from "react";
import { InDepthView } from "./InDepthView";
import {allSkills} from "../info";

export class InDepthCheatSheet extends React.Component {
  render() {
    let skillList = this.props.skillList;

    console.log(this.props.skillList);
      return skillList.map((skillName) => {
        return <React.Fragment><InDepthView skillObject={skillName}/><hr /></React.Fragment>
      })
    ;
  }

}
