webgazer.showPredictionPoints(true);
webgazer.setRegression("ridge");

const getEmpty = () => {
  const empty = document.createElement("div");
  empty.classList.add("emptyCell");

  return empty;
};

const initialiseGame = () => {
  const gameElement = document.querySelector(".game");
  if (gameElement) {
    document.querySelector(".container").removeChild(gameElement);
  }
  window.score = 0;

  window.grid = [];

  window.mouseOverElement = null;
  window.overlapping = { isOverlapping: false, element: null };

  for (let i = 0; i < 4; i++) {
    window.grid[i] = [];
    for (let j = 0; j < 4; j++) {
      window.grid[i][j] = "";
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

      column.onmouseover = ({ target }) => {
        if (target === window.mouseOverElement) {
          return;
        }
        window.mouseOverElement = target;
      };

      const empty = getEmpty();

      column.appendChild(empty);
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

  const scoreElement = document.createElement("div");
  scoreElement.classList.add("score");
  scoreElement.innerHTML = `Score: ${window.score}`;
  game.appendChild(scoreElement);

  window.intervalId = window.setInterval(() => {
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

const removeButton = () => {
  const button = document.querySelector(".gameButton");
  parent = button.parentNode;
  parent.removeChild(button);
  parent.appendChild(getEmpty());
};

const getButton = element => {
  if (document.querySelector(".gameButton")) {
    return;
  }
  const gridElements = document.querySelectorAll(".gridElement");

  const button = document.createElement("button");
  button.classList.add("gameButton");
  button.classList.add("btn");
  button.classList.add("btn-warning");
  button.style.width = "100%";
  button.style.height = "100%";
  button.innerHTML = "Click Me!";

  button.onclick = ({ target }) => {
    if (
      target.parentNode === window.eyetrackingElement &&
      target === window.mouseOverElement
    ) {
      window.score += 1;
      document.querySelector(".score").innerHTML = `Score: ${window.score}`;
      removeButton();
    }
  };

  gridElements[element].removeChild(
    gridElements[element].querySelector(".emptyCell")
  );
  gridElements[element].appendChild(button);

  window.setTimeout(removeButton, Math.round(Math.random() * 3000 + 1000));
};

function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

const isOverlapping = data => {
  const elements = document.querySelectorAll(".gridElement");
  elements.forEach(element => {
    let bounds;
    bounds = element.getBoundingClientRect();
    if (
      data.x >= bounds.left &&
      data.x <= bounds.right &&
      data.y >= bounds.top &&
      data.y <= bounds.bottom
    ) {
      window.eyetrackingElement = element;
    }
  });
};

ready(() => {
  let gameStart = false;
  webgazer
    .setGazeListener(function(data, elapsedTime) {
      if (data == null) {
        return;
      }
      if (gameStart) {
        isOverlapping(data);
        const element = Math.round(Math.random() * 15);
        getButton(element);
        if (window.timeLeft <= 0) {
          gameStart = false;
          window.clearInterval(window.intervalId);
        }
      }
    })
    .begin();
  document.getElementById("start").onclick = function(e) {
    gameStart = true;
    document.querySelector(".instructions").hidden = true;
    document.querySelectorAll(".calDot").forEach(dot => (dot.hidden = true));
    initialiseGame();
  };
});
