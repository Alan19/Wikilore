import React, {Component} from "react";
import {Grow, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {generateFormattedSkillText} from "./FormattedSkillText";
import {InDepthSkillList} from "./InDepthSkillList";

// Offset all anchors by -64 to account for a fixed header
// and scroll more quickly than the default 400ms
// configureAnchors({ offset: -64, scrollDuration: 200 });

const styles = {
  anchorTarget: {
    // paddingTop: 70, marginTop: -70
  }
};

/**
 * Render InDepthView.
 * Skill information is on the left while table of contents is on the right. If the user is on a mobile device, have table of contents on top instead.
 */
class InDepthView extends Component {
  render() {
    const skill = this.props.skillObject.detailedDescription;
    const icon = this.props.skillObject.icon;
    return (
      <React.Fragment>
        <Grow in={true}>
          <div
              style={{
                margin: "auto"
              }}
          >
            <Grid
                wrap={"nowrap"}
                direction={!this.props.isDesktop ? "column-reverse" : "row"}
                container
                spacing={this.props.theme.spacing.unit * 3}
            >
              <Grid item md={2}/>
              <Grid item md={6}>
                {generateFormattedSkillText(skill, icon)}
              </Grid>

              {/*Table of Contents*/}
              {this.props.displayTableOfContents && (
                  <Grid item md={4}>
                    {InDepthSkillList.generateTableOfContents(skill)}
                  </Grid>
              )}
            </Grid>
          </div>
        </Grow>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(InDepthView);
