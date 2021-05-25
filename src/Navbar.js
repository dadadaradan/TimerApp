import React from "react";
import { withStyles } from "@material-ui/core/styles";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { Link } from "react-router-dom";

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "10vh",
    backgroundColor: (props) =>
      props.isDarkMode ? "rgb(30,39,44)" : "rgb(25,114,120)",
  },
  logo: {
    marginLeft: "2rem",
    backgroundColor: "#f2f2f2",
    height: "3rem",
    width: "3rem",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "1rem",
    color: "rgb(117,200,222)",
    "& a": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  navigation: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    listStyle: "none",
    margin: "0 2rem",
  },
  navigationLink: {
    textDecoration: "none",
    color: "#f2f2f2",
    margin: "0 2rem",
    fontFamily: "Roboto",
    "&:hover": {
      color: "rgb(117,200,222)",
    },
    fontSize: "1.2rem",
  },
  navigationItem: {},
  logoContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.3s",
    "& span": {
      fontSize: "1.5rem",
      color: "#f2f2f2",
    },
    "&:hover span": {
      color: "rgb(117,200,222)",
    },
    "&:hover div": {
      color: "#f2f2f2",
      backgroundColor: "rgb(117,200,222)",
    },
  },
};

function Navbar(props) {
  const { classes, isDarkMode } = props;

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
