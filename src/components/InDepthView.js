import React, { Component } from "react";
import { Divider, Grow, Typography } from "@material-ui/core";

export class InDepthView extends Component {
  render() {
    const skill = this.props.skillObject.detailedDescription;
    const icon = this.props.skillObject.icon;
    return (
      <Grow in={true}>
        <div
          style={{
            margin: "auto",
            width: this.props.isDesktop ? "70%" : "100%"
          }}
        >
          <Typography
            variant={"h3"}
            style={{ overflow: "auto", overflowY: "hidden" }}
          >
            {skill.title} <img src={icon} height={40} alt={skill.title} />
          </Typography>
          <Typography variant={"subtitle2"} paragraph={true}>
            {skill.blurb}
          </Typography>
          {skill.sections.map(section => (
            <React.Fragment>
              <Typography variant={"subtitle1"}>{section.title}</Typography>
              <Typography variant={"body1"} paragraph={true} component={"span"}>
                {section.text}
              </Typography>
            </React.Fragment>
          ))}
          <Divider variant={"middle"} light />
          <Typography paragraph style={{ paddingTop: 16 }} variant={"h5"}>
            {skill.purchasableSkillType}
          </Typography>
          {skill.effects.map(section => (
            <React.Fragment>
              <Typography variant={"subtitle1"}>{section.title}</Typography>
              <Typography variant={"body1"} paragraph={true} component={"span"}>
                {section.text}
              </Typography>
            </React.Fragment>
          ))}
        </div>
      </Grow>
    );
  }
}
