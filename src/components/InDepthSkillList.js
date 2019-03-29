import React from "react";
import Grid from "@material-ui/core/Grid";
import {Collapse, Divider, Fade, Grow, Typography} from "@material-ui/core";
import { generateFormattedSkillText } from "./FormattedSkillText";

export class InDepthSkillList extends React.Component {
  render() {
    let skillList = this.props.skillList;
    let skillListComponents = skillList.map((skill, index, arr) => (
      <React.Fragment>
        {generateFormattedSkillText(skill.detailedDescription, skill.icon)}
        {index < arr.length - 1 && <hr />}
      </React.Fragment>
    ));
    return (
      <Grid
        wrap={"nowrap"}
        direction={!this.props.isDesktop ? "column-reverse" : "row"}
        container
        spacing={this.props.theme.spacing.unit * 3}
      >
        <Grid item md={2} />
        <Fade in={true}>
          <Grid item md={6}>
            {skillListComponents}
          </Grid>
        </Fade>
        <Grid item md={4}>
          <div
            style={{
              position: this.props.isDesktop ? "fixed" : "inherit",
              overflowY: "auto",
              maxHeight: window.innerHeight-84-this.props.theme.spacing.unit * 2,
              padding: this.props.theme.spacing.unit * 2
            }}
          >
            {skillList.map((skill, index, array) => {
              return (
                <React.Fragment>
                  {InDepthSkillList.generateTableOfContents(
                    skill.detailedDescription, skill.icon
                  )}
                  {index < array.length - 1 && (
                    <Divider light style={{ width: "90%" }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </Grid>
      </Grid>
    );
  }

  static generateTableOfContents(skill, icon = null) {
    return (
      <React.Fragment>
        <a href={"#" + skill.title.toLowerCase().replace(/\s/g, "")}>
          <Typography variant={"overline"}>{skill.title} {icon !== null && <img style={{height: '1em'}} src={icon} alt={skill.title}/>} </Typography>
        </a>
        {skill.sections.map(section => (
          <a href={"#" + section.title.toLowerCase().replace(/\s/g, "")}>
            <Typography style={{fontSize: 15}} variant={"subtitle1"}>{section.title}</Typography>
          </a>
        ))}
        <a
          href={
            "#" + skill.purchasableSkillType.toLowerCase().replace(/\s/g, "")
          }
        >
          <Typography variant={"overline"}>
            {skill.purchasableSkillType}
          </Typography>
        </a>
        {skill.effects.map(section => (
          <a href={"#" + section.title.toLowerCase().replace(/\s/g, "")}>
            <Typography style={{fontSize: 15}} variant={"subtitle1"}>{section.title}</Typography>
          </a>
        ))}
      </React.Fragment>
    );
  }
}
