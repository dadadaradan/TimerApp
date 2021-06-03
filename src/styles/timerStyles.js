import breakpoints from "./breakpoints";

const styles = {
  addButton: {
    backgroundColor: "rgb(25,114,120)",
    color: "rgb(251,251,240)",
    margin: "0.5rem",
    "&:hover": {
      backgroundColor: "rgb(16,74,78)",
    },
    "& svg": {
      fontSize: "40px",
    },
  },
  playButton: {
    backgroundColor: "rgb(40,61,59)",
    color: "rgb(251,251,240)",
    margin: "0.5rem",

    "&:hover": {
      backgroundColor: "rgb(20,30,29)",
    },
    "& svg": {
      fontSize: "40px",
    },
  },
  closeButton: {
    backgroundColor: "rgb(119,46,37)",
    color: "rgb(251,251,240)",
    margin: "0.5rem",

    "&:hover": {
      backgroundColor: "rgb(80,31,25)",
    },
    "& svg": {
      fontSize: "40px",
    },

    "&:hover + span": {
      opacity: 1,
      visibility: "visible",
    },
  },
  mainHeadingContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "3rem",
    "& span": {
      fontWeight: 100,
    },
    [breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      justifyContent: "center",
      alignItems: "center",
      margin: "1.5rem 0",
    },
  },
  btnContainer: {
    [breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  mainTimerContainer: {
    fontSize: "3rem",
    fontWeight: 100,
    color: (props) => (props.isDarkMode ? "#f2f2f2" : "#333"),
  },
  closeButtonMessage: {
    opacity: 0,
    visibility: "hidden",
    [breakpoints.down("sm")]: {
      display: "none",
    },
  },
};

export default styles;
