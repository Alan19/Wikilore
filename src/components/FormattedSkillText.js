import React from "react";
import { Divider, Typography } from "@material-ui/core";

export function generateFormattedSkillText(skill, icon) {
  function generateTitle() {
    return (
      <>
        <a id={skill.title.toLowerCase().replace(/\s/g, "")} />
        <Typography
          variant={"h3"}
          style={{ overflow: "auto", overflowY: "hidden" }}
          component={"span"}
        >
          {skill.title}{" "}
          <img style={{ height: "1em" }} src={icon} alt={skill.title} />
        </Typography>
        <Typography variant={"subtitle2"} paragraph={true}>
          {skill.blurb}
        </Typography>
      </>
    );
  }

  function generateSections() {
    return (
      <>
        {skill.sections.map(section => (
          <React.Fragment>
            <a id={section.title.toLowerCase().replace(/\s/g, "")} />
            <Typography variant={"subtitle1"}>{section.title}</Typography>
            <Typography variant={"body1"} paragraph={true} component={"span"}>
              {section.text}
            </Typography>
          </React.Fragment>
        ))}
      </>
    );
  }

  function generatePurchaseableSkills() {
    return (
      <>
        <a id={skill.purchasableSkillType.toLowerCase().replace(/\s/g, "")} />
        <Typography paragraph style={{ paddingTop: 16 }} variant={"h5"}>
          {skill.purchasableSkillType}
        </Typography>
        {skill.effects.map(section => (
          <React.Fragment>
            <a id={section.title.toLowerCase().replace(/\s/g, "")} />
            <Typography variant={"subtitle1"}>{section.title}</Typography>
            <Typography variant={"body1"} paragraph={true} component={"span"}>
              {section.text}
            </Typography>
          </React.Fragment>
        ))}
      </>
    );
  }

  return (
    <React.Fragment>
      {generateTitle()}
      {generateSections()}
      <Divider variant={"middle"} light />
      {generatePurchaseableSkills()}
    </React.Fragment>
  );
}
