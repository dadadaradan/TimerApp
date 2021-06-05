import { v4 as uuid } from "uuid";

const timerReducer = (state, action) => {
  //   console.log(`inside reducer`);
  const { type, payload, id } = action;
  switch (type) {
    case "ADD_TIMER_TO_ARRAY":
      return [
        ...state,
        {
          id: uuid(),
          totalTimeInSec: 0,
          isRunning: false,
          title: "",
          content: "",
        },
      ];
    case "PAUSE_TIMERS":
      return state.map((timer) => ({ ...timer, isRunning: false }));
    case "DELETE_TIMER":
      return state.filter((timer) => timer.id !== id);
    case "DELETE_ALL_TIMERS":
      return [];

    case "START_TIMER":
      return state.map((timer) =>
        timer.id === id
          ? { ...timer, isRunning: true }
          : { ...timer, isRunning: false }
      );

    case "UPDATE_TIME_IN_TIMERS":
      return state.map((timer) =>
        timer.id === id ? { ...timer, totalTimeInSec: payload } : timer
      );

    case "DUPLICATE_TIMER":
      const copyTimer = state.filter((timer) => {
        return timer.id === id;
      });
      const newTimer = {
        id: uuid(),
        isRunning: false,
        totalTimeInSec: copyTimer[0].totalTimeInSec,
        title: copyTimer[0].title,
        content: copyTimer[0].content,
      };
      return [...state, newTimer];

    case "ADD_MINUTE":
      return state.map((timer) => {
        return timer.id === id
          ? { ...timer, totalTimeInSec: timer.totalTimeInSec + 60 }
          : timer;
      });

    case "EXTRACT_MINUTE":
      return state.map((timer) => {
        if (timer.totalTimeInSec < 60) return timer;
        return timer.id === id
          ? { ...timer, totalTimeInSec: timer.totalTimeInSec - 60 }
          : timer;
      });
    case "ADD_HOUR":
      return state.map((timer) => {
        return timer.id === id
          ? { ...timer, totalTimeInSec: timer.totalTimeInSec + 3600 }
          : timer;
      });

    case "EXTRACT_HOUR":
      return state.map((timer) => {
        if (timer.totalTimeInSec <= 3600) return timer;
        return timer.id === id
          ? { ...timer, totalTimeInSec: timer.totalTimeInSec - 3600 }
          : timer;
      });
    case "UPDATE_TIMER_TEXT":
      return state.map((timer) =>
        timer.id === id
          ? {
              ...timer,
              title: payload.title,
              content: payload.content,
            }
          : timer
      );

    default:
      return state;
  }
};

export default timerReducer;
