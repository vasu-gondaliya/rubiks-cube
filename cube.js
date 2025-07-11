let mainColor = [
  "rgb(255, 0, 0)",
  "rgb(255, 111, 0)",
  " rgb(255, 255, 255)",
  "rgb(255, 255, 0)",
  "rgb(48, 214, 48)",
  " rgb(7, 7, 203)",
];

////////////////////////////////////
let undoStack = [];
let redoStack = [];
let isDragging = false;
let startX, startY;
let scrambleStartTime;
let timerInterval;
///////////////////////////////////

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
// Check if cube is solved
  let isSolved = true;
  for (let i = 0; i < 6; i++) {
    let pieces = document.querySelectorAll("." + direction[i] + " .part");
    for (let j = 0; j < 18; j++) {
      // Normalize both actual and expected color strings (remove all whitespace)
      const actual = getComputedStyle(pieces[j]).getPropertyValue("background-color").replace(/\s+/g, '');
      const expected = mainColor[i].replace(/\s+/g, '');
      if (actual !== expected) {
        isSolved = false;
        break;
      }
    }
    if (!isSolved) break;
  }

  if (isSolved) {
    stopTimer();
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
// Audio Manager
const sounds = {
  turn: new Audio('assets/turn.wav'),
  scramble: new Audio('assets/scramble.wav'),
  reset: new Audio('assets/turnPrime.wav'),
  turnPrime: new Audio('assets/turnPrime.wav')
};

// Play sound helper function
function playSound(type, volume = 0.5) {
  if (sounds[type]) {
    sounds[type].volume = volume;
    sounds[type].currentTime = 0; // Rewind to start if already playing
    sounds[type].play().catch(e => console.log("Audio play failed:", e));
  }
}
function faceTurn(key) {
  playSound('turn');
  let final_move = translationMatrix[direction_index.get(key)][currentState]      //finds the corresponding move in translationMatrix
  turn(direction_index.get(final_move), final_move)
  recordMove(final_move, false);
  //turn(direction_index.get(key), key);
}
function faceTurnPrime(key) {
  playSound('turn');
  let m = key.toLowerCase();
  let final_move = translationMatrix[direction_index.get(m)][currentState]
  for (let i = 0; i < 3; i++) {
    turn(direction_index.get(final_move), final_move);
    recordMove(final_move, true);
  }
}

function generate() {
  playSound('scramble',0.7);
  resetColor(true);
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

  scrambleStartTime = Date.now();
  document.getElementById("timer").textContent = "Time: 0s | Score: 1000";
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - scrambleStartTime) / 1000);
    const score = calculateScore(elapsed);
    document.getElementById("timer").textContent = `Time: ${elapsed}s | Score: ${score}`;
  }, 1000);
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
  playSound('turnPrime');
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
function resetColor(skipSound=false) {
  if(!skipSound) playSound('reset',0.2);
  stopTimer();
  document.getElementById("timer").textContent = "Time: 0s | Score: 1000";
  for (let i = 0; i < 6; i++) {
    let pieces = document.querySelectorAll("." + direction[i] + " .part");
    for (let j = 0; j < 18; j++) {
      pieces[j].style.backgroundColor = mainColor[i];
    }
    undoStack = [];
    redoStack = [];
    updateUndoRedoButtons();
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

function checkKeyboardEventKey(eventKey, eventKeyCode, isCtrlPressed= false ) {
  console.log({ eventKey, eventKeyCode,isCtrlPressed });
  if (isCtrlPressed) {
    if (eventKey.toLowerCase() === 'z') {
      undoMove();
      return; // Stop further execution
    }
    if (eventKey.toLowerCase() === 'y') {
      redoMove();
      return; // Stop further execution
    }
  }
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
  checkKeyboardEventKey(event.key, event.keyCode, event.ctrlKey);
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

function recordMove(move, isPrime) {
  // A new move is made, so we push it to the undo stack.
  undoStack.push({ move: move, isPrime: isPrime });
  
  // Any new move invalidates the previous "redo" history.
  redoStack = [];

  updateUndoRedoButtons();
}


function undoMove() {
  if (undoStack.length === 0) {
    console.log("Nothing to undo.");
    return; // Nothing to undo
  }

  const lastMove = undoStack.pop();

  // Perform the OPPOSITE move
  // The opposite of a prime move is a regular move.
  // The opposite of a regular move is a prime move (3 regular turns).
  if (lastMove.isPrime) {
    // It was a prime move, so we undo with a regular turn
    turn(direction_index.get(lastMove.move), lastMove.move);
  } else {
    // It was a regular move, so we undo with a prime turn
    for (let i = 0; i < 3; i++) {
      turn(direction_index.get(lastMove.move), lastMove.move);
    }
  }

  // Push the original move onto the redo stack so we can redo it
  redoStack.push(lastMove);
  updateUndoRedoButtons();
}

function redoMove() {
  if (redoStack.length === 0) {
    console.log("Nothing to redo.");
    return; // Nothing to redo
  }

  const nextMove = redoStack.pop();

  // Re-apply the move exactly as it was
  if (nextMove.isPrime) {
    // It was a prime move
    for (let i = 0; i < 3; i++) {
      turn(direction_index.get(nextMove.move), nextMove.move);
    }
  } else {
    // It was a regular move
    turn(direction_index.get(nextMove.move), nextMove.move);
  }

    function updateUndoRedoButtons() {
    const undoBtn = document.querySelector('.undo-btn');
    const redoBtn = document.querySelector('.redo-btn');

    undoBtn.disabled = undoStack.length === 0;
    redoBtn.disabled = redoStack.length === 0;
}
  // Push the move back onto the undo stack
  undoStack.push(nextMove);
  updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
    const undoBtn = document.querySelector('.undo-btn');
    const redoBtn = document.querySelector('.redo-btn');

    undoBtn.disabled = undoStack.length === 0;
    redoBtn.disabled = redoStack.length === 0;
}


function handleDragStart(e) {
  e.preventDefault();
  isDragging = true;
  startX = e.clientX || e.touches[0].clientX;
  startY = e.clientY || e.touches[0].clientY;

}

function handleDragMove(e) {
  if (!isDragging) return;
  e.preventDefault();

  const currentX = e.clientX || e.touches[0].clientX;
  const currentY = e.clientY || e.touches[0].clientY;

  const deltaX = currentX - startX;
  const deltaY = currentY - startY;

  //Threshold to prevent accidental tiny drags from rotating the cube
  const threshold = 50; // 50 pixels

  if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
    // Determine the primary drag direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal drag
      if (deltaX > 0) {
        cubeTurn(39);
      } else {
        cubeTurn(37);
      }
    } else {
      // Vertical drag
      if (deltaY > 0) {
        cubeTurn(40);
      } else {
        cubeTurn(38);
      }
    }
    
    //Reset dragging state immediately after one turn
    // This prevents one long drag from spinning the cube uncontrollably.
    isDragging = false;
  }
}

function handleDragEnd(e) {
  if (isDragging) {
    isDragging = false;
  }
}

// Array of background image file names (stored in 'images' folder)
const bgImages = [
  "background1.jpg",
  "background2.jpg",
  "background3.jpg",
  "background4.jpg",
  "background5.jpg",
  "background6.jpg",
  "background7.jpg",
  "background8.jpg"
];

let currentBgIndex = 0;

function setBackground(index) {
  const imageUrl = `assets/${bgImages[index]}`;
  document.body.style.backgroundImage = `url('${imageUrl}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
}

// Button handlers
document.getElementById("prev-bg").onclick = () => {
  currentBgIndex = (currentBgIndex - 1 + bgImages.length) % bgImages.length;
  setBackground(currentBgIndex);
};

document.getElementById("next-bg").onclick = () => {
  currentBgIndex = (currentBgIndex + 1) % bgImages.length;
  setBackground(currentBgIndex);
};

setBackground(currentBgIndex);
document.querySelector(".generate").onclick = generate;
document.querySelector(".reset").onclick = resetColor;
document.querySelector(".view").onclick = changeView;
document.querySelector(".start-animation").onclick = () =>
  !continueAnimation && startAnimation();
document.querySelector(".stop-animation").onclick = stopAnimation;

//for undo and redo ///////////////////
document.querySelector(".undo-btn").onclick = undoMove;
document.querySelector(".redo-btn").onclick = redoMove;

// Listen for mouse events
document.body.addEventListener('mousedown', handleDragStart);
document.body.addEventListener('mousemove', handleDragMove);
document.body.addEventListener('mouseup', handleDragEnd);
document.body.addEventListener('mouseleave', handleDragEnd); // In case mouse leaves window

// Listen for touch events
document.body.addEventListener('touchstart', handleDragStart, { passive: false });
document.body.addEventListener('touchmove', handleDragMove, { passive: false });
document.body.addEventListener('touchend', handleDragEnd);


function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;

    const elapsed = Math.floor((Date.now() - scrambleStartTime) / 1000);
  }
}

function calculateScore(timeInSeconds) {
  const baseScore = 1000;
  const penalty = timeInSeconds * 4; // Losing 4 points per second
  return Math.max(baseScore - penalty, 0); // Prevent negative score
}