import { useState } from "react";

function useTimerFunction() {
  const [seconds, setSeconds] = useState(0);
  const isRunning = false;

  const timer = () => {
    setInterval(() => setSeconds((seconds) => seconds + 1), 1000);
  };

  const startTimer = () => {
    timer();
  };

  const pauseTimer = () => {};
}

export default useTimerFunction;
