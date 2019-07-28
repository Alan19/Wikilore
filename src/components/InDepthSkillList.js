import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fade,
  Typography
} from "@material-ui/core";
import { generateFormattedSkillText } from "./FormattedSkillText";

export class InDepthSkillList extends React.Component {
  render() {
    let articles = this.props.skillList;
    console.log(articles);
    let skillListComponents = articles.map((article, index, arr) => (
      <React.Fragment>
        {generateFormattedSkillText(article, article.icon)}
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
          {/*  Render expansion panel if user is viewing from mobile*/}
          {this.props.isDesktop ? (
            <div
              style={{
                position: "fixed",
                overflowY: "auto",
                maxHeight:
                  window.innerHeight - 84 - this.props.theme.spacing.unit * 4,
                padding: this.props.theme.spacing.unit * 2
              }}
            >
              {articles.map((skill, index, array) => {
                return (
                  <React.Fragment>
                    {InDepthSkillList.generateTableOfContents(
                      skill,
                      skill.icon
                    )}
                    {index < array.length - 1 && (
                      <Divider light style={{ width: "90%" }} />
                    )}
                  </React.Fragment>
                );
              })}{" "}
            </div>
          ) : (
            <ExpansionPanel>
              <ExpansionPanelSummary>
                <Typography>Contents</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {articles.map((skill, index, array) => {
                    return (
                      <React.Fragment>
                        {InDepthSkillList.generateTableOfContents(
                          skill.detailedDescription,
                          skill.icon
                        )}
                        {index < array.length - 1 && (
                          <Divider light style={{ width: "90%" }} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}
        </Grid>
      </Grid>
    );
  }

  static generateTableOfContents(skill, icon = null) {
    return (
      <React.Fragment>
        <a href={"#" + skill.name.toLowerCase().replace(/\s/g, "")}>
          <Typography variant={"overline"}>
            {skill.name}{" "}
            {icon !== null && (
              <img style={{ height: "1em" }} src={icon} alt={skill.name} />
            )}{" "}
          </Typography>
        </a>
        {skill.sections.map(section => {
          return (
            <React.Fragment>
              {section.name !== "" && (
                <a href={"#" + section.name.toLowerCase().replace(/\s/g, "")}>
                  <Typography variant={"overline"}>{section.name}</Typography>
                </a>
              )}
              {section.subsections.map(subsection => {
                return (
                  <a
                    href={
                      "#" + subsection.name.toLowerCase().replace(/\s/g, "")
                    }
                  >
                    <Typography style={{ fontSize: 15 }} variant={"subtitle1"}>
                      {subsection.name}
                    </Typography>
                  </a>
                );
              })}
            </React.Fragment>
          );
        })}

        {/*{skill.effects.map(section => (*/}
        {/*  <a href={"#" + section.name.toLowerCase().replace(/\s/g, "")}>*/}
        {/*    <Typography style={{ fontSize: 15 }} variant={"subtitle1"}>*/}
        {/*      {section.name}*/}
        {/*    </Typography>*/}
        {/*  </a>*/}
        {/*))}*/}
      </React.Fragment>
    );
  }
}
