import React from "react";
import {
  Avatar,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";
import * as PropTypes from "prop-types";
import { Overview } from "./Overview";

export function MobileSkillList({ addToCheatSheet, onClick, skill, theme }) {
  return (
    <List
      style={{
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
      }}
      component={"nav"}
    >
      <ListItem onClick={onClick}>
        <ListItemIcon>
          <Avatar src={skill.icon} />
        </ListItemIcon>
        <ListItemText
          primary={skill.name}
          secondary={<Typography noWrap>{skill.text}</Typography>}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={addToCheatSheet}>
            <Icon color={Overview.checkFavorited(skill)}>star</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

MobileSkillList.propTypes = {
  theme: PropTypes.any,
  onClick: PropTypes.func,
  skill: PropTypes.any,
  addToCheatSheet: PropTypes.func
};
