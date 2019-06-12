//Copyright text
import { magicIcon, magicListIcon } from "./iconPaths";
import hat from "./resources/pointy-hat.svg";
import React from "react";

export const copyright = "Insert your copyright here";

var fireball = {
  //The ID of an entry
  id: 13,
  //The name of en enty
  name: "Fireball",
  //The text that will be displayed in the overview
  text:
      "Shoots a fireball at the enemy.",
  //The icon of the entry
  icon: hat,
  //An object for displaying information about an entry in it's detailed page
  detailedDescription: {
    title: "Fireball",
    blurb: "",
    sections: [
      {
        title: "Overview",
        text:
            "Fireballs are a great way to inflict damage to your enemies."
      },
      {
        title: "Mana Costs",
        text:
            "Fireballs only cost 1 MP to cast. It's a very versatile spell."
      }
    ],
    purchasableSkillType: "Variations",
    effects: [
      {
        title: "Triple Fireball",
        text:
            "Shooting 3 fireballs at once is better than 1."
      },
      {
        title: "Explosive Fireball",
        text:
            "Exploding fireballs is handy for taking out large groups of enemies."
      }
    ]
  }
};

var darkVision = {
  //The ID of an entry
  id: 14,
  //The name of en enty
  name: "Darkvison",
  //The text that will be displayed in the overview
  text:
      "Gains vision in the dark",
  //The icon of the entry
  icon: hat,
  //An object for displaying information about an entry in it's detailed page
  detailedDescription: {
    title: "Darkvision",
    blurb: "",
    sections: [
      {
        title: "Overview",
        text:
            "Darkvision is a great way t osee in the dark."
      },
      {
        title: "Mana Costs",
        text:
            "Darkvision only cost 1 MP to cast. It's a very versatile spell."
      }
    ],
    purchasableSkillType: "Variations",
    effects: [
      {
        title: "Lightvision",
        text:
            "You can see when you are blinded"
      },
      {
        title: "Eye Lasers",
        text:
            "You can shoot lasers from your eyes... somehow."
      }
    ]
  }
};

var magicDescription = [fireball, darkVision];


//Main info variable
export let info = [
  {
    id: 0,
    name: "Magic",
    infoObj: magicDescription,
    icon: magicIcon,
    listIcon: magicListIcon
  }
];


//Set your default view when loading
export let defaultCategory = info[0];

export let allSkills = magicDescription;
