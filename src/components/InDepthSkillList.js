import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fade,
  Typography
} from "@material-ui/core";
import { generateFormattedSkillText } from "./FormattedSkillText";

export function InDepthSkillList(props) {
  const { skillList, theme, isDesktop } = props;
  let skillListComponents = skillList.map((article, index, arr) => (
    <div style={{marginBottom: props.theme.spacing(3)}}>
      {generateFormattedSkillText(article, article.icon, props.theme)}
    </div>
  ));
  return (
    <Grid
      wrap={"nowrap"}
      direction={!isDesktop ? "column-reverse" : "row"}
      container
      spacing={theme.spacing.unit * 3}
    >
      <Fade in={true}>
        <Grid item md>
          {skillListComponents}
        </Grid>
      </Fade>
      <Grid item md={4}>
        {/*  Render expansion panel if user is viewing from mobile*/}
        {isDesktop ? (
          <div
            style={{
              position: "fixed",
              overflowY: "auto",
              maxHeight: window.innerHeight - 84 - theme.spacing.unit * 4,
              padding: theme.spacing.unit * 2
            }}
          >
            {skillList.map((skill, index, array) => {
              return (
                <React.Fragment>
                  {InDepthSkillList.generateTableOfContents(skill, skill.icon)}
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
                {skillList.map((skill, index, array) => {
                  return (
                    <>
                      {InDepthSkillList.generateTableOfContents(
                        skill,
                        skill.icon
                      )}
                    </>
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

function scrollToSection(sectionID) {
  window.scrollTo(0, document.getElementById(sectionID).offsetTop - 100);
}

InDepthSkillList.generateTableOfContents = (skill, icon = null) => (
  <React.Fragment>
    <Typography
      className={"tableOfContentsNavigationLink"}
      variant={"overline"}
      onClick={() =>
        scrollToSection(`${skill.name.toLowerCase().replace(/\s/g, "")}`)
      }
    >
      {skill.name}{" "}
      {icon !== null && (
        <img style={{ height: "1em" }} src={icon} alt={skill.name} />
      )}{" "}
    </Typography>
    {skill.sections.map(section => {
      return (
        <React.Fragment>
          {section.name !== "" && (
            <Typography
              className={"tableOfContentsNavigationLink"}
              onClick={() =>
                scrollToSection(
                  skill.name.toLowerCase().replace(/\s/g, "") +
                    section.name.toLowerCase().replace(/\s/g, "")
                )
              }
              variant={"overline"}
            >
              {section.name}
            </Typography>
          )}
          {section.subsections.map(subsection => {
            return (
              <Typography
                className={"tableOfContentsNavigationLink"}
                onClick={() =>
                  scrollToSection(
                    skill.name.toLowerCase().replace(/\s/g, "") +
                      subsection.name.toLowerCase().replace(/\s/g, "")
                  )
                }
                style={{ fontSize: 15 }}
                variant={"subtitle1"}
              >
                {subsection.name}
              </Typography>
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
