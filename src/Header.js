import {
    AppBar,
    Icon,
    IconButton,
    Toolbar, Tooltip,
    Typography
} from "@material-ui/core";
import React, {Component} from "react";
import MagicIcon from "./icon-classes/magic-icon";
import WayIcon from "./icon-classes/way-icon";
import CultureIcon from "./icon-classes/culture-icon";
import * as PropTypes from "prop-types";

class AppBarButtons extends Component {
    render() {
        return <>
            <Tooltip title={"Magic"}>
                <IconButton
                    onClick={this.props.onClick}
                    color={"inherit"}
                    label="Magic"
                >
                    <MagicIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Ways"}>
                <IconButton
                    onClick={this.props.onClick1}
                    color={"inherit"}
                    label="Way"
                >
                    <WayIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Culture"}>
                <IconButton
                    onClick={this.props.onClick2}
                    color={"inherit"}
                    label="Culture"
                >
                    <CultureIcon/>
                </IconButton>
            </Tooltip>
        </>;
    }
}

AppBarButtons.propTypes = {
    onClick: PropTypes.func,
    onClick1: PropTypes.func,
    onClick2: PropTypes.func
};

export class RenderAppBar extends Component {
    
    render() {
        var showBackButton;
        if (this.props.backable){
            showBackButton = 'visible'
        }
        else {
            showBackButton = 'hidden'
        }
        return (
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton style={{visibility:showBackButton}} color="inherit" aria-label="Menu" onClick={() => this.props.back()}>
                        <Icon>arrow_back</Icon>
                    </IconButton>
                    <Typography variant="headline" style={{flexGrow: 1}} color="inherit">
                        Cheat Sheet
                    </Typography>
                    <AppBarButtons onClick={() => this.props.onclick("magic")}
                                   onClick1={() => this.props.onclick("way")}
                                   onClick2={() => this.props.onclick("culture")}/>
                </Toolbar>
            </AppBar>
        );
    }
}
