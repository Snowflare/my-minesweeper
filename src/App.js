import React from "react";
import "./App.css";
import { Minesweep } from "./features/minesweep/Minesweep";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Minesweep />
      </header>
    </div>
  );
}

export default App;
