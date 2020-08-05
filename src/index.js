webgazer.showPredictionPoints(true);
webgazer.setRegression("ridge");

const initialiseGame = () => {
  window.score = 0;

  window.grid = [];

  for (let i = 0; i < 4; i++) {
    window.grid[i] = [];
    for (let j = 0; j < 4; j++) {
      window.grid[i][j] = j + 1;
    }
  }

  const game = document.createElement("div");
  game.classList.add("game");

  window.grid.forEach(element => {
    const row = document.createElement("div");
    row.classList.add("row");
    element.forEach(item => {
      const column = document.createElement("div");
      column.classList.add("col");
      column.classList.add("gridElement");
      column.innerHTML = item;
      row.appendChild(column);
    });

    game.appendChild(row);
  });
  document.querySelector(".container").appendChild(game);

  window.timeLeft = 30000;

  const timerElement = document.createElement("div");
  timerElement.classList += "timer";
  timerElement.innerHTML = `Time Remaining: ${window.timeLeft / 1000}`;
  game.appendChild(timerElement);

  window.setInterval(() => {
    window.timeLeft -= 1000;
    timerElement.innerHTML = `Time Remaining: ${window.timeLeft / 1000}`;
  }, 1000);
};

const dots = [];
function drawDot(x, y, color = "blue", r = "10px") {
  const dot = document.createElement("div");
  dot.classList.add("calDot");
  dot.style.position = "absolute";
  dot.style.width = r;
  dot.style.height = r;
  dot.style.zIndex = "999999";
  dot.style.borderRadius = "500px";
  dot.style.backgroundColor = color;
  dot.style.left = x;
  dot.style.top = y;
  document.querySelector(".instructions").appendChild(dot);
}

// drawing calibration dots
const calDot = (x, y) => drawDot(x, y, "red", "20px");

calDot("50%", "0px");
calDot("95%", "0px");
calDot("95%", "50%");
calDot("95%", "95%");
calDot("50%", "95%");
calDot("1%", "95%");
calDot("1%", "50%");
calDot("1%", "0px");
calDot("50%", "50%");

const handleButtonClick = ({ target }) => {
  window.score += 1;
  target.parentNode.removeChile(target);
};

const getButton = () => {
  return "<button class=`btn btn-success` onclick='handleButtonClick'>Click Me!</button>";
};

function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(() => {
  let start = false;
  webgazer
    .setGazeListener(function(data, elapsedTime) {
      if (data == null) {
        return;
      }
      if (start) {
        const element = {
          x: Math.round(Math.random() * 3),
          y: Math.round(Math.random() * 3)
        };
        window.grid[element.x][element.y].innerHTML = getButton();
        console.log("placing button!", element);
      }
    })
    .begin();
  document.getElementById("start").onclick = function(e) {
    start = true;
    document.querySelector(".instructions").hidden = true;
    document.querySelectorAll(".calDot").forEach(dot => (dot.hidden = true));
    initialiseGame();
  };
});
