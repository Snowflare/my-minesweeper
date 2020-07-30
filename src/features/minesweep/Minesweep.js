import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBoard, initMine } from "./minesweepSlice";
import TileGrid from "./TileGrid";
import Menu from "./Menu";
import "./Minesweep.css";

export function Minesweep() {
  const dispatch = useDispatch();

  const board = useSelector(selectBoard);
  useEffect(() => {
    dispatch(initMine());
  }, []);

  return (
    <div>
      <Menu />
      <TileGrid tileRows={board} />
    </div>
  );
}
