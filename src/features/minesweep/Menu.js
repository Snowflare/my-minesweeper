import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  initMine,
  selectGameOver,
  selectFlags,
  selectTimer,
  setTimer,
  selectGameId,
  selectBoard,
  restart,
  setGameOver,
} from "./minesweepSlice";

export function Menu() {
  const dispatch = useDispatch();

  const gameId = useSelector(selectGameId);
  const gameover = useSelector(selectGameOver);
  const timer = useSelector(selectTimer);
  const board = useSelector(selectBoard);
  let flags = useSelector(selectFlags);

  // start timer
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, [gameId]);

  // check if all the mines are flagged
  if (flags === 0) {
    let remaining = 0;
    board.forEach((tileRow) => {
      remaining += tileRow.filter((tile) => {
        return tile.state === "unclicked" && tile.value < 0;
      }).length;
    });
    if (remaining === 0) {
      flags = "You win!";
      dispatch(setGameOver());
    }
  }

  // stop timer when gameover
  if (gameover) {
    for (var i = 1; i < 99999; i++) window.clearInterval(i);
  }

  return (
    <div className="menu">
      <div className="flag-counter">
        <span className="menu-flag">⚐</span>
        <h3>{flags}</h3>
      </div>
      <div className="timer">
        <img src="timer.png"></img>
        <h3 className="timer-value">{timer}</h3>
      </div>
      <span
        className="restart"
        onClick={(e) => {
          dispatch(restart());
          dispatch(initMine());
        }}
      >
        ↺ Restart
      </span>
    </div>
  );
}

export default Menu;
