let mainColor = ["rgb(255, 0, 0)", "rgb(255, 140, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 0)", "rgb(0, 128, 0)", "rgb(0, 0, 255)"];
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
let faceArray = ["3", "2", "1", "4", "7", "8", "9", "6"];
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
let moves = ["R", "L", "U", "D", "F", "B", "R'", "L'", "U'", "D'", "F'", "B'"];
document.getElementById("generate").onclick = function () {
    let sequence = "";
    for (let i = 0; i < 20; i++) {
        let x = Math.floor(Math.random() * 6);
        turn(x, direction[x][0]);
        sequence += (moves[x] + " ");
    }
    document.getElementById("sequence").textContent = sequence;
};
document.getElementById("reset").onclick = function () {
    resetColor();
};