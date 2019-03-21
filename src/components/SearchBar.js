import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { cultureDescription, magicDescription, wayDescription } from "../info";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Icon } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const suggestions = magicDescription
  .concat(wayDescription)
  .concat(cultureDescription);

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          root: classes.inputRoot,
          input: classes.input,
          focused: classes.cssFocused
        },
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start">
            <Icon color={"primary"}>search</Icon>
          </InputAdornment>
        )
      }}
      {...other}
    />
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : //Filter results based on skill name matching or section name matching
      suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          (suggestion.name.slice(0, inputLength).toLowerCase() === inputValue ||
            (inputLength > 2 &&
              (suggestion.detailedDescription.sections
                .map(field => field.title.toLowerCase().slice(0, inputLength))
                .includes(inputValue) ||
                suggestion.detailedDescription.effects
                  .map(field => field.title.slice(0, inputLength).toLowerCase())
                  .includes(inputValue))));
        if (keep) {
          count += 1;
        }
        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

const styles = theme => ({
  inputRoot: {},
  positionStart: {
    color: "#FFFFFF"
  },
  root: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 4
  },
  input: {
    color: "#FFFFFF",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    backgroundColor: "#fff"
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing.unit * 2
  },
  cssFocused: {
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  }
});

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
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            )
          )}
          {this.getMatchedSectionTitles(suggestion, query)}
        </div>
      </MenuItem>
    );
  };

  /**
   * Checks for which section the suggestion is pointing to
   * @param suggestion The object that contains information about the page
   * @param query The text in the search bar
   * @returns {string} The fist skill name that the query matches to
   */
  getMatchedSectionTitles(suggestion, query) {
    if (
      query.toLowerCase() !==
      suggestion.name.slice(0, query.length).toLowerCase()
    )
      return (
        <Typography variant={"subtitle2"}>
          {this.searchForSection(suggestion, query)}
        </Typography>
      );
  }
  searchForSection(suggestion, query) {
    return suggestion.detailedDescription.sections
      .concat(suggestion.detailedDescription.effects)
      .filter(
        section =>
          section.title.slice(0, query.length).toLowerCase() ===
          query.toLowerCase()
      )
      .map(section => (
        <span
          onClick={() =>
            this.props.changeview(
              suggestion,
              section.title.toLowerCase().replace(/\s/g, "")
            )
          }
        >
          {section.title}
        </span>
      ))
      // .join(", ");
  }

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
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBar);
