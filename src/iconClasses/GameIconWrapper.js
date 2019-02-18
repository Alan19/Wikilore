import { SvgIcon } from "@material-ui/core";
import React, { Component } from "react";

class GameIconWrapper extends Component {
    render() {
        return (
            <React.Fragment>
                <SvgIcon viewBox={"0 0 512 512"}>
                    <path d={this.props.path} />
                </SvgIcon>
            </React.Fragment>
        );
    }
}

export default GameIconWrapper;