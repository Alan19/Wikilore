import {
    AppBar,
    Icon,
    IconButton,
    Toolbar, Tooltip,
    Typography, withStyles
} from "@material-ui/core";
import React, {Component} from "react";
import MagicIcon from "../icon-classes/magic-icon";
import WayIcon from "../icon-classes/way-icon";
import CultureIcon from "../icon-classes/culture-icon";
import * as PropTypes from "prop-types";
import SearchBar from './SearchBar'

const styles = {};

class AppBarButtons extends Component {
    render() {
        return <div>
            <Tooltip title={'Toggle Light/Dark Theme'}>
                <IconButton onClick={this.props.switchTheme} color={'inherit'}
                            label={'Switch Light/Dark Theme'}><Icon>highlight</Icon></IconButton>
            </Tooltip>
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
        </div>;
    }
}

AppBarButtons.propTypes = {
    onClick: PropTypes.func,
    onClick1: PropTypes.func,
    onClick2: PropTypes.func
};

export class RenderAppBar extends Component {

    render() {
        let showBackButton;
        if (this.props.backable) {
            showBackButton = 'visible'
        } else {
            showBackButton = 'hidden'
        }
        return (
            <AppBar position="sticky" color={"primary"}>
                <Toolbar>
                    <IconButton style={{visibility: showBackButton}} color="inherit" aria-label="Menu"
                                onClick={() => this.props.back()}>
                        <Icon>arrow_back</Icon>
                    </IconButton>
                    <Typography variant="headline" color="inherit" style={{flexGrow: 1}}>
                        Cheat Sheet
                    </Typography>
                    <SearchBar changeview={this.props.changeview}/>

                    <div style={{marginLeft: 30}}>
                        <AppBarButtons
                            switchTheme={() => this.props.switchTheme()}
                            onClick={() => this.props.onclick("magic")}
                            onClick1={() => this.props.onclick("way")}
                            onClick2={() => this.props.onclick("culture")}/>
                    </div>

                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(RenderAppBar);