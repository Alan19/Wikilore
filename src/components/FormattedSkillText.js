import React from "react";
import {Divider, Paper, Typography} from "@material-ui/core";

function generateTitle(skill, icon) {
  return (
    <>
      <Typography
        id={skill.name.toLowerCase().replace(/\s/g, "")}
        variant={"h3"}
        style={{ overflow: "auto", overflowY: "hidden" }}
      >
        {skill.name}{" "}
        <img style={{ height: "1em" }} src={icon} alt={skill.name} />
      </Typography>
      <Typography variant={"subtitle2"} paragraph={true}>
        {skill.blurb}
      </Typography>
    </>
  );
}

function renderSections(skill) {
  return (
    <>
      {skill.sections
        .map((section) => {
          return (
            <>
              {section.name.trim() !== "" && (
                <>
                  <Typography
                    id={
                      skill.name.toLowerCase().replace(/\s/g, "") +
                      section.name.toLowerCase().replace(/\s/g, "")
                    }
                    paragraph
                    style={{ paddingTop: 16 }}
                    variant={"h4"}
                  >
                    {section.name}
                  </Typography>
                </>
              )}
              {section.subsections.map(subsection => {
                return (
                  <React.Fragment>
                    <Typography
                      id={
                        skill.name.toLowerCase().replace(/\s/g, "") +
                        subsection.name.toLowerCase().replace(/\s/g, "")
                      }
                      variant={"h6"}
                    >
                      {subsection.name}
                    </Typography>
                    <Typography
                      variant={"body1"}
                      paragraph={true}
                      dangerouslySetInnerHTML={{ __html: subsection.text }}
                    />
                  </React.Fragment>
                );
              })}
            </>
          );
        })
        .reduce((prev, curr) => [
          prev,
          <Divider variant={"middle"} light />,
          curr
        ])}
    </>
  );
}
export function generateFormattedSkillText(skill, icon, theme) {
  return (
    <Paper style={{padding: theme.spacing(3, 2)}}>
      {generateTitle(skill, icon)}
      {renderSections(skill)}
    </Paper>
  );
}
