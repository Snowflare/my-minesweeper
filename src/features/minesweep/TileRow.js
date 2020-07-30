import React from "react";
import Tile from "../minesweep/Tile";

const TileRow = ({ tiles, y }) => (
  <div className="tile-row">
    {tiles.map((tile, index) => (
      <Tile key={index} value={tile.value} x={index} y={y} state={tile.state} />
    ))}
  </div>
);

export default TileRow;
