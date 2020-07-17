import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import React from "react";
import ReactMarkdown from "react-markdown";
import LinkComponent from "../ArticleComponents/LinkComponent";
import Popup from "../ArticleComponents/Popup";
import {Span} from "./Span";
import {ImportantIdea} from "../ArticleComponents/ImportantIdea";
import {TextComponent} from "../ArticleComponents/TextComponent";

//Takes in a page and a section and returns a string with the both of their names lowercased and whitespace removed and removes links on the subsection name
const getSectionId = (pageName, subsectionName) => pageName.toLowerCase().replace(/\s/g, "") + subsectionName.match(/[^[[(]*/)[0].toLowerCase().replace(/\s/g, "");

export function renderSections(json) {
  return <>
    {json.sections
      .map(section => <>
        {section.name.trim() !== "" && (
          <Typography id={getSectionId(json.name, section.name)} paragraph style={{paddingTop: 16}} variant={"h4"}>
            {section.name}
          </Typography>
        )}
        {section.subsections.map(subsection => (
          <>
            <Typography
              id={getSectionId(json.name, subsection.name)}
              variant={"h6"}>
              {generateSubsectionTitle(subsection)}
            </Typography>
            <Typography component={"div"} paragraph>
              {subsection.components.map((component, componentIndex) => processComponent(component, componentIndex))}
            </Typography>
          </>
        ))}
      </>)
      .reduce((prev, curr) => [prev, <Divider variant={"middle"} light/>, curr])}
  </>;
}

const titleRenderer = {
  linkReference: LinkComponent,
  link: Popup,
  paragraph: Span
}

function generateSubsectionTitle(subsection) {
  return <>
    <ReactMarkdown renderers={titleRenderer} source={subsection.name}/>
  </>;
}

function processComponent(component, index) {
  switch (component.type) {
    case "emphasis":
      return <ImportantIdea name={component.name} description={component.text}/>;
    default:
      return <TextComponent component={component} index={index}/>;
  }
}
