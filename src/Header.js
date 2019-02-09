import {
    AppBar,
    Icon,
    IconButton,
    Toolbar, Tooltip,
    Typography
} from "@material-ui/core";
import React from "react";
import MagicIcon from "./icon-classes/magic-icon";
import WayIcon from "./icon-classes/way-icon";
import CultureIcon from "./icon-classes/culture-icon";

export default RenderAppBar;

function RenderAppBar(props) {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                    <Icon>menu</Icon>
                </IconButton>
                <Typography variant="headline" style={{flexGrow: 1}} color="inherit">
                    Cheat Sheet
                </Typography>
                <Tooltip title={"Magic"}>
                    <IconButton
                        onClick={() => props.onclick("magic")}
                        color={"inherit"}
                        label="Magic"
                    >
                        <MagicIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Ways"}>
                    <IconButton
                        onClick={() => props.onclick("way")}
                        color={"inherit"}
                        label="Way"
                    >
                        <WayIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Culture"}>
                    <IconButton
                        onClick={() => props.onclick("culture")}
                        color={"inherit"}
                        label="Culture"
                    >
                        <CultureIcon/>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}
