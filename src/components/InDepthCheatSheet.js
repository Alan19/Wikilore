import React from "react";
import { InDepthView } from "./InDepthView";
import {Typography} from "@material-ui/core";

export class InDepthCheatSheet extends React.Component {
  render() {
    let skillList = this.props.skillList;

    console.log(this.props.skillList);
      return skillList.map((saved) => <React.Fragment><InDepthView skillObject={saved}/><hr /></React.Fragment>)
    ;
  }
}
