import React from "react";
import { withStyles } from "@material-ui/core/styles";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { Link } from "react-router-dom";
import styles from "./styles/navbarStyles";

function Navbar(props) {
  const { classes } = props;

  return (
    <nav className={classes.navbar}>
      <div className={classes.logoContainer}>
        <div className={classes.logo}>
          <Link to="/">{<HourglassEmptyIcon fontSize="large" />}</Link>
        </div>
      </div>
      <ul className={classes.navigation}>
        <li className={classes.navigationItem}>
          <Link to="/" className={classes.navigationLink}>
            Home
          </Link>
        </li>
        <li className={classes.navigationItem}>
          <Link to="/settings" className={classes.navigationLink}>
            Settings
          </Link>
        </li>
        <li className={classes.navigationItem}>
          <Link to="/about" className={classes.navigationLink}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default withStyles(styles)(Navbar);
