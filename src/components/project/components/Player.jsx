import React, { useRef } from "react";
import TimerChallange from "./TimerChallange.tsx";

export default function Player() {
  const name = useRef();
  const [playerName, setPlayerName] = React.useState("");
  function handleSubmit() {
    setPlayerName(name.current.value);
  }
  return (
    <>
      <section id="player">
        <h2>Welcome {playerName ?? "Unknown entity"}</h2>
        <p>
          <input ref={name} type="text" />
          <button onClick={handleSubmit}>Set Name</button>
        </p>
      </section>
      <div id="challenges">
        <TimerChallange title="easy" targetTime={1}></TimerChallange>
        <TimerChallange title="normal" targetTime={5}></TimerChallange>
        <TimerChallange title="hard" targetTime={15}></TimerChallange>
        <TimerChallange title="pro" targetTime={30}></TimerChallange>
      </div>
    </>
  );
}
