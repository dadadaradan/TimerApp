import React from "react";
import { withStyles } from "@material-ui/core";

const styles = {
  root: {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: (props) =>
      props.isDarkMode ? "rgb(38,50,56)" : "rgb(229, 229, 229)",
  },
};

function Page(props) {
  const { classes } = props;
  return <div className={classes.root}>{props.children}</div>;
}

export default withStyles(styles)(Page);
