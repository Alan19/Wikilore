import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import React from "react";
import ReactMarkdown from "react-markdown";
import LinkComponent from "../ArticleComponents/LinkComponent";
import Popup from "../ArticleComponents/Popup";
import {Span} from "./Span";
import {ImportantIdea} from "../ArticleComponents/ImportantIdea";
import {TextComponent} from "../ArticleComponents/TextComponent";

export function renderSections(json) {
  return <>
    {json.sections
      .map(section => <>
        {section.name.trim() !== "" && (
          <Typography id={json.name.toLowerCase().replace(/\s/g, "") + section.name.toLowerCase().replace(/\s/g, "")}
                      paragraph style={{paddingTop: 16}} variant={"h4"}>
            {section.name}
          </Typography>
        )}
        {section.subsections.map(subsection => (
          <>
            <Typography
              id={json.name.toLowerCase().replace(/\s/g, "") + subsection.name.match(/[^[[(]*/)[0].toLowerCase().replace(/\s/g, "")}
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

function generateSubsectionTitle(subsection) {
  return <>
    <ReactMarkdown renderers={titleRenderer} source={subsection.name}/>
  </>;
}

const titleRenderer = {
  linkReference: LinkComponent,
  link: Popup,
  paragraph: Span
}

const processComponent = (component, index) => {
  switch (component.type) {
    case "emphasis":
      return <ImportantIdea name={component.name} description={component.text}/>;
    default:
      return <TextComponent component={component} index={index}/>;
  }
};
