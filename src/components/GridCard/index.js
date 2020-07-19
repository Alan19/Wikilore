import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {CardTitle} from "./CardTitle";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star"

export function GridCard(props) {
  const {article} = props;
  const [value, setValue] = useState(0); // integer state


  const onFavoriteButtonClicked = article => {
    let favoriteArray;
    if (localStorage.hasOwnProperty("favoriteArticles")) {
      favoriteArray = JSON.parse(localStorage.getItem("favoriteArticles"));
      if (!favoriteArray.includes(article.name)) {
        favoriteArray.push(article.name);
        localStorage.setItem("favoriteArticles", JSON.stringify(favoriteArray));
      }
      else {
        favoriteArray = favoriteArray.filter(name => article.name !== name);
        localStorage.setItem("favoriteArticles", JSON.stringify(favoriteArray));
      }
    }
    else {
      favoriteArray = [article.name];
      localStorage.setItem("favoriteArticles", JSON.stringify(favoriteArray));
    }
    setValue(value + 1);
  };

  const isFavorited = article => localStorage.getItem("favoriteArticles") !== null && JSON.parse(localStorage.getItem("favoriteArticles")).includes(article.name) ? "secondary" : "inherit";


  return (
    <Card>
      <CardHeader
        title={<CardTitle name={article.name} icon={article.icon}/>}
      />
      <CardContent
        style={{
          height: 175,
          textOverflow: "ellipsis",
          overflow: "hidden"
        }}
      >
        <Typography variant={"body1"} style={{textOverflow: "ellipsis", overflow: "hidden"}}>
          {article.cardInfo}
        </Typography>
      </CardContent>
      <CardActions disableActionSpacing>
        <div className={"left"} style={{flexGrow: 1}}>
          <Button
            size="small"
            variant={"contained"}
            color={"primary"}
            onClick={() => props.learnMore(article)}
          >
            Learn More
          </Button>
        </div>
        <IconButton onClick={() => onFavoriteButtonClicked(article)}>
          <StarIcon color={isFavorited(article)}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
