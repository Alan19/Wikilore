import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import * as PropTypes from "prop-types";

export function CategoryIcon(props) {
  return (
    <Tooltip title={props.name} placement={"right"}>
      <ListItem onClick={props.switchArticles} button key={props.name}>
        <ListItemIcon>
          <GameIconWrapper path={props.path} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary={props.name} />
      </ListItem>
    </Tooltip>
  );
}

function GameIconWrapper(props) {
  return (
    <>
      <SvgIcon viewBox={"0 0 512 512"}>
        <path d={props.path} />
      </SvgIcon>
    </>
  );
}

CategoryIcon.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  switchArticles: PropTypes.func.isRequired
};
