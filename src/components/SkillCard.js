import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Typography
} from "@material-ui/core";
import { Overview } from "./Overview";

function SkillTitle(props) {
  const { icon, name } = props.skill;
  return (
    <span>
      {name}
      &nbsp;
      <img style={{ height: "1em" }} src={icon} alt={name} />{" "}
    </span>
  );
}

export function SkillCard(props) {
  const { learnMore, addToCheatSheet, isDesktop, skill } = props;
  return (
    <Card>
      <CardHeader title={<SkillTitle skill={skill} />} />
      {isDesktop && (
        <CardContent
          style={{
            height: 175,
            textOverflow: "ellipsis",
            overflow: "hidden"
          }}
        >
          <Typography
            style={{ textOverflow: "ellipsis", overflow: "hidden" }}
            variant={"body1"}
          >
            {skill.cardInfo}
          </Typography>
        </CardContent>
      )}
      <CardActions disableActionSpacing>
        <div className={"left"} style={{ flexGrow: 1 }}>
          <Button
            size="small"
            color={"primary"}
            onClick={() => learnMore(skill)}
          >
            Learn More
          </Button>
        </div>
        <IconButton onClick={addToCheatSheet}>
          <Icon color={Overview.checkFavorited(skill)}>star</Icon>
        </IconButton>
      </CardActions>
    </Card>
  );
}
