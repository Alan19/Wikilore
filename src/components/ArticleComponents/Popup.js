import React from "react";
import Popover from "@material-ui/core/Popover";

//TODO Replace with page of other occurrences
export default function Popup(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = target => {
    setAnchorEl(target);
  };
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left"
        }}
      >
        The content of the Popover.
      </Popover>
      <span
        className={"popoverTrigger"}
        onClick={event => handleClick(event.currentTarget)}
      >
        {props.children}
      </span>
    </>
  );
}
