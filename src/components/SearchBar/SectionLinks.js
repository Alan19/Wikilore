import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { getSectionId } from "../Article/RenderSections";

export function SectionLinks(props) {
  /**
   * Generate a span elements that functions as a link to another element on another article when clicked on
   * @param suggestion The matched entry object
   * @param query The string input in the search bar
   * @returns {*} A span element that takes the user to another page when clicked on
   */
  function searchForSection(suggestion, query) {
    //Map each suggestion to its subsections object + the section name as a 'dummy' subsection object
    let subsections = suggestion.sections.map(section => section.subsections.concat({ name: section.name })).flat();
    return subsections
      .filter(subsection => subsection.name.slice(0, query.length).toLowerCase() === query.toLowerCase())
      .map(section => (
        <span
          onClick={() => props.changeview(suggestion, getSectionId(suggestion.name, section.name))}
          onMouseOver={event => {
            return (event.currentTarget.style.textDecoration = "underline");
          }}
          onMouseLeave={event => {
            return (event.currentTarget.style.textDecoration = "none");
          }}
        >
          {section.name.match(/[^[[(]*/)[0]}
        </span>
      ))
      .reduce((prev, curr) => [prev, ", ", curr]);
  }

  /**
   * Checks for which section the suggestion is pointing to
   * @param suggestion The object that contains information about the page
   * @param query The text in the search bar
   * @returns {string} The fist skill name that the query matches to
   */
  function getMatchedSectionTitles(suggestion, query) {
    if (query.toLowerCase() !== suggestion.name.slice(0, query.length).toLowerCase()) {
      return <Typography variant={"subtitle2"}>{searchForSection(suggestion, query)}</Typography>;
    } else {
      return <></>;
    }
  }

  return <>{getMatchedSectionTitles(props.suggestion, props.query)}</>;
}

SectionLinks.propTypes = {
  query: PropTypes.string.isRequired,
  suggestion: PropTypes.object.isRequired
};
