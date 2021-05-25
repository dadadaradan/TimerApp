const styles = {
  root: {
    "@global": {
      ".MuiSvgIcon-root": {
        transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity .3s",
      },
    },
    boxSizing: "border-box",
    display: "inline-block",
    backgroundColor: "white",
    width: "370px",
    marginLeft: "1rem",
    marginTop: "1rem",
    borderRadius: "5px",
    overflow: "hidden",
  },
  display: {
    height: "53px",
    backgroundColor: (props) => (props.isDarkMode ? "#1E272C" : "#197278"),
    padding: "0 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnPlay: {
    color: "rgb(242,242,242)",
    backgroundColor: "rgb(40,61,59)",
    "&:hover": {
      backgroundColor: "rgb(20,30,29)",
    },
    "& svg": {
      fontSize: "30px",
    },
  },
  btnGeneric: {
    color: "rgb(242,242,242)",
    "&:hover": {
      backgroundColor: "rgb(40,61,59)",
    },
    "& svg": {
      fontSize: "30px",
    },
  },
  timerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    color: "rgb(242,242,242)",
    "&:hover div svg": {
      visibility: "visible",
      opacity: "0.5",
    },
  },
  closeButton: {
    backgroundColor: "rgb(119,46,37)",
    color: "rgb(251,251,240)",
    // margin: "0.5rem",

    "&:hover": {
      backgroundColor: "rgb(80,31,25)",
    },
    "& svg": {
      fontSize: "30px",
    },
  },
  copyButton: {
    backgroundColor: "rgb(119,46,37)",
    color: "rgb(251,251,240)",
    // margin: "0.5rem",

    "&:hover": {
      backgroundColor: "rgb(80,31,25)",
    },
    "& svg": {
      fontSize: "20px",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: (props) => (props.isDarkMode ? "rgb(64,85,94)" : ""),
  },
  unitContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& span": {
      margin: "-0.5rem 0",
    },
    "& span::after": {
      content: ":",
      position: "relative",
    },
  },
  arrowButtons: {
    opacity: 0,
    visibility: "hidden",
    cursor: "pointer",
    transition: "all .3s",
    "&:hover": {
      opacity: "1 !important",
    },
  },
  textInput: {
    padding: "0.3rem 1rem",
    color: (props) => props.isDarkMode && "#f2f2f2",
  },
};

export default styles;
