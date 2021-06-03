import breakpoints from "./breakpoints";
import breakPoints from "./breakpoints";

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "10vh",
    backgroundColor: (props) =>
      props.isDarkMode ? "rgb(30,39,44)" : "rgb(25,114,120)",
    [breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "auto",
    },
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
    color: "rgb(117,200,222)",
    "& a": {
      textDecoration: "none",
      color: "inherit",
    },
    [breakpoints.down("sm")]: {
      marginTop: "1rem",
      marginLeft: 0,
    },
  },
  navigation: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    listStyle: "none",
    margin: "0 2rem",
    [breakpoints.down("md")]: {
      margin: "1rem 0",
    },
    [breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
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
  navigationItem: {
    [breakpoints.down("xs")]: {
      margin: "0.5rem 0",
    },
  },
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

export default styles;
