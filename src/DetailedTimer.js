import React from "react";
import useToggleBoolean from "./hooks/useToggleBoolean";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import { SvgIcon, withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import CloseIcon from "@material-ui/icons/Close";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import styles from "./styles/detailedTimerStyles";

function DetailedTimer(props) {
  const [isBtnMoreClicked, toggleIsBtnMoreClicked] = useToggleBoolean(false);
  const {
    classes,
    id,
    totalTimeInSec,
    isRunning,
    deleteTimer,
    duplicateTimer,
    startTimer,
    pauseTimer,
    adjustTimeReducer,
  } = props;

  const handleDeleteTimer = () => {
    deleteTimer(id);
  };

  const handleDuplicateTimer = () => {
    toggleIsBtnMoreClicked();
    duplicateTimer(id);
  };

  const handleStartTimer = () => {
    startTimer(id);
  };

  const handlePauseTimer = () => {
    pauseTimer(id);
  };

  const handleReset = () => {
    toggleIsBtnMoreClicked();
    adjustTimeReducer({ type: "reset", id });
  };

  const actionBtn = !isRunning ? (
    <IconButton
      className={classes.btnPlay}
      size="small"
      onClick={handleStartTimer}
    >
      <PlayArrowIcon size="large" />
    </IconButton>
  ) : (
    <IconButton
      className={classes.btnPlay}
      size="small"
      onClick={handlePauseTimer}
    >
      <PauseIcon size="large" />
    </IconButton>
  );

  const displayMarkup = isBtnMoreClicked ? (
    <div className={classes.display}>
      <IconButton
        size="small"
        className={classes.closeButton}
        onClick={handleDeleteTimer}
      >
        <CloseIcon />
      </IconButton>
      <IconButton
        size="small"
        className={classes.btnGeneric}
        onClick={handleDuplicateTimer}
      >
        <FileCopyIcon />
      </IconButton>
      <IconButton
        size="small"
        className={classes.btnGeneric}
        onClick={handleReset}
      >
        <RotateLeftIcon />
      </IconButton>
      <IconButton
        size="small"
        className={classes.btnGeneric}
        onClick={toggleIsBtnMoreClicked}
      >
        <ArrowBackIcon />
      </IconButton>
    </div>
  ) : (
    <div
      className={classes.display}
      style={{ backgroundColor: isRunning && "rgb(196,69,54)" }}
    >
      {actionBtn}
      <div className={classes.timerContainer}>
        <div className={classes.unitContainer}>
          <SvgIcon
            className={classes.arrowButtons}
            fontSize="small"
            viewBox="0 0 20 20"
            onClick={() => adjustTimeReducer({ type: "addHour", id: id })}
          >
            <path d="M15 14h-10l5-9 5 9z" />
          </SvgIcon>
          <span>
            {String(Math.trunc(totalTimeInSec / 3600)).padStart(2, 0)}
          </span>{" "}
          <SvgIcon
            className={classes.arrowButtons}
            fontSize="small"
            viewBox="0 0 20 20"
            onClick={() => adjustTimeReducer({ type: "extractHour", id: id })}
          >
            <path d="M5 6h10l-5 9-5-9z" />
          </SvgIcon>
        </div>
        <span>:</span>
        <div className={classes.unitContainer}>
          <SvgIcon
            className={classes.arrowButtons}
            fontSize="small"
            viewBox="0 0 20 20"
            onClick={() => adjustTimeReducer({ type: "addMinute", id: id })}
          >
            <path d="M15 14h-10l5-9 5 9z" />
          </SvgIcon>
          <span>
            {String(Math.trunc((totalTimeInSec % 3600) / 60)).padStart(2, 0)}
          </span>{" "}
          <SvgIcon
            className={classes.arrowButtons}
            fontSize="small"
            viewBox="0 0 20 20"
            onClick={() => adjustTimeReducer({ type: "extractMinute", id: id })}
          >
            <path d="M5 6h10l-5 9-5-9z" />
          </SvgIcon>
        </div>
        <span>:</span>
        <div className={classes.unitContainer}>
          <span>
            {String(Math.trunc((totalTimeInSec % 3600) % 60)).padStart(2, 0)}
          </span>{" "}
        </div>
      </div>
      <IconButton
        className={classes.btnGeneric}
        size="small"
        onClick={toggleIsBtnMoreClicked}
      >
        <MoreVertIcon size="large" />
      </IconButton>
    </div>
  );

  ////////////////////////////////////

  return (
    <div className={classes.root}>
      {displayMarkup}

      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          id="standard-basic"
          placeholder="Title"
          fullWidth
          className={classes.textInput}
        />
        <TextField
          id="standard-basic"
          multiline
          rows={6}
          fullWidth
          className={classes.textInput}
        />
      </form>
    </div>
  );
}

export default withStyles(styles)(DetailedTimer);
