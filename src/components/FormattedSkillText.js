import React from "react";
import { Divider, Typography } from "@material-ui/core";
import ReactMarkdown from "react-markdown";

export function generateFormattedSkillText(skill, icon) {
  const generateTitle = () => (
    <>
      <a id={skill.name.toLowerCase().replace(/\s/g, "")} />
      <Typography
        variant={"h3"}
        style={{ overflow: "auto", overflowY: "hidden" }}
        component={"span"}
      >
        {skill.name}{" "}
        <img style={{ height: "1em" }} src={icon} alt={skill.name} />
      </Typography>
      <Typography variant={"subtitle2"} paragraph={true}>
        {skill.blurb}
      </Typography>
    </>
  );

  const renderSections = () => (
    <>
      {skill.sections.map((section, i) => {
        return (
          <>
            {section.name.trim() !== "" && (
              <>
                <a id={section.name.toLowerCase().replace(/\s/g, "")} />
                <Typography paragraph style={{ paddingTop: 16 }} variant={"h5"}>
                  {section.name}
                </Typography>
              </>
            )}
            {section.subsections.map(subsection => {
              return (
                <React.Fragment>
                  <a id={subsection.name.toLowerCase().replace(/\s/g, "")} />
                  <Typography variant={"subtitle1"}>
                    {subsection.name}
                  </Typography>
                  <Typography
                    variant={"body1"}
                    paragraph={true}
                    component={"span"}
                    dangerouslySetInnerHTML={{ __html: subsection.text }}
                  >
                    {/*<ReactMarkdown className={"Typography"} source={subsection.text} />*/}
                  </Typography>
                </React.Fragment>
              );
            })}
            {i < skill.sections.length - 1 && (
              <Divider variant={"middle"} light />
            )}
          </>
        );
      })}
    </>
  );

  return (
    <React.Fragment>
      {generateTitle()}
      {renderSections()}
    </React.Fragment>
  );
}
