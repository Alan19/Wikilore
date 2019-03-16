import React, { Component } from "react";
import { Divider, Grow, Typography, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { HashLink as Link } from "react-router-hash-link";

const styles = {
  anchorTarget: {
    // paddingTop: 70, marginTop: -70
  }
};

const scrollWithOffset = (el, offset) => {
  const elementPosition = el.offsetTop - offset;
  window.scroll({
    top: elementPosition,
    left: 0
  });
};

/**
 * Render InDepthView.
 * Skill information is on the left while table of contents is on the right. If the user is on a mobile device, have table of contents on top instead.
 */
class InDepthView extends Component {
  render() {
    const skill = this.props.skillObject.detailedDescription;
    const icon = this.props.skillObject.icon;
    const { classes } = this.props;
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
              <Grid item md={2} />
              <Grid item md={6}>
                <Typography
                  variant={"h3"}
                  style={{ overflow: "auto", overflowY: "hidden" }}
                  component={"span"}
                  id={skill.title.toLowerCase().replace(/\s/g, "")}
                >
                  {skill.title} <img src={icon} height={40} alt={skill.title} />
                </Typography>
                <Typography
                  className={classes.anchorTarget}
                  variant={"subtitle2"}
                  paragraph={true}
                >
                  {skill.blurb}
                </Typography>
                {skill.sections.map(section => (
                  <React.Fragment>
                    <Typography
                      id={section.title.toLowerCase().replace(/\s/g, "")}
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
                <Typography
                  paragraph
                  id={skill.purchasableSkillType
                    .toLowerCase()
                    .replace(/\s/g, "")}
                  style={{ paddingTop: 16 }}
                  variant={"h5"}
                >
                  {skill.purchasableSkillType}
                </Typography>
                {skill.effects.map(section => (
                  <React.Fragment>
                    <Typography
                      id={section.title.toLowerCase().replace(/\s/g, "")}
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
                <Link
                  scroll={el => scrollWithOffset(el, 0)}
                  to={"//#" + skill.title.toLowerCase().replace(/\s/g, "")}
                >
                  <Typography variant={"overline"}>{skill.title}</Typography>
                </Link>
                {skill.sections.map(section => (
                  <Link
                    scroll={el => scrollWithOffset(el, 0)}
                    to={"//#" + section.title.toLowerCase().replace(/\s/g, "")}
                  >
                    <Typography variant={"subtitle1"}>
                      {section.title}
                    </Typography>
                  </Link>
                ))}
                <Link
                  scroll={el => scrollWithOffset(el, 0)}
                  to={
                    "//#" +
                    skill.purchasableSkillType.toLowerCase().replace(/\s/g, "")
                  }
                >
                  <Typography variant={"overline"}>
                    {skill.purchasableSkillType}
                  </Typography>
                </Link>
                {skill.effects.map(section => (
                  <Link
                    scroll={el => scrollWithOffset(el, 0)}
                    to={"//#" + section.title.toLowerCase().replace(/\s/g, "")}
                  >
                    <Typography variant={"subtitle1"}>
                      {section.title}
                    </Typography>
                  </Link>
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
