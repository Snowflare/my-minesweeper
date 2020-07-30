import { configureStore } from "@reduxjs/toolkit";
import minesweepReducer from "../features/minesweep/minesweepSlice";

export default configureStore({
  reducer: {
    minesweep: minesweepReducer,
  },
});
