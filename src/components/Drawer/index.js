import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MailIcon from "@material-ui/icons/Mail";
import ListItemText from "@material-ui/core/ListItemText";
import * as PropTypes from "prop-types";
import React from "react";

export function RulebookDrawer(props) {
  return (
    <Drawer
      variant="permanent"
      className={clsx(props.classes.drawer, {
        [props.classes.drawerOpen]: props.open,
        [props.classes.drawerClose]: !props.open
      })}
      classes={{
        paper: clsx({
          [props.classes.drawerOpen]: props.open,
          [props.classes.drawerClose]: !props.open
        })
      }}
    >
      <div className={props.classes.toolbar} />
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={"Inbox"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={"All Mail"} />
        </ListItem>
      </List>
    </Drawer>
  );
}

RulebookDrawer.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool
};
