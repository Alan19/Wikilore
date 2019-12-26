import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {CardTitle} from "./CardTitle";
import Typography from "@material-ui/core/Typography";


export function ListCard(props) {
  const { article } = props;
  return (
    <Card>
      <CardHeader
        title={<CardTitle name={article.name} icon={article.icon} />}
      />
      <CardContent
        style={{
          height: 175,
          textOverflow: "ellipsis",
          overflow: "hidden"
        }}
      >
        <Typography variant={"body1"} style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
          {article.cardInfo}
        </Typography>
      </CardContent>
      <CardActions disableActionSpacing>
        <div className={"left"} style={{ flexGrow: 1 }}>
          {/*<Button*/}
          {/*  size="small"*/}
          {/*  color={"primary"}*/}
          {/*  onClick={() => learnMore(skill)}*/}
          {/*>*/}
          {/*  Learn More*/}
          {/*</Button>*/}
        </div>
        {/*<IconButton onClick={addToCheatSheet}>*/}
        {/*  <Icon color={Overview.checkFavorited(skill)}>star</Icon>*/}
        {/*</IconButton>*/}
      </CardActions>
    </Card>
  );
}
