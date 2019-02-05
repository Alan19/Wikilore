import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import MagicIcon from './icon-classes/magic-icon'
import WayIcon from './icon-classes/way-icon'
import CultureIcon from './icon-classes/culture-icon'
import React from "react";

export default getFooter;

function getFooter(props) {
    if (window.innerWidth <= 500) {
        return <BottomNavigation style={{position: "fixed", bottom: "0", width: "100%"}} showLabels value={0}>
            <BottomNavigationAction icon={<MagicIcon/>} label='Magic'/>
            <BottomNavigationAction icon={<WayIcon/>} label='Way'/>
            <BottomNavigationAction icon={<CultureIcon/>} label='Culture'/>
        </BottomNavigation>;
    } else {
        return (
            null
        )
    }

}