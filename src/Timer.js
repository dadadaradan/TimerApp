import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import DetailedTimer from "./DetailedTimer";
import { withStyles } from "@material-ui/core";
import useToggleBoolean from "./hooks/useToggleBoolean";

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./styles/timerStyles";

function Timer(props) {
  const initialTimers = JSON.parse(window.localStorage.getItem("timers")) || [];
  const initialActiveTimers = JSON.parse(
    window.localStorage.getItem("activeTimer")
  ) || { id: "", index: "" };

  const { classes, isDarkMode } = props;
  const [timers, setTimers] = useState(initialTimers);
  const [activeTimer, setActiveTimer] = useState(initialActiveTimers);
  const [grandTotalTime, setGrandTotalTime] = useState(() => {
    const initialState = timers.reduce(
      (acc, timer) => acc + timer.totalTimeInSec,
      0
    );
    return initialState;
  });
  const [isActive, toggleIsActive] = useToggleBoolean(false);

  useEffect(() => {
    window.localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  useEffect(() => {
    window.localStorage.setItem("activeTimer", JSON.stringify(activeTimer));
  }, [activeTimer]);

  useEffect(() => {
    let interval = null;
    setGrandTotalTime(
      timers.reduce((acc, timer) => acc + timer.totalTimeInSec, 0)
    );
    if (timers.some((timer) => timer.isRunning === true)) {
      interval = setInterval(() => {
        const newTimer = {
          id: timers[activeTimer.index].id,
          isRunning: timers[activeTimer.index].isRunning,
          totalTimeInSec: timers[activeTimer.index].totalTimeInSec + 1,
          title: timers[activeTimer.index].title,
          content: timers[activeTimer.index].content,
        };

        const TimersCopy = timers;
        TimersCopy[activeTimer.index] = newTimer;
        setTimers(TimersCopy);
        setGrandTotalTime(
          timers.reduce((acc, timer) => acc + timer.totalTimeInSec, 0)
        );
      }, 1000);
    } else if (!isActive && grandTotalTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, grandTotalTime, timers, activeTimer]);

  const addNewTimerToArray = () => {
    setTimers([
      ...timers,
      {
        id: uuid(),
        totalTimeInSec: 0,
        isRunning: false,
        title: "",
        content: "",
      },
    ]);
  };

  const updateTimerText = (timerID, contentObject) => {
    const { title, content } = contentObject;
    setTimers(
      timers.map((timer) => {
        return timer.id === timerID ? { ...timer, title, content } : timer;
      })
    );
  };

  const startTimer = (timerID) => {
    const activeTimerIndex = timers.findIndex((timer) => timer.id === timerID);
    setTimers(
      timers.map((timer) => {
        return timer.id === timerID
          ? { ...timer, isRunning: true }
          : { ...timer, isRunning: false };
      })
    );
    setActiveTimer({ id: timerID, index: activeTimerIndex });
    if (!isActive) toggleIsActive();
  };

  const pauseTimer = (timerID) => {
    setTimers(
      timers.map((timer) => {
        return timer.id === timerID ? { ...timer, isRunning: false } : timer;
      })
    );
    toggleIsActive();
  };

  const deleteTimer = (timerID) => {
    if (activeTimer.id === timerID) {
      pauseTimer(timerID);
      setActiveTimer({ id: "", index: "" });
    }
    setTimers(
      timers.filter((timer) => {
        return timer.id !== timerID;
      })
    );
  };

  const duplicateTimer = (timerID) => {
    const copyTimer = timers.filter((timer) => {
      return timer.id === timerID;
    });

    const newTimer = {
      id: uuid(),
      isRunning: false,
      totalTimeInSec: copyTimer[0].totalTimeInSec,
      title: copyTimer[0].title,
      content: copyTimer[0].content,
    };

    setTimers([...timers, newTimer]);
  };

  const deleteAllTimers = () => {
    setTimers([]);
    setActiveTimer({ id: "", index: "" });
  };

  const handleParentTimerStart = () => {
    if (!activeTimer.id) return;
    startTimer(activeTimer.id);
  };

  function adjustTimeReducer(action) {
    switch (action.type) {
      case "addMinute":
        return setTimers(
          timers.map((timer) => {
            return timer.id === action.id
              ? { ...timer, totalTimeInSec: timer.totalTimeInSec + 60 }
              : timer;
          })
        );

      case "extractMinute":
        return setTimers(
          timers.map((timer) => {
            if (timer.totalTimeInSec < 60) return timer;
            return timer.id === action.id
              ? { ...timer, totalTimeInSec: timer.totalTimeInSec - 60 }
              : timer;
          })
        );

      case "addHour":
        return setTimers(
          timers.map((timer) => {
            return timer.id === action.id
              ? { ...timer, totalTimeInSec: timer.totalTimeInSec + 3600 }
              : timer;
          })
        );
      case "extractHour":
        return setTimers(
          timers.map((timer) => {
            if (timer.totalTimeInSec <= 0) return timer;
            return timer.id === action.id
              ? { ...timer, totalTimeInSec: timer.totalTimeInSec - 3600 }
              : timer;
          })
        );
      case "reset":
        return setTimers(
          timers.map((timer) => {
            return timer.id === action.id
              ? { ...timer, totalTimeInSec: 0 }
              : timer;
          })
        );
      default:
        return;
    }
  }

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
              adjustTimeReducer={adjustTimeReducer}
              isDarkMode={isDarkMode}
              updateTimerText={updateTimerText}
            />
          );
        })}
      </div>
    </div>
  );
}

export default withStyles(styles)(Timer);
