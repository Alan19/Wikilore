import {BottomNavigation, BottomNavigationAction, Typography} from "@material-ui/core";
import MagicIcon from "./icon-classes/magic-icon";
import WayIcon from "./icon-classes/way-icon";
import CultureIcon from "./icon-classes/culture-icon";
import React from "react";
import {copyright} from './store'

export default getFooter;

const bottomNav = <BottomNavigation
    style={{ width: "100%" }}
    showLabels
    value={0}
>
  <BottomNavigationAction icon={<MagicIcon />} label="Magic" />
  <BottomNavigationAction icon={<WayIcon />} label="Way" />
  <BottomNavigationAction icon={<CultureIcon />} label="Culture" />
</BottomNavigation>;

const copyrightText = (<Typography variant={"caption"} style={{right:0}}>{copyright}</Typography>);


function getFooter(props) {
  if (window.innerWidth <= 500) {
    return (
        <span style={{ position: "sticky", bottom: "0"}}>
          {bottomNav}
          <div style={{position: 'relative', marginLeft: 10}}>{copyrightText}</div>
        </span>

    );
  } else {
    return <div style={{ position: "fixed", bottom: 0, right: 0, marginRight:10, marginBottom: 10}}>{copyrightText}</div>;
  }

}

