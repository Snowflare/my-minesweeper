import { createSlice } from "@reduxjs/toolkit";

export const minesweepSlice = createSlice({
  name: "minesweep",
  initialState: {
    board: new Array(16)
      .fill(null)
      .map((item) => new Array(16).fill({ value: 0, state: "unclicked" })),
    // mine = -20, empty = 0
    gameId: 1,
    flags: 40,
    gameover: false,
    timer: 0,
  },
  reducers: {
    setGameOver: (state) => {
      state.gameover = true;
    },
    setTimer: (state) => {
      state.timer++;
    },
    restart: (state) => {
      state.board = new Array(16)
        .fill(null)
        .map((item) => new Array(16).fill({ value: 0, state: "unclicked" }));
      state.timer = 0;
      state.gameover = false;
      state.gameId++;
      state.flags = 40;
    },
    click: (state, action) => {
      let x = action.payload.x;
      let y = action.payload.y;
      if (state.board[y][x].value === 0) {
        state.board[y][x].state = "clicked";
        if (y + 1 <= 15) recursiveClick(x, y + 1, state.board);
        if (y - 1 >= 0) recursiveClick(x, y - 1, state.board);
        if (x + 1 <= 15) recursiveClick(x + 1, y, state.board);
        if (x - 1 >= 0) recursiveClick(x - 1, y, state.board);
        if (y + 1 <= 15 && x + 1 <= 15)
          recursiveClick(x + 1, y + 1, state.board);
        if (y - 1 >= 0 && x - 1 >= 0) recursiveClick(x - 1, y - 1, state.board);
        if (y + 1 <= 15 && x - 1 >= 0)
          recursiveClick(x - 1, y + 1, state.board);
        if (y - 1 >= 0 && x + 1 <= 15)
          recursiveClick(x + 1, y - 1, state.board);
      } else {
        if (state.board[y][x].value < 0) state.gameover = true;
        state.board[y][x].state = "clicked";
      }
    },
    flag: (state, action) => {
      state.flags--;
      state.board[action.payload.y][action.payload.x].state = "flag";
    },
    unflag: (state, action) => {
      state.flags++;
      state.board[action.payload.y][action.payload.x].state = "unclicked";
    },
    initMine: (state) => {
      for (let i = 0; i < 40; i++) {
        // generate mine coordinate
        let x = Math.floor(Math.random() * 16);
        let y = Math.floor(Math.random() * 16);
        // if the coordinate has a mine then generate a new coordinate
        while (state.board[y][x].value < 0) {
          x = Math.floor(Math.random() * 16);
          y = Math.floor(Math.random() * 16);
        }

        // set this tile to be mine
        state.board[y][x].value = -20;

        // increase count of surrounding tiles by 1

        if (y + 1 <= 15) state.board[y + 1][x].value += 1;
        if (y - 1 >= 0) state.board[y - 1][x].value += 1;
        if (x + 1 <= 15) state.board[y][x + 1].value += 1;
        if (x - 1 >= 0) state.board[y][x - 1].value += 1;
        if (y + 1 <= 15 && x + 1 <= 15) state.board[y + 1][x + 1].value += 1;
        if (y - 1 >= 0 && x - 1 >= 0) state.board[y - 1][x - 1].value += 1;
        if (y + 1 <= 15 && x - 1 >= 0) state.board[y + 1][x - 1].value += 1;
        if (y - 1 >= 0 && x + 1 <= 15) state.board[y - 1][x + 1].value += 1;
      }
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  initMine,
  setGameOver,
  setTimer,
  flag,
  unflag,
  click,
  restart,
} = minesweepSlice.actions;

function recursiveClick(x, y, board) {
  if (board[y][x].state === "unclicked") {
    if (board[y][x].value > 0) {
      board[y][x].state = "clicked";
    } else if (board[y][x].value === 0) {
      board[y][x].state = "clicked";
      if (y + 1 <= 15) recursiveClick(x, y + 1, board);
      if (y - 1 >= 0) recursiveClick(x, y - 1, board);
      if (x + 1 <= 15) recursiveClick(x + 1, y, board);
      if (x - 1 >= 0) recursiveClick(x - 1, y, board);
      if (y + 1 <= 15 && x + 1 <= 15) recursiveClick(x + 1, y + 1, board);
      if (y - 1 >= 0 && x - 1 >= 0) recursiveClick(x - 1, y - 1, board);
      if (y + 1 <= 15 && x - 1 >= 0) recursiveClick(x - 1, y + 1, board);
      if (y - 1 >= 0 && x + 1 <= 15) recursiveClick(x + 1, y - 1, board);
    }
  }
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectBoard = (state) => state.minesweep.board;
export const selectGameOver = (state) => state.minesweep.gameover;
export const selectFlags = (state) => state.minesweep.flags;
export const selectTimer = (state) => state.minesweep.timer;
export const selectGameId = (state) => state.minesweep.gameId;
// export const selectState = (state) => state.minesweep.state;

export default minesweepSlice.reducer;
