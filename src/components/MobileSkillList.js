import React, { Component } from "react";
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

export class MobileSkillList extends Component {
  render() {
    return (
      <List
        style={{
          width: "100%",
          maxWidth: 360,
          backgroundColor: this.props.theme.palette.background.paper
        }}
        component={"nav"}
      >
        <ListItem onClick={this.props.onClick}>
          <ListItemIcon>
            <Avatar src={this.props.skill.icon} />
          </ListItemIcon>
          <ListItemText
            primary={this.props.skill.name}
            secondary={<Typography noWrap>{this.props.skill.text}</Typography>}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={this.props.addToCheatSheet}>
              <Icon color={Overview.checkFavorited(this.props.skill)}>
                star
              </Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
}

MobileSkillList.propTypes = {
  theme: PropTypes.any,
  onClick: PropTypes.func,
  skill: PropTypes.any,
  addToCheatSheet: PropTypes.func
};
