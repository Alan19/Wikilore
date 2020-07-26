import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { getSectionId } from "../Article/RenderSections";
import { removeWhiteSpaceAndLowercase } from "../Article/Article";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles(theme => ({
  navigationRoot: {
    position: "fixed",
    overflowY: "auto",
    maxHeight: "85%",
    padding: theme.spacing(2)
  },
  link: {
    cursor: "pointer"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export function Navigation(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const contents = (
    <>
      {props.articles.map(article => (
        <>
          <Typography component={"div"} className={classes.link} variant={"button"} onClick={() => props.setSection(removeWhiteSpaceAndLowercase(article.name))}>
            {article.name} {article.icon !== null && <img style={{ height: "1em" }} src={article.icon} alt={article.name} />}{" "}
          </Typography>
          {article.sections.map(section => (
            <>
              <Typography component={"div"} className={classes.link} variant={"overline"} onClick={() => props.setSection(getSectionId(article.name, section.name))}>
                {section.name}
              </Typography>

              {section.subsections.map(subsection => (
                <Typography component={"div"} className={classes.link} variant={"subtitle1"} onClick={() => props.setSection(getSectionId(article.name, subsection.name))}>
                  {subsection.name.match(/[^[[(]*/)}
                </Typography>
              ))}
            </>
          ))}
        </>
      )).reduce((left, right) => [left, <br/>, right])}
    </>
  );

  let mobileNavigation = (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Contents" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={classes.nested}>{contents}</div>
      </Collapse>
    </List>
  );

  const standardNavigation = <div className={classes.navigationRoot}><Typography variant={"overline"}>Contents</Typography><br/> {contents}</div>;

  return props.isMobilePortrait ? mobileNavigation : standardNavigation;
}
