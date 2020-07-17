export const styles = theme => ({
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
  },
  paper: {
    background: theme.palette.background.paper
  }
});