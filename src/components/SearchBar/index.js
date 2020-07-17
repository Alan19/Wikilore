import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core/styles";
import {renderInputComponent} from "./Input";
import {SectionLinks} from "./SectionLinks";
import {styles} from "./style";
import {SuggestionsContainer} from "./SuggestionsContainer";
import {jsonArticles} from "../../index";

/**
 * Function to check if the input matches the suggestion. An suggestion matches the input if the starting part of the
 * name is equal to the input, or if the start of its section and subsection names is equal to the input.
 *
 * @param suggestion The suggestion object, an article JSON
 * @param inputLength The length of the input
 * @param inputValue The value of the input
 * @returns {boolean} Whether the input matches the suggestion
 */
function doesSuggestionMatch(suggestion, inputLength, inputValue) {
  return suggestion.sections
    .map(section => section.subsections.concat({name: section.name}))
    .flat()
    .map(subsection =>
      subsection.name.toLowerCase().slice(0, inputLength)
    )
    .includes(inputValue);
}

/**
 * Get all of the articles whose name or subsection names matches the input
 * @param value The input value in the searchbar
 * @returns {*} An array of entry objects that matches the input value
 */
function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  return inputLength === 0
    ? []
    : //Filter results based on skill name matching or section name matching
    jsonArticles.filter(suggestion => {
      const keep = count < 5 && (suggestion.name.slice(0, inputLength).toLowerCase() === inputValue || (inputLength > 2 && doesSuggestionMatch(suggestion, inputLength, inputValue)));
      if (keep) {
        count += 1;
      }
      return keep;
    });
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

class SearchBar extends React.Component {
  state = {
    single: "",
    popper: "",
    suggestions: []
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    });
  };

  /**
   * Generates menu items based on the matched items
   * @param suggestion The entry object that gets matched with the suggestion
   * @param query The string in the search bar to generate links to subsections on another page
   * @param isHighlighted Is the suggestion highlighted because it is being hovered over
   * @returns {*} A MenuItem that contains a 'link' to another article or a subsection of that article
   */
  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);
    return (
      <MenuItem
        onClick={() => this.props.changeview(suggestion)}
        selected={isHighlighted}
        component="div"
      >
        <div>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{fontWeight: 500}}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{fontWeight: 300}}>
                {part.text}
              </strong>
            )
          )}
          <SectionLinks suggestion={suggestion} query={query} changeview={this.props.changeview}/>
        </div>
      </MenuItem>
    );
  };


  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          renderSuggestion={this.renderSuggestion}
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: "Search a skill",
            value: this.state.single,
            onChange: this.handleChange("single")
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestionsContainer={options => (<SuggestionsContainer options={options} theme={this.props.theme}/>)}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBar);
