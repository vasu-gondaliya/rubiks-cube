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
for (let i = 0; i < 6; i++) {
    document.querySelector(".btn ." + direction[i]).addEventListener("click", function () {
        turn(i, direction[i][0]);
    });
}
function resetColor() {
    for (let i = 0; i < 6; i++) {
        let pieces = document.querySelectorAll("." + direction[i] + " .part");
        for (let j = 0; j < 18; j++) {
            pieces[j].style.backgroundColor = mainColor[i];
        }
    }
    document.getElementById("sequence").textContent = "";
}
let moves = ["R", "L", "U", "D", "F", "B"];
document.getElementById("generate").onclick = function () {
    resetColor();
    let sequenceArray = [];
    for (let i = 0; i < 30; i++) {
        let x = Math.floor(Math.random() * 6);
        turn(x, direction[x][0]);
        sequenceArray.push(x);
    }
    let sequence = "";
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
};
document.getElementById("reset").onclick = function () {
    resetColor();
};

// function rotateCube() {
//     let x = document.getElementById("slider-x").value;
//     let y = document.getElementById("slider-y").value;
//     let z = document.getElementById("slider-z").value;
//     let a = document.getElementById("slider-angle").value + "deg";
//     document.querySelector(".cube").style.transform = "rotate3d(" + x + "," + y + "," + z + "," + a + ")";
//     document.getElementById("text-x").innerHTML = x;
//     document.getElementById("text-y").innerHTML = y;
//     document.getElementById("text-z").innerHTML = z;
//     document.getElementById("text-angle").innerHTML = a;
// }
// document.getElementById("slider-x").addEventListener("input", rotateCube);
// document.getElementById("slider-y").addEventListener("input", rotateCube);
// document.getElementById("slider-z").addEventListener("input", rotateCube);
// document.getElementById("slider-angle").addEventListener("input", rotateCube);

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
document.onkeyup = function (e) {
    let k = e.keyCode - 37;
    if (k >= 0 && k <= 3) {
        let cube = document.querySelector(".cube");
        cube.classList.remove(currentClass);
        currentClass = "s" + currentState + (k + 1);
        cube.classList.add(currentClass);
        currentState = stateArray[currentState][k];
    }
};
