import React from "react";
import {Grow, Slide, Typography} from "@material-ui/core";

export class InDepthView extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const skill = this.props.skillObject.detailedDescription;
        const icon = this.props.skillObject.icon;
        return (
            <Grow in={true} timeout={500}>
                <div style={{"width": "70%", marginLeft: "10%"}}>
                    <Typography variant={"h3"}>{skill.title} <img src={icon} height={40} alt={skill.title}/>
                    </Typography>
                    <Typography variant={"subtitle2"} paragraph={true}>{skill.blurb}</Typography>
                    {
                        skill.sections.map(section => <div>
                            <Typography variant={"subtitle1"}>
                                {section.title}
                            </Typography>
                            <Typography variant={"body1"} paragraph={true}>
                                {section.text}
                            </Typography>
                        </div>)
                    }
                    <hr/>
                    <Typography variant={"subtitle2"}>{skill.skillTypes}</Typography>
                    {
                        skill.effects.map(section => <div>
                            <Typography variant={"subtitle1"}>
                                {section.title}
                            </Typography>
                            <Typography variant={"body1"} paragraph={true}>
                                {section.description}
                            </Typography>
                        </div>)
                    }
                </div>
            </Grow>

        )
    }
}