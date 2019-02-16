import {
  BottomNavigation,
  BottomNavigationAction,
  Slide,
  Typography
} from "@material-ui/core";
import MagicIcon from "../iconClasses/MagicIcon";
import WayIcon from "../iconClasses/WayIcon";
import CultureIcon from "../iconClasses/CultureIcon";
import React from "react";
import { copyright } from "../info";

export default getFooter;

const bottomNav = (
  <BottomNavigation style={{ width: "100%" }} showLabels value={0}>
    <BottomNavigationAction icon={<MagicIcon />} label="Magic" />
    <BottomNavigationAction icon={<WayIcon />} label="Way" />
    <BottomNavigationAction icon={<CultureIcon />} label="Culture" />
  </BottomNavigation>
);

const copyrightText = (
  <Typography
    variant={"caption"}
    style={{ textAlign: "center", paddingRight: 10 }}
  >
    {copyright}
  </Typography>
);

function getFooter() {
  if (window.innerWidth <= 500) {
    return (
      <Slide direction={"up"} in={true}>
        <div style={{ position: "sticky", bottom: "0" }}>
          {bottomNav}
          <div
            style={{
              position: "relative",
              marginLeft: 10,
              background: "rgba(0,0,0,1)"
            }}
          >
            {copyrightText}
          </div>
        </div>
      </Slide>
    );
  } else {
    return (
      <div style={{ position: "fixed", bottom: 0, right: 0 }}>
        {copyrightText}
      </div>
    );
  }
}
