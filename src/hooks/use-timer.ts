import { useEffect, useState } from "react";

const useTimer = (seconds: number) => {
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    var minutes = Math.floor(secondsLeft / 60);
    var seconds = secondsLeft % 60;
    return (
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds
    );
  };
  return { formatTime, secondsLeft };
};

export default useTimer;
