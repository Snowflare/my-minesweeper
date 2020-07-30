import React from "react";
import TileRow from "../minesweep/TileRow";

const TileGrid = ({ tileRows }) => {
  ////////
  // let count = 0;
  // tileRows.forEach((element) => {
  //   element.forEach((e) => {
  //     if (e.value < 0) count++; //console.log(e.value);
  //   });
  // });
  // console.log("Mine count:", count);
  ///
  ///
  return (
    <div className="tile-grid">
      {tileRows.map((tileRow, index) => (
        <TileRow key={index} tiles={tileRow} y={index} />
      ))}
    </div>
  );
};

export default TileGrid;
