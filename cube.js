let mainColor = [
  "rgb(255, 0, 0)",
  "rgb(255, 140, 0)",
  "rgb(255, 255, 255)",
  "rgb(255, 255, 0)",
  "rgb(0, 128, 0)",
  "rgb(0, 0, 255)",
];
let direction = ["right", "left", "up", "down", "front", "back"];
let sideArray = [
  ["u3", "u6", "u9", "f3", "f6", "f9", "d3", "d6", "d9", "b7", "b4", "b1"],
  ["b3", "b6", "b9", "d7", "d4", "d1", "f7", "f4", "f1", "u7", "u4", "u1"],
  ["f1", "f2", "f3", "r1", "r2", "r3", "b1", "b2", "b3", "l1", "l2", "l3"],
  ["r9", "r8", "r7", "f9", "f8", "f7", "l9", "l8", "l7", "b9", "b8", "b7"],
  ["d1", "d2", "d3", "r7", "r4", "r1", "u9", "u8", "u7", "l3", "l6", "l9"],
  ["u1", "u2", "u3", "r3", "r6", "r9", "d9", "d8", "d7", "l7", "l4", "l1"],
];
let faceArray = ["3", "2", "1", "4", "7", "8", "9", "6"];
let moves = ["R", "L", "U", "D", "F", "B"];
let direction_index = new Map();
for (let i = 0; i < 6; i++) {
  direction_index.set(direction[i][0], i);
}
function turn(index, face) {
  let faceColorArray = [];
  for (let i = 0; i < 8; i++) {
    let currentElement = document.getElementById(face + faceArray[i]);
    faceColorArray.push(
      window
        .getComputedStyle(currentElement)
        .getPropertyValue("background-color")
    );
  }
  for (let i = 0; i < 8; i++) {
    document.getElementById(face + faceArray[i]).style.backgroundColor =
      faceColorArray[(i + 2) % 8];
    document.getElementById("x" + face + faceArray[i]).style.backgroundColor =
      faceColorArray[(i + 2) % 8];
  }
  let sideColorArray = [];
  for (let i = 0; i < 12; i++) {
    let currentElement = document.getElementById(sideArray[index][i]);
    sideColorArray.push(
      window
        .getComputedStyle(currentElement)
        .getPropertyValue("background-color")
    );
  }
  for (let i = 0; i < 12; i++) {
    document.getElementById(sideArray[index][i]).style.backgroundColor =
      sideColorArray[(i + 3) % 12];
    document.getElementById("x" + sideArray[index][i]).style.backgroundColor =
      sideColorArray[(i + 3) % 12];
  }
}
let translationMatrix = [
[0,'r','b','l','f','r','u','l','d','f','u','b','d','r','d','l','u','f','d','b','u','r','f','l','b'],        //matrix is used for translating every move
[0,'l','f','r','b','l','d','r','u','b','d','f','u','l','u','r','d','b','u','f','d','l','b','r','f'],
[0,'u','u','u','u','f','f','f','f','l','l','l','l','b','b','b','b','r','r','r','r','d','d','d','d'],
[0,'d','d','d','d','b','b','b','b','r','r','r','r','f','f','f','f','l','l','l','l','u','u','u','u'],
[0,'f','r','b','l','d','r','u','l','d','f','u','b','u','r','d','l','u','f','d','b','b','r','f','l'],
[0,'b','l','f','r','u','l','d','r','u','b','d','f','d','l','u','r','d','b','u','f','f','l','b','r']
]
function faceTurn(key) {
  let final_move = translationMatrix[direction_index.get(key)][currentState]      //finds the corresponding move in translationMatrix
  turn(direction_index.get(final_move), final_move)
  //turn(direction_index.get(key), key);
}
function faceTurnPrime(key) {
  let m = key.toLowerCase();
  let final_move = translationMatrix[direction_index.get(m)][currentState]
  for (let i = 0; i < 3; i++) {
    turn(direction_index.get(final_move), final_move);
  }
}

function generate() {
  resetColor();
  let sequence = "";
  let sequenceArray = [];
  for (let i = 0; i < 30; i++) {
    let x = Math.floor(Math.random() * 6);
    turn(x, direction[x][0]);
    sequenceArray.push(x);
  }
  for (let i = 0; i < 30; i++) {
    let count = 1;
    for (let j = i + 1; j < 30; j++, i++) {
      if (sequenceArray[j] == sequenceArray[i]) {
        count++;
      } else {
        break;
      }
    }
    count %= 4;
    switch (count) {
      case 1:
        sequence += moves[sequenceArray[i]];
        break;
      case 2:
        sequence += moves[sequenceArray[i]];
        sequence += "2";
        break;
      case 3:
        sequence += moves[sequenceArray[i]];
        sequence += "'";
        break;
      default:
        break;
    }
    sequence += " ";
  }
  document.getElementById("seq").textContent = sequence;
}
let stateArray =
  //left,up,right,down
  [
    [0, 0, 0, 0],
    [2, 5, 4, 13],
    [3, 19, 1, 11],
    [4, 15, 2, 7],
    [1, 9, 3, 17],
    [6, 21, 8, 1],
    [7, 20, 5, 10],
    [8, 3, 6, 23],
    [5, 12, 7, 18],
    [10, 22, 12, 4],
    [11, 6, 9, 16],
    [12, 2, 10, 24],
    [9, 14, 11, 8],
    [14, 1, 16, 21],
    [15, 18, 13, 12],
    [16, 23, 14, 3],
    [13, 10, 15, 20],
    [18, 4, 20, 22],
    [19, 8, 17, 14],
    [20, 24, 18, 2],
    [17, 16, 19, 6],
    [22, 13, 24, 5],
    [23, 17, 21, 9],
    [24, 7, 22, 15],
    [21, 11, 23, 19],
  ];

let currentState = 1;
let currentClass = "s23";
function cubeTurn(keycode) {
  let k = keycode - 37;
  let cube = document.querySelector(".cube");
  cube.classList.remove(currentClass);
  currentClass = "s" + currentState + (k + 1);
  cube.classList.add(currentClass);
  currentState = stateArray[currentState][k];
}
function changeView() {
  document.querySelector(".cube").classList.toggle("hide");
  document.querySelector(".plane-cube").classList.toggle("hide");
}
function resetColor() {
  for (let i = 0; i < 6; i++) {
    let pieces = document.querySelectorAll("." + direction[i] + " .part");
    for (let j = 0; j < 18; j++) {
      pieces[j].style.backgroundColor = mainColor[i];
    }
  }
  document.getElementById("seq").innerHTML = "&nbsp;";
  let cube = document.querySelector(".cube");
  cube.classList.remove(currentClass);
  currentClass = "s23";
  cube.classList.add(currentClass);
  currentState = 1;
}
let continueAnimation = 0;
function startAnimation() {
  continueAnimation = 1;
  let animationInterval = setInterval(() => {
    let randomKeysArray = [
      ["ArrowLeft", 37],
      ["ArrowUp", 38],
      ["ArrowRight", 39],
      ["ArrowDown", 40],
      ["r", 0],
      ["l", 0],
      ["u", 0],
      ["d", 0],
      ["f", 0],
      ["b", 0],
      ["R", 0],
      ["L", 0],
      ["U", 0],
      ["D", 0],
      ["F", 0],
      ["B", 0],
    ];
    let currentRandomMove = Math.floor(Math.random() * randomKeysArray.length);
    checkKeyboardEventKey(
      randomKeysArray[currentRandomMove][0],
      randomKeysArray[currentRandomMove][1]
    );
    if (continueAnimation == 0) {
      clearInterval(animationInterval);
    }
  }, 400);
}
function stopAnimation() {
  continueAnimation = 0;
}

function checkKeyboardEventKey(eventKey, eventKeyCode) {
  console.log({ eventKey, eventKeyCode });
  switch (eventKey) {
    case "r":
    case "l":
    case "u":
    case "d":
    case "f":
    case "b":
      faceTurn(eventKey);
      break;
    case "R":
    case "L":
    case "U":
    case "D":
    case "F":
    case "B":
      faceTurnPrime(eventKey);
      break;
    case "g":
      generate();
      break;
    case "z":
      resetColor();
      break;
    case "ArrowLeft":
    case "ArrowUp":
    case "ArrowRight":
    case "ArrowDown":
      cubeTurn(eventKeyCode);
      break;
    case "v":
      changeView();
      break;
    case "a":
      !continueAnimation && startAnimation();
      break;
    case "A":
      stopAnimation();
    default:
      break;
  }
}
document.onkeydown = function () {
  //Main EventListner for keypress
  checkKeyboardEventKey(event.key, event.keyCode);
};

document.querySelectorAll(".face-btn button").forEach((element) => {
  element.onclick = () => {
    faceTurn(element.classList[0][0]);
  };
});
document.querySelectorAll(".face-prime-btn button").forEach((element) => {
  element.onclick = () => {
    faceTurnPrime(element.classList[0][0]);
  };
});

let cubeKeyCode = new Map();
let cubeKey = ["l", "u", "r", "d"];
for (let i = 0; i < 4; i++) {
  cubeKeyCode.set(cubeKey[i], i + 37);
}

document.querySelectorAll(".cube-turn").forEach((element) => {
  element.onclick = () => {
    cubeTurn(cubeKeyCode.get(element.classList[0][0]));
  };
});

document.querySelector(".generate").onclick = generate;
document.querySelector(".reset").onclick = resetColor;
document.querySelector(".view").onclick = changeView;
document.querySelector(".start-animation").onclick = () =>
  !continueAnimation && startAnimation();
document.querySelector(".stop-animation").onclick = stopAnimation;
// ==================== THEME TOGGLE ====================

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  // Load saved theme
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.innerHTML = "☀️ Light Mode";
  } else {
    themeToggle.innerHTML = "🌙 Dark Mode";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = "☀️ Light Mode";
    } else {
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = "🌙 Dark Mode";
    }
  });
}
// ================= TIMER =================

// ================= TIMER =================

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

const timerDisplay = document.getElementById("timer");
const bestTimeDisplay = document.getElementById("best-time");

// Load best time from localStorage
let bestTime = Number(localStorage.getItem("bestTime")) || null;

// Display saved best time
if (bestTime !== null) {
    bestTimeDisplay.textContent = formatTime(bestTime);
} else {
    bestTimeDisplay.textContent = "--";
}

// Format milliseconds into MM:SS.mmm
function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0") +
        "." +
        String(milliseconds).padStart(3, "0")
    );
}

// Update timer display
function updateTimer() {
    elapsedTime = Date.now() - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);
}

// ================= START =================

document
    .getElementById("start-timer")
    .addEventListener("click", () => {

        // Prevent multiple intervals
        if (timerInterval) return;

        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(updateTimer, 10);
    });

// ================= STOP =================

document
    .getElementById("stop-timer")
    .addEventListener("click", () => {

        if (!timerInterval) return;

        clearInterval(timerInterval);
        timerInterval = null;

        // Update Best Time
        if (bestTime === null || elapsedTime < bestTime) {

            bestTime = elapsedTime;

            localStorage.setItem(
                "bestTime",
                bestTime.toString()
            );

            bestTimeDisplay.textContent =
                formatTime(bestTime);
        }

        console.log(
            "Current:",
            elapsedTime,
            "Best:",
            bestTime
        );
    });

// ================= RESET =================

document
    .getElementById("reset-timer")
    .addEventListener("click", () => {

        clearInterval(timerInterval);

        timerInterval = null;

        elapsedTime = 0;

        timerDisplay.textContent = "00:00.000";
    });

// ================= OPTIONAL SPACEBAR CONTROL =================

document.addEventListener("keydown", (e) => {

    if (e.code !== "Space") return;

    e.preventDefault();

    if (!timerInterval) {

        startTime = Date.now();

        elapsedTime = 0;

        timerInterval = setInterval(updateTimer, 10);

    } else {

        clearInterval(timerInterval);

        timerInterval = null;

        if (bestTime === null || elapsedTime < bestTime) {

            bestTime = elapsedTime;

            localStorage.setItem(
                "bestTime",
                bestTime.toString()
            );

            bestTimeDisplay.textContent =
                formatTime(bestTime);
        }
    }
});
    // ================= DRAG TIMER =================

const timerBox = document.querySelector(".timer-container");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

timerBox.addEventListener("mousedown", (e) => {
    isDragging = true;

    offsetX = e.clientX - timerBox.offsetLeft;
    offsetY = e.clientY - timerBox.offsetTop;

    timerBox.style.bottom = "auto";
    timerBox.style.transform = "none";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    timerBox.style.left = `${e.clientX - offsetX}px`;
    timerBox.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});
document.addEventListener("mouseup", () => {
    if (!isDragging) return;

    localStorage.setItem(
        "timerPosition",
        JSON.stringify({
            left: timerBox.style.left,
            top: timerBox.style.top
        })
    );

    isDragging = false;
});

const savedPosition =
    JSON.parse(localStorage.getItem("timerPosition"));

if (savedPosition) {
    timerBox.style.left = savedPosition.left;
    timerBox.style.top = savedPosition.top;
    timerBox.style.bottom = "auto";
    timerBox.style.transform = "none";
}
timerBox.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];

    isDragging = true;

    offsetX = touch.clientX - timerBox.offsetLeft;
    offsetY = touch.clientY - timerBox.offsetTop;

    timerBox.style.bottom = "auto";
    timerBox.style.transform = "none";
});

document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];

    timerBox.style.left =
        `${touch.clientX - offsetX}px`;

    timerBox.style.top =
        `${touch.clientY - offsetY}px`;
});

document.addEventListener("touchend", () => {
    isDragging = false;
});