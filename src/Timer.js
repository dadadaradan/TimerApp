import React, { useEffect, useState, useReducer } from "react";
import DetailedTimer from "./DetailedTimer";
import { withStyles } from "@material-ui/core";
import useToggleBoolean from "./hooks/useToggleBoolean";
import timerReducer from "./reducers/timerReducer";

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./styles/timerStyles";

function Timer(props) {
  const initialTimers = JSON.parse(window.localStorage.getItem("timers")) || [];
  const { classes, isDarkMode } = props;
  const [timers, dispatch] = useReducer(timerReducer, initialTimers);
  const [activeTimer, setActiveTimer] = useState({ id: "", index: "" });
  const [grandTotalTime, setGrandTotalTime] = useState(
    timers.reduce((acc, timer) => acc + timer.totalTimeInSec, 0)
  );
  const [isActive, toggleIsActive] = useToggleBoolean(false);

  useEffect(() => {
    setGrandTotalTime(
      timers.reduce((acc, timer) => acc + timer.totalTimeInSec, 0)
    );
    window.localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  const addNewTimerToArray = () => {
    dispatch({ type: "ADD_TIMER_TO_ARRAY" });
  };

  const pauseTimer = (timerID) => {
    dispatch({ type: "PAUSE_TIMERS" });
    toggleIsActive();
  };

  const deleteTimer = (timerID) => {
    if (activeTimer.id === timerID) setActiveTimer({ id: "", index: "" });
    dispatch({ type: "DELETE_TIMER", id: timerID });
  };

  const duplicateTimer = (timerID) => {
    dispatch({ type: "DUPLICATE_TIMER", id: timerID });
  };

  const deleteAllTimers = () => {
    dispatch({ type: "DELETE_ALL_TIMERS" });
    setActiveTimer({ id: "", index: "" });
  };

  const handleParentTimerStart = () => {
    if (!activeTimer.id) return;
    startTimer(activeTimer.id);
  };

  const updateTimerTotalTimeInSec = (timerID, time) => {
    dispatch({ type: "UPDATE_TIME_IN_TIMERS", id: timerID, payload: time });
  };

  const startTimer = (timerID) => {
    dispatch({ type: "START_TIMER", id: timerID });
    let activeTimerIndex = timers.findIndex((timer) => timer.id === timerID);
    setActiveTimer({ id: timerID, index: activeTimerIndex });
  };

  const playPauseBtn = isActive ? (
    <IconButton
      className={classes.playButton}
      size="small"
      onClick={() => pauseTimer(activeTimer.id)}
    >
      <PauseIcon />
    </IconButton>
  ) : (
    <IconButton
      className={classes.playButton}
      size="small"
      onClick={handleParentTimerStart}
    >
      <PlayArrowIcon />
    </IconButton>
  );

  return (
    <div>
      <div className={classes.mainHeadingContainer}>
        <div className={classes.btnContainer}>
          <IconButton
            className={classes.addButton}
            size="small"
            onClick={addNewTimerToArray}
          >
            <AddIcon />
          </IconButton>
          {playPauseBtn}
          <IconButton
            className={classes.closeButton}
            size="small"
            onClick={deleteAllTimers}
          >
            <CloseIcon />
          </IconButton>
          <span className={classes.closeButtonMessage}>
            Click Will Delete All
          </span>
        </div>
        <div className={classes.mainTimerContainer}>
          <span>
            {String(Math.trunc(grandTotalTime / 3600)).padStart(2, 0)}
          </span>{" "}
          :{" "}
          <span>
            {String(Math.trunc((grandTotalTime % 3600) / 60)).padStart(2, 0)}
          </span>{" "}
          :{" "}
          <span>
            {String(Math.trunc((grandTotalTime % 3600) % 60)).padStart(2, 0)}
          </span>
        </div>
      </div>
      <div className={classes.container}>
        {timers.map((timer) => {
          return (
            <DetailedTimer
              key={timer.id}
              {...timer}
              deleteTimer={deleteTimer}
              startTimer={startTimer}
              duplicateTimer={duplicateTimer}
              pauseTimer={pauseTimer}
              isDarkMode={isDarkMode}
              updateTimerTotalTimeInSec={updateTimerTotalTimeInSec}
              dispatch={dispatch}
            />
          );
        })}
      </div>
    </div>
  );
}

export default withStyles(styles)(Timer);
