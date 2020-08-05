const initialiseGame = () => {
  let grid = [];

  for (let i = 0; i < 8; i++) {
    grid[i] = [];
    for (let j = 0; j < 8; j++) {
      grid[i][j] = j + 1;
    }
  }

  const game = document.createElement("div");
  game.class = "game";
  document.querySelector(".game").appendChild(game);
};
