import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { Card, CardContent, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

export const ImportantIdea = ({ description, name }) => {
  const classes = useStyles();
  return (
    <Container>
      <Card elevation={4} className={classes.card}>
        <CardContent>
          <Typography variant={"h5"} gutterBottom>
            {name}
          </Typography>
          <Typography variant={"body2"} component={"p"}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

ImportantIdea.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

ImportantIdea.defaultProps = {
  description: "",
  name: ""
};
