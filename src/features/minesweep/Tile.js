import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  flag,
  unflag,
  click,
  selectGameOver,
} from "../minesweep/minesweepSlice";

const Tile = ({ value, state, x, y }) => {
  const dispatch = useDispatch();
  const gameover = useSelector(selectGameOver);

  return (
    <div className="tile-container">
      {value < 0 && state === "clicked" && (
        <button
          className="mine-tile"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span style={{ fontSize: "20px" }}>💣</span>
        </button>
      )}
      {state === "unclicked" && (
        <button
          className="tile"
          onClick={(e) => {
            e.preventDefault();
            if (!gameover) dispatch(click({ x, y, recursion: false }));
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            if (!gameover) dispatch(flag({ x, y }));
          }}
        ></button>
      )}
      {state === "clicked" && value === 0 && (
        <button
          className="empty-tile"
          onClick={(e) => {
            e.preventDefault();
          }}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        ></button>
      )}
      {state === "clicked" && value > 0 && (
        <button
          className="number-tile"
          onClick={(e) => {
            e.preventDefault();
          }}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          {value}
        </button>
      )}
      {state === "flag" && (
        <button
          className="tile"
          onContextMenu={(e) => {
            e.preventDefault();
            if (!gameover) dispatch(unflag({ x, y }));
          }}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span style={{ fontSize: "30px" }}>⚐</span>
        </button>
      )}
    </div>
  );
};

export default Tile;
