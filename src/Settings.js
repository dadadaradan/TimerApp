import React from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 60,
    height: 25,
    padding: 0,
    display: "flex",
    alignItems: "center",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(34px)",
      "& + $track": {
        opacity: 1,
        backgroundColor: "rgb(119,46,37)",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 20,
    height: 20,
    boxShadow: "none",
    transform: "translate(1.5px, 0.5px);",
    color: theme.palette.common.white,
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 25 / 2,
    opacity: 1,
    backgroundColor: "rgb(25,114,120)",
  },
  checked: {},
}))(Switch);

export default function Settings(props) {
  const { isDarkMode, toggleIsDarkMode } = props;

  return (
    <div>
      <Typography component="div" type="h4" style={{ margin: "3rem" }}>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item style={{ color: isDarkMode && "#f2f2f2" }}>
            Light Mode
          </Grid>
          <Grid item>
            <AntSwitch
              name="Dark Mode Switch"
              checked={isDarkMode}
              onChange={toggleIsDarkMode}
            />
          </Grid>
          <Grid item style={{ color: isDarkMode && "#f2f2f2" }}>
            Dark Mode
          </Grid>
        </Grid>
      </Typography>
    </div>
  );
}
