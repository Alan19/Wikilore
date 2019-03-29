import React from "react";
import Grid from "@material-ui/core/Grid";
import { Divider, Typography } from "@material-ui/core";
import { generateFormattedSkillText } from "./FormattedSkillText";

export class InDepthSkillList extends React.Component {
  render() {
    let skillList = this.props.skillList;
    let skillListComponents = skillList.map((skill, index, arr) => {
      return (
        <React.Fragment>
          {generateFormattedSkillText(skill.detailedDescription, skill.icon)}
          {index < arr.length - 1 && <hr />}
        </React.Fragment>
      );
    });
    return (
      <Grid
        wrap={"nowrap"}
        direction={!this.props.isDesktop ? "column-reverse" : "row"}
        container
        spacing={this.props.theme.spacing.unit * 3}
      >
        <Grid item md={2} />
        <Grid item md={6}>
          {skillListComponents}
        </Grid>
        <Grid style={{ flexShrink: 1 }} item md={4}>
          <div
            style={{ position: this.props.isDesktop ? "fixed" : "inherit", overflowY: "auto", maxHeight: "85%" }}
          >
            {skillList.map((skill, index, array) => {
              return (
                <React.Fragment>
                  {InDepthSkillList.generateTableOfContents(
                    skill.detailedDescription
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

  static generateTableOfContents(skill) {
    return (
      <React.Fragment>
        <a href={"#" + skill.title.toLowerCase().replace(/\s/g, "")}>
          <Typography variant={"overline"}>{skill.title}</Typography>
        </a>
        {skill.sections.map(section => (
          <a href={"#" + section.title.toLowerCase().replace(/\s/g, "")}>
            <Typography variant={"subtitle1"}>{section.title}</Typography>
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
            <Typography variant={"subtitle1"}>{section.title}</Typography>
          </a>
        ))}
      </React.Fragment>
    );
  }
}
