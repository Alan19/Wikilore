import React, { Component } from "react";
import {Divider, Grow, Typography, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


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
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Grow in={true}>
          <div
          style={{
            margin: "auto",
          }}
          >
            <Grid wrap={"nowrap"} direction={!this.props.isDesktop ? "column-reverse" : "row"} container spacing={this.props.theme.spacing.unit * 3}>
              <Grid item md={2}/>
              <Grid item md={6}>
                <a id={skill.title.toLowerCase().replace(/\s/g, "")} />
                <Typography
                  variant={"h3"}
                  style={{ overflow: "auto", overflowY: "hidden" }}
                  component={"span"}
                  className={classes.anchorTarget}
                >
                  {skill.title} <img src={icon} height={40} alt={skill.title} />
                </Typography>
                <Typography className={classes.anchorTarget} variant={"subtitle2"} paragraph={true}>
                  {skill.blurb}
                </Typography>
                {skill.sections.map(section => (
                  <React.Fragment>
                    <a id={section.title.toLowerCase().replace(/\s/g, "")} />
                    <Typography
                        className={classes.anchorTarget}
                      variant={"subtitle1"}
                    >
                      {section.title}
                    </Typography>
                    <Typography
                        className={classes.anchorTarget}
                      variant={"body1"}
                      paragraph={true}
                      component={"span"}
                    >
                      {section.text}
                    </Typography>
                  </React.Fragment>
                ))}
                <Divider variant={"middle"} light />
                <a id={skill.purchasableSkillType.toLowerCase().replace(/\s/g, "")} />
                <Typography paragraph className={classes.anchorTarget} style={{ paddingTop: 16 }} variant={"h5"}>
                  {skill.purchasableSkillType}
                </Typography>
                {skill.effects.map(section => (
                  <React.Fragment>
                    <a id={section.title.toLowerCase().replace(/\s/g, "")} />
                    <Typography
                        className={classes.anchorTarget}
                      variant={"subtitle1"}
                    >
                      {section.title}
                    </Typography>
                    <Typography
                        className={classes.anchorTarget}
                      variant={"body1"}
                      paragraph={true}
                      component={"span"}
                    >
                      {section.text}
                    </Typography>
                  </React.Fragment>
                ))}
              </Grid>

              {/*Table of Contents*/}
                <Grid item md={4}>
                  <a href={"/#" + skill.title.toLowerCase().replace(/\s/g, "")}>
                    <Typography variant={"overline"}>{skill.title}</Typography>
                  </a>
                  {skill.sections.map(section => (
                    <a
                      href={
                        "/#" + section.title.toLowerCase().replace(/\s/g, "")
                      }
                    >
                      <Typography variant={"subtitle1"}>
                        {section.title}
                      </Typography>
                    </a>
                  ))}
                  <a href={"/#" + skill.purchasableSkillType.toLowerCase().replace(/\s/g, "")}>
                    <Typography variant={"overline"}>{skill.purchasableSkillType}</Typography>
                  </a>
                  {skill.effects.map(section => (
                      <a
                          href={
                            "/#" + section.title.toLowerCase().replace(/\s/g, "")
                          }
                      >
                        <Typography variant={"subtitle1"}>
                          {section.title}
                        </Typography>
                      </a>
                  ))}
              </Grid>
            </Grid>
          </div>
        </Grow>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(InDepthView);