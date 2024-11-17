import React, { useState, useRef } from "react";
import ResultModal, { ResultModalRef } from "./ResultModal.tsx";

interface ChallengeProps {
  title: string;
  targetTime: number;
}

function TimerChallenge({ title, targetTime }: ChallengeProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(targetTime * 1000);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const timer = useRef<number | null>(null);
  const dialog = useRef<ResultModalRef>(null);

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining <= 0) {
          clearInterval(timer.current!);
          setTimerIsActive(false);
          dialog.current?.open();
          return 0;
        }
        return prevTimeRemaining - 10;
      });
    }, 10);

    setTimerIsActive(true);
  }

  function handleStop() {
    clearInterval(timer.current!);
    setTimerIsActive(false);
    dialog.current?.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}

export default TimerChallenge;