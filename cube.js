let mainColor = [
  "rgb(255, 0, 0)",
  "rgb(255, 140, 0)",
  "rgb(255, 255, 255)",
  "rgb(255, 255, 0)",
  "rgb(0, 128, 0)",
  "rgb(0, 0, 255)",
];
let direction = ["right", "left", "up", "down", "front", "back"];

/*Array indicating the state of the cube
 * [0,]: right side, [1,]: left side, [2,]: bottom/down side, [3,]: top/up side, [4,]: back side, [5,]: front side*/
let sideArray = [
    ["u3", "u6", "u9", "f3", "f6", "f9", "d3", "d6", "d9", "b7", "b4", "b1"],
    ["b3", "b6", "b9", "d7", "d4", "d1", "f7", "f4", "f1", "u7", "u4", "u1"],
    ["f1", "f2", "f3", "r1", "r2", "r3", "b1", "b2", "b3", "l1", "l2", "l3"],
    ["r9", "r8", "r7", "f9", "f8", "f7", "l9", "l8", "l7", "b9", "b8", "b7"],
    ["d1", "d2", "d3", "r3", "r6", "r9", "u9", "u8", "u7", "l7", "l4", "l1"],
    ["u1", "u2", "u3", "r7", "r4", "r1", "d9", "d8", "d7", "l3", "l6", "l9"],
];
let faceArray = ["3", "2", "1", "4", "7", "8", "9", "6"];
let moves = ["R", "L", "U", "D", "F", "B"];
let direction_index = new Map();
for (let i = 0; i < 6; i++) { 
    direction_index.set(direction[i][0], i); //direction[i][0]=turn direction's first letter, i = index
    //corresponds a turn to an index(in the same order as in "direction" array)
}

function turn(index, face) {
  let faceColorArray = [];
  for (let i = 0; i < 8; i++) { //for every element of one side
    let currentElement = document.getElementById(face + faceArray[i]);
    faceColorArray.push(
      window
        .getComputedStyle(currentElement)
        .getPropertyValue("background-color")
    ); //get's the background-color of te specific square from CSS
  }
  for (let i = 0; i < 8; i++) { //for every square of a face
    document.getElementById(face + faceArray[i]).style.backgroundColor =
    faceColorArray[(i + 2) % 8]; //changes colors of every element of cube
    document.getElementById("x" + face + faceArray[i]).style.backgroundColor =
    faceColorArray[(i + 2) % 8]; //changes colors of plane-cube
  }
  let sideColorArray = [];
  for (let i = 0; i < 12; i++) { //for every square of a (moving) side (3x4, squares of other sides that touch)
    let currentElement = document.getElementById(sideArray[index][i]);
    sideColorArray.push(
      window
        .getComputedStyle(currentElement)
        .getPropertyValue("background-color")
    );
  }
  for (let i = 0; i < 12; i++) {
    document.getElementById(sideArray[index][i]).style.backgroundColor =
    sideColorArray[(i + 3) % 12]; //changes colors of every element of cube
    document.getElementById("x" + sideArray[index][i]).style.backgroundColor =
    sideColorArray[(i + 3) % 12]; //changes colors of plane-cube
  }
}

function faceTurn(key) {
  turn(direction_index.get(key), key); //calls turn with the index corresponding to the type of turn and the first letter of the turn
}
function faceTurnPrime(key) {
  let m = key.toLowerCase();
  for (let i = 0; i < 3; i++) { //because when holding shift it goes anti-clockwise
    turn(direction_index.get(m), m);
  }
}

function generate() {
  resetColor();
  let sequence = ""; //stores the string that will be shown to the user about the state of the cube
  let sequenceArray = []; //stores the moves made as their indexes
  for (let i = 0; i < 30; i++) { //makes 30 moves
    let x = Math.floor(Math.random() * 6); //produces random number corresponding to move
    turn(x, direction[x][0]);
    sequenceArray.push(x); //stores the type of move
  }
  for (let i = 0; i < 30; i++) { //checks for every move
    let count = 1;
    for (let j = i + 1; j < 30; j++, i++) { //counts times a move is made consequently
      if (sequenceArray[j] == sequenceArray[i]) {
        count++;
      } else {
        break;
      }
    }
    count %= 4; //makes count's value from 0 to 3, since 4 moves in the same direction = non movement
    switch (count) {
      case 1:
        sequence += moves[sequenceArray[i]];
        break;
      case 2:
        sequence += moves[sequenceArray[i]];
        sequence += "2";
        break;
      case 3: //3 moves on one direction = 1 of the opposite direction
        sequence += moves[sequenceArray[i]];
        sequence += "'";
        break;
      default:
        break;
    }
    sequence += " ";
  }
  document.getElementById("seq").textContent = sequence; //sets the text of html's div with id="seq"
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
  let k = keycode - 37; //37<=keycode<=40, making 0<=k<3, showing the column of stateArray that we'll look at for the next currentState
    let cube = document.querySelector(".cube"); //get's first element that is of ".cube"
  cube.classList.remove(currentClass); //removes the currentClass from "cube" (of html)
  currentClass = "s" + currentState + (k + 1);
  cube.classList.add(currentClass); //replaces the old currentClass with the new that was just calculated
  currentState = stateArray[currentState][k];
}

function changeView() {
  document.querySelector(".cube").classList.toggle("hide"); //get's first element that is ".cube" and removes ".hide" from it
  document.querySelector(".plane-cube").classList.toggle("hide"); //get's first element that is ".plane-cube" and removes ".hide" from it
}

function resetColor() {
  for (let i = 0; i < 6; i++) { //for every face
    let pieces = document.querySelectorAll("." + direction[i] + " .part"); //get's every element of the specific side
    for (let j = 0; j < 18; j++) {
      pieces[j].style.backgroundColor = mainColor[i]; //gives the side its staring color
    }
  }
  document.getElementById("seq").innerHTML = "&nbsp;"; //resets "seq" that indicated the cube state
  let cube = document.querySelector(".cube"); //get's first element that is of ".cube"
  //resets the current state to the initial one
  cube.classList.remove(currentClass);
  currentClass = "s23";
  cube.classList.add(currentClass);
  currentState = 1;
}

let continueAnimation = 0;
function startAnimation() {
  continueAnimation = 1; //makes "continueAnimation == 0" false, so it continues the animation until it changes to 0
  //the following runs until clearInterval is called
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
    ]; //every option key and its code
    let currentRandomMove = Math.floor(Math.random() * randomKeysArray.length); //randomly generates an index from "randomArray"
    checkKeyboardEventKey(
      randomKeysArray[currentRandomMove][0],
      randomKeysArray[currentRandomMove][1]
    ); //acts as if the user provided the input
    if (continueAnimation == 0) { //stops the loop for the animation (changes in stopAimation())
      clearInterval(animationInterval);
    }
  }, 400);
}
function stopAnimation() {
  continueAnimation = 0; //makes "startAnimation" call clearInterval
}

//activates when a key is pressed
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

//for clockwise on screen buttons
document.querySelectorAll(".face-btn button").forEach((element) => { 
  element.onclick = () => {
    faceTurn(element.classList[0][0]);
  };
});
//for anti-clockwise on screen buttons
document.querySelectorAll(".face-prime-btn button").forEach((element) => {
  element.onclick = () => {
    faceTurnPrime(element.classList[0][0]);
  };
});

let cubeKeyCode = new Map();
let cubeKey = ["l", "u", "r", "d"];
for (let i = 0; i < 4; i++) {
    cubeKeyCode.set(cubeKey[i], i + 37); //giving index for the keys that move the whole cube (similar to direction_index)
}

// for on screen vube moving buttons
document.querySelectorAll(".cube-turn").forEach((element) => {
  element.onclick = () => {
    cubeTurn(cubeKeyCode.get(element.classList[0][0]));
  };
});

//for the rest on screen buttons
document.querySelector(".generate").onclick = generate;
document.querySelector(".reset").onclick = resetColor;
document.querySelector(".view").onclick = changeView;
document.querySelector(".start-animation").onclick = () =>
  !continueAnimation && startAnimation();
document.querySelector(".stop-animation").onclick = stopAnimation;
