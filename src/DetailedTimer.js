import React, { useEffect, useState } from "react";
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
import { useTimer } from "use-timer";

function DetailedTimer(props) {
  const [isBtnMoreClicked, toggleIsBtnMoreClicked] = useToggleBoolean(false);
  const [valueControler, toggleValueControler] = useToggleBoolean(false);
  const {
    classes,
    id,
    title,
    content,
    totalTimeInSec,
    isRunning,
    deleteTimer,
    duplicateTimer,
    startTimer,
    pauseTimer,
    updateTimerTotalTimeInSec,
    dispatch,
  } = props;
  let initTimeValue = valueControler ? 0 : totalTimeInSec;
  const { time, start, pause, reset, status } = useTimer({
    initialTime: initTimeValue,
  });

  console.log(initTimeValue);

  const [input, setInput] = useState({ title, content });

  useEffect(() => {
    updateTimerTotalTimeInSec(id, time);
  }, [time]);

  const handleChange = (evt) => {
    setInput({ ...input, [evt.target.name]: evt.target.value });
    dispatch({ type: "UPDATE_TIMER_TEXT", id, payload: input });
  };

  const handleDeleteTimer = () => {
    deleteTimer(id);
  };

  const handleDuplicateTimer = () => {
    toggleIsBtnMoreClicked();
    duplicateTimer(id);
  };

  const handleStartTimer = () => {
    if (!valueControler) toggleValueControler();
    startTimer(id);
    start();
  };

  const handlePauseTimer = () => {
    pauseTimer(id);
  };

  const handleReset = () => {
    toggleIsBtnMoreClicked();
    reset();
    pauseTimer(id);
    updateTimerTotalTimeInSec(id, time);
  };

  !isRunning && status === "RUNNING" && pause();
  isRunning && status === "PAUSED" && start();

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
            onClick={() => dispatch({ type: "ADD_HOUR", id: id })}
          >
            <path d="M15 14h-10l5-9 5 9z" />
          </SvgIcon>
          <span>{String(Math.trunc(time / 3600)).padStart(2, 0)}</span>{" "}
          <SvgIcon
            className={classes.arrowButtons}
            fontSize="small"
            viewBox="0 0 20 20"
            onClick={() => dispatch({ type: "EXTRACT_HOUR", id: id })}
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
            onClick={() => dispatch({ type: "ADD_MINUTE", id: id })}
          >
            <path d="M15 14h-10l5-9 5 9z" />
          </SvgIcon>
          <span>{String(Math.trunc((time % 3600) / 60)).padStart(2, 0)}</span>{" "}
          <SvgIcon
            className={classes.arrowButtons}
            fontSize="small"
            viewBox="0 0 20 20"
            onClick={() => dispatch({ type: "EXTRACT_MINUTE", id: id })}
          >
            <path d="M5 6h10l-5 9-5-9z" />
          </SvgIcon>
        </div>
        <span>:</span>
        <div className={classes.unitContainer}>
          <span>{String(Math.trunc((time % 3600) % 60)).padStart(2, 0)}</span>{" "}
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
          name="title"
          id="standard-basic"
          placeholder="Title"
          fullWidth
          className={classes.textInput}
          value={input.title}
          onChange={handleChange}
        />
        <TextField
          name="content"
          id="standard-basic"
          multiline
          rows={6}
          fullWidth
          className={classes.textInput}
          value={input.content}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

const areEqual = (oldProps, curProps) => {
  return JSON.stringify(oldProps) === JSON.stringify(curProps);
};

export default React.memo(withStyles(styles)(DetailedTimer), areEqual);
