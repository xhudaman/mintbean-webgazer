/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHdCQUF3Qjs7QUFFeEIsaUJBQWlCLE9BQU87QUFDeEI7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCQUE2QixTQUFTO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDhDQUE4Qyx1QkFBdUI7QUFDckU7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQyxhQUFhO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsdUJBQXVCO0FBQ3ZFLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsYUFBYTtBQUMxRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwid2ViZ2F6ZXIuc2hvd1ByZWRpY3Rpb25Qb2ludHModHJ1ZSk7XG53ZWJnYXplci5zZXRSZWdyZXNzaW9uKFwicmlkZ2VcIik7XG5cbmNvbnN0IGdldEVtcHR5ID0gKCkgPT4ge1xuICBjb25zdCBlbXB0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGVtcHR5LmNsYXNzTGlzdC5hZGQoXCJlbXB0eUNlbGxcIik7XG5cbiAgcmV0dXJuIGVtcHR5O1xufTtcblxuY29uc3QgaW5pdGlhbGlzZUdhbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lXCIpO1xuICBpZiAoZ2FtZUVsZW1lbnQpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKS5yZW1vdmVDaGlsZChnYW1lRWxlbWVudCk7XG4gIH1cbiAgd2luZG93LnNjb3JlID0gMDtcblxuICB3aW5kb3cuZ3JpZCA9IFtdO1xuXG4gIHdpbmRvdy5tb3VzZU92ZXJFbGVtZW50ID0gbnVsbDtcbiAgd2luZG93Lm92ZXJsYXBwaW5nID0geyBpc092ZXJsYXBwaW5nOiBmYWxzZSwgZWxlbWVudDogbnVsbCB9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgd2luZG93LmdyaWRbaV0gPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDQ7IGorKykge1xuICAgICAgd2luZG93LmdyaWRbaV1bal0gPSBcIlwiO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGdhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lLmNsYXNzTGlzdC5hZGQoXCJnYW1lXCIpO1xuXG4gIHdpbmRvdy5ncmlkLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICBlbGVtZW50LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCBjb2x1bW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoXCJjb2xcIik7XG4gICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZChcImdyaWRFbGVtZW50XCIpO1xuICAgICAgY29sdW1uLmlubmVySFRNTCA9IGl0ZW07XG5cbiAgICAgIGNvbHVtbi5vbm1vdXNlb3ZlciA9ICh7IHRhcmdldCB9KSA9PiB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IHdpbmRvdy5tb3VzZU92ZXJFbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5tb3VzZU92ZXJFbGVtZW50ID0gdGFyZ2V0O1xuICAgICAgfTtcblxuICAgICAgY29uc3QgZW1wdHkgPSBnZXRFbXB0eSgpO1xuXG4gICAgICBjb2x1bW4uYXBwZW5kQ2hpbGQoZW1wdHkpO1xuICAgICAgcm93LmFwcGVuZENoaWxkKGNvbHVtbik7XG4gICAgfSk7XG5cbiAgICBnYW1lLmFwcGVuZENoaWxkKHJvdyk7XG4gIH0pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKS5hcHBlbmRDaGlsZChnYW1lKTtcblxuICB3aW5kb3cudGltZUxlZnQgPSAzMDAwMDtcblxuICBjb25zdCB0aW1lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0aW1lckVsZW1lbnQuY2xhc3NMaXN0ICs9IFwidGltZXJcIjtcbiAgdGltZXJFbGVtZW50LmlubmVySFRNTCA9IGBUaW1lIFJlbWFpbmluZzogJHt3aW5kb3cudGltZUxlZnQgLyAxMDAwfWA7XG4gIGdhbWUuYXBwZW5kQ2hpbGQodGltZXJFbGVtZW50KTtcblxuICBjb25zdCBzY29yZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzY29yZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNjb3JlXCIpO1xuICBzY29yZUVsZW1lbnQuaW5uZXJIVE1MID0gYFNjb3JlOiAke3dpbmRvdy5zY29yZX1gO1xuICBnYW1lLmFwcGVuZENoaWxkKHNjb3JlRWxlbWVudCk7XG5cbiAgd2luZG93LmludGVydmFsSWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHdpbmRvdy50aW1lTGVmdCAtPSAxMDAwO1xuICAgIHRpbWVyRWxlbWVudC5pbm5lckhUTUwgPSBgVGltZSBSZW1haW5pbmc6ICR7d2luZG93LnRpbWVMZWZ0IC8gMTAwMH1gO1xuICB9LCAxMDAwKTtcbn07XG5cbmNvbnN0IGRvdHMgPSBbXTtcbmZ1bmN0aW9uIGRyYXdEb3QoeCwgeSwgY29sb3IgPSBcImJsdWVcIiwgciA9IFwiMTBweFwiKSB7XG4gIGNvbnN0IGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRvdC5jbGFzc0xpc3QuYWRkKFwiY2FsRG90XCIpO1xuICBkb3Quc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIGRvdC5zdHlsZS53aWR0aCA9IHI7XG4gIGRvdC5zdHlsZS5oZWlnaHQgPSByO1xuICBkb3Quc3R5bGUuekluZGV4ID0gXCI5OTk5OTlcIjtcbiAgZG90LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNTAwcHhcIjtcbiAgZG90LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICBkb3Quc3R5bGUubGVmdCA9IHg7XG4gIGRvdC5zdHlsZS50b3AgPSB5O1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKS5hcHBlbmRDaGlsZChkb3QpO1xufVxuXG4vLyBkcmF3aW5nIGNhbGlicmF0aW9uIGRvdHNcbmNvbnN0IGNhbERvdCA9ICh4LCB5KSA9PiBkcmF3RG90KHgsIHksIFwicmVkXCIsIFwiMjBweFwiKTtcblxuY2FsRG90KFwiNTAlXCIsIFwiMHB4XCIpO1xuY2FsRG90KFwiOTUlXCIsIFwiMHB4XCIpO1xuY2FsRG90KFwiOTUlXCIsIFwiNTAlXCIpO1xuY2FsRG90KFwiOTUlXCIsIFwiOTUlXCIpO1xuY2FsRG90KFwiNTAlXCIsIFwiOTUlXCIpO1xuY2FsRG90KFwiMSVcIiwgXCI5NSVcIik7XG5jYWxEb3QoXCIxJVwiLCBcIjUwJVwiKTtcbmNhbERvdChcIjElXCIsIFwiMHB4XCIpO1xuY2FsRG90KFwiNTAlXCIsIFwiNTAlXCIpO1xuXG5jb25zdCByZW1vdmVCdXR0b24gPSAoKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZUJ1dHRvblwiKTtcbiAgcGFyZW50ID0gYnV0dG9uLnBhcmVudE5vZGU7XG4gIHBhcmVudC5yZW1vdmVDaGlsZChidXR0b24pO1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQoZ2V0RW1wdHkoKSk7XG59O1xuXG5jb25zdCBnZXRCdXR0b24gPSBlbGVtZW50ID0+IHtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZUJ1dHRvblwiKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBncmlkRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWRFbGVtZW50XCIpO1xuXG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZ2FtZUJ1dHRvblwiKTtcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIik7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuLXdhcm5pbmdcIik7XG4gIGJ1dHRvbi5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICBidXR0b24uc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG4gIGJ1dHRvbi5pbm5lckhUTUwgPSBcIkNsaWNrIE1lIVwiO1xuXG4gIGJ1dHRvbi5vbmNsaWNrID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBpZiAoXG4gICAgICB0YXJnZXQucGFyZW50Tm9kZSA9PT0gd2luZG93LmV5ZXRyYWNraW5nRWxlbWVudCAmJlxuICAgICAgdGFyZ2V0ID09PSB3aW5kb3cubW91c2VPdmVyRWxlbWVudFxuICAgICkge1xuICAgICAgd2luZG93LnNjb3JlICs9IDE7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlXCIpLmlubmVySFRNTCA9IGBTY29yZTogJHt3aW5kb3cuc2NvcmV9YDtcbiAgICAgIHJlbW92ZUJ1dHRvbigpO1xuICAgIH1cbiAgfTtcblxuICBncmlkRWxlbWVudHNbZWxlbWVudF0ucmVtb3ZlQ2hpbGQoXG4gICAgZ3JpZEVsZW1lbnRzW2VsZW1lbnRdLnF1ZXJ5U2VsZWN0b3IoXCIuZW1wdHlDZWxsXCIpXG4gICk7XG4gIGdyaWRFbGVtZW50c1tlbGVtZW50XS5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gIHdpbmRvdy5zZXRUaW1lb3V0KHJlbW92ZUJ1dHRvbiwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMzAwMCArIDEwMDApKTtcbn07XG5cbmZ1bmN0aW9uIHJlYWR5KGZuKSB7XG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSB7XG4gICAgZm4oKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmbik7XG4gIH1cbn1cblxuY29uc3QgaXNPdmVybGFwcGluZyA9IGRhdGEgPT4ge1xuICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZEVsZW1lbnRcIik7XG4gIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgbGV0IGJvdW5kcztcbiAgICBib3VuZHMgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChcbiAgICAgIGRhdGEueCA+PSBib3VuZHMubGVmdCAmJlxuICAgICAgZGF0YS54IDw9IGJvdW5kcy5yaWdodCAmJlxuICAgICAgZGF0YS55ID49IGJvdW5kcy50b3AgJiZcbiAgICAgIGRhdGEueSA8PSBib3VuZHMuYm90dG9tXG4gICAgKSB7XG4gICAgICB3aW5kb3cuZXlldHJhY2tpbmdFbGVtZW50ID0gZWxlbWVudDtcbiAgICB9XG4gIH0pO1xufTtcblxucmVhZHkoKCkgPT4ge1xuICBsZXQgZ2FtZVN0YXJ0ID0gZmFsc2U7XG4gIHdlYmdhemVyXG4gICAgLnNldEdhemVMaXN0ZW5lcihmdW5jdGlvbihkYXRhLCBlbGFwc2VkVGltZSkge1xuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZ2FtZVN0YXJ0KSB7XG4gICAgICAgIGlzT3ZlcmxhcHBpbmcoZGF0YSk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxNSk7XG4gICAgICAgIGdldEJ1dHRvbihlbGVtZW50KTtcbiAgICAgICAgaWYgKHdpbmRvdy50aW1lTGVmdCA8PSAwKSB7XG4gICAgICAgICAgZ2FtZVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwod2luZG93LmludGVydmFsSWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAuYmVnaW4oKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgIGdhbWVTdGFydCA9IHRydWU7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnN0cnVjdGlvbnNcIikuaGlkZGVuID0gdHJ1ZTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhbERvdFwiKS5mb3JFYWNoKGRvdCA9PiAoZG90LmhpZGRlbiA9IHRydWUpKTtcbiAgICBpbml0aWFsaXNlR2FtZSgpO1xuICB9O1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9