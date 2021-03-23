let mainColor =
    ["rgb(255, 0, 0)", "rgb(255, 140, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 0)", "rgb(0, 128, 0)", "rgb(0, 0, 255)"];
let direction = ["right", "left", "up", "down", "front", "back"];
let sideArray =
    [
        ["u3", "u6", "u9", "f3", "f6", "f9", "d3", "d6", "d9", "b7", "b4", "b1"],
        ["b3", "b6", "b9", "d7", "d4", "d1", "f7", "f4", "f1", "u7", "u4", "u1"],
        ["f1", "f2", "f3", "r1", "r2", "r3", "b1", "b2", "b3", "l1", "l2", "l3"],
        ["r9", "r8", "r7", "f9", "f8", "f7", "l9", "l8", "l7", "b9", "b8", "b7"],
        ["d1", "d2", "d3", "r7", "r4", "r1", "u9", "u8", "u7", "l3", "l6", "l9"],
        ["u1", "u2", "u3", "r3", "r6", "r9", "d9", "d8", "d7", "l7", "l4", "l1"]
    ];
let faceArray =
    ["3", "2", "1", "4", "7", "8", "9", "6"];
let moves = ["R", "L", "U", "D", "F", "B"];
let direction_index = new Map();
for (let i = 0; i < 6; i++) {
    direction_index.set(direction[i][0], i);
}
function turn(index, face) {
    let faceColorArray = [];
    for (let i = 0; i < 8; i++) {
        let currentElement = document.getElementById(face + faceArray[i]);
        faceColorArray.push(window.getComputedStyle(currentElement).getPropertyValue('background-color'));
    }
    for (let i = 0; i < 8; i++) {
        document.getElementById(face + faceArray[i]).style.backgroundColor = faceColorArray[(i + 2) % 8];
        document.getElementById("x" + face + faceArray[i]).style.backgroundColor = faceColorArray[(i + 2) % 8];
    }
    let sideColorArray = [];
    for (let i = 0; i < 12; i++) {
        let currentElement = document.getElementById(sideArray[index][i]);
        sideColorArray.push(window.getComputedStyle(currentElement).getPropertyValue('background-color'));
    }
    for (let i = 0; i < 12; i++) {
        document.getElementById(sideArray[index][i]).style.backgroundColor = sideColorArray[(i + 3) % 12];
        document.getElementById("x" + sideArray[index][i]).style.backgroundColor = sideColorArray[(i + 3) % 12];
    }
}
function faceTurn(key) {
    turn(direction_index.get(key), key);
}
function faceTurnPrime(key) {
    let m = (key).toLowerCase();
    for (let i = 0; i < 3; i++) {
        turn(direction_index.get(m), m);
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
            }
            else {
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
    document.getElementById("sequence").textContent = sequence;
}
let stateArray =         //left,up,right,down
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
        [21, 11, 23, 19]
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
    document.getElementById("sequence").innerHTML = "&nbsp;";
    let cube = document.querySelector(".cube");
    cube.classList.remove(currentClass);
    currentClass="s23";
    cube.classList.add(currentClass);
    currentState=1;
}
let continueAnimation=1;
function startAnimation(){
    continueAnimation=1;
    let animationInterval=setInterval(() => {
        let randomKeysArray = [
            ["ArrowLeft",37],
            ["ArrowUp",38],
            ["ArrowRight",39],
            ["ArrowDown",40],
            ["r",0],
            ["l",0],
            ["u",0],
            ["d",0],
            ["f",0],
            ["b",0],
            ["R",0],
            ["L",0],
            ["U",0],
            ["D",0],
            ["F",0],
            ["B",0]
          ];
        let currentRandomMove = Math.floor(Math.random() * randomKeysArray.length);
        checkKeyboardEventKey(randomKeysArray[currentRandomMove][0],randomKeysArray[currentRandomMove][1]);
        if(continueAnimation==0){
            clearInterval(animationInterval);
        }
    },400);
}
function stopAnimation(){
    continueAnimation=0;
}

function checkKeyboardEventKey(eventKey,eventKeyCode){
    console.log({eventKey,eventKeyCode});
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
            startAnimation();
            break;
        case "A":
            stopAnimation();
        default:
            break;
    }
}
document.onkeydown = function () {    //Main EventListner for keypress
    checkKeyboardEventKey(event.key,event.keyCode);
};

document.querySelectorAll(".face-btn button").forEach(element => {
    element.onclick = () => {
        faceTurn(element.classList[0][0]);
    };
});
document.querySelectorAll(".face-prime-btn button").forEach(element => {
    element.onclick = () => {
        faceTurnPrime(element.classList[0][0]);
    };
});

let cubeKeyCode = new Map();
let cubeKey = ["l", "u", "r", "d"];
for (let i = 0; i < 4; i++) {
    cubeKeyCode.set(cubeKey[i], i + 37);
}

document.querySelectorAll(".cube-turn").forEach(element => {
    element.onclick = () => {
        cubeTurn(cubeKeyCode.get(element.classList[0][0]));
    };
});

document.querySelector(".generate").onclick = generate;
document.querySelector(".reset").onclick = resetColor;
document.querySelector(".view").onclick = changeView;
document.querySelector(".start-animation").onclick = startAnimation;
document.querySelector(".stop-animation").onclick = stopAnimation;
