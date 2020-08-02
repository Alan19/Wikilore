import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import React from "react";
import ReactMarkdown from "react-markdown";
import LinkComponent from "../ArticleComponents/LinkComponent";
import Popup from "../ArticleComponents/Popup";
import { Span } from "./Span";
import { ImportantIdea } from "../ArticleComponents/ImportantIdea";
import { TextComponent } from "../ArticleComponents/TextComponent";

//Takes in a page and a section and returns a string with the both of their names lowercased and whitespace removed and removes links on the subsection name
export const getSectionId = (pageName, subsectionName) =>
  pageName.toLowerCase().replace(/\s/g, "") +
  subsectionName
    .match(/[^[[(]*/)[0]
    .toLowerCase()
    .replace(/\s/g, "");

export function Sections(props) {
  return (
    <>
      {props.json.sections
        .map(section => (
          <>
            {section.name.trim() !== "" && (
              <Typography id={getSectionId(props.json.name, section.name)} paragraph style={{ paddingTop: 16 }} variant={"h4"}>
                {section.name}
              </Typography>
            )}
            {section.subsections.map(subsection => (
              <>
                <Typography id={getSectionId(props.json.name, subsection.name)} variant={"h6"}>
                  {generateSubsectionTitle(props.json.name, subsection, props.setSection)}
                </Typography>
                <Typography component={"div"} paragraph>
                  <TextComponent text={subsection.text} articleName={props.json.name} setSection={props.setSection} />
                </Typography>
              </>
            ))}
          </>
        ))
        .reduce((prev, curr) => [prev, <Divider variant={"middle"} light />, curr])}
    </>
  );
}

export function titleRenderer(articleName, setSection) {
  return {
    linkReference: props => (
      <LinkComponent setSection={() => setSection(getSectionId(articleName, props.children[0].props.children))} articleName={articleName}>
        {props.children}
      </LinkComponent>
    ),
    inlineCode: props => {
      if (props.value.startsWith("popup")) {
        return <Popup children={props.children.substring(5).trim()} />;
      }
      if (props.value.startsWith("emphasis")) {
        return <ImportantIdea description={props.children.substring(8).trim()} />;
      }
      const code = React.createElement("code");
      return React.createElement("pre", {}, code);
    },
    paragraph: Span
  };
}

function generateSubsectionTitle(articleName, subsection, setSection) {
  return (
    <>
      <ReactMarkdown renderers={titleRenderer(articleName, setSection)} source={subsection.name} />
    </>
  );
}
