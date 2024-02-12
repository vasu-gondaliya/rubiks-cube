# Rubik's Cube
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

## Table of Contents
- [Preview](#preview)
- [Getting Started](#getting-started)
- [Files](#files)

## Preview
### A Rubik's Cube Visualizer with face turns, cube rotations, scramble generator and flat view of cube.
![main-cube](./assets/main.png?raw=true)
### Scrambled Cube
<img src="https://raw.githubusercontent.com/vasu-gondaliya/cube/master/assets/cube.png" alt="cube" width="45%">
<img src="https://raw.githubusercontent.com/vasu-gondaliya/cube/master/assets/flat.png" alt="flat" width="45%">

## Getting Started
1. Fork a copy of the repo from https://github.com/vasu-gondaliya/rubiks-cube/.
2. Clone the repo onto your machine using `git clone <REPO URL>` (e.g. `git clone https://github.com/your-user-name/your-rubiks-cube-repo.git`).
3. Open `index.html` in a web browser of your choice to use the visualizer.

No other preresiquites or configurations needed.

Note: If for regular use or for testing, on-screen buttons would be more useful for you than using the given keyboard commands, `index.html` has hidden buttons which perform most functionality. 
These buttons can be revealed by commenting out the line `visibility: hidden` under the `buttons` class in `cube.css`. 
Revealing the buttons will overlap with the default layout of the visualizer, but could be useful if for some reason keyboard functionality is problematic for you.

## Files
### Style Sheets
- `cube.css`: Handles styling of the main visualizer page, notably the instruction tables.
- `cubeparts.css`: Handles styling of the individual squares ("parts") of the cube.
	- This includes coloring and the positioning of each part in 3d space. Each part's class is labeled `f` for front, `b` for back, `u` for up, `d` for down, `l` for left, and `r` for right, along with its numbering in a 3x3 grid corresponding to a face of the cube (where `1` is the top-left square in the grid, `2` the top-middle, etc.).
	- Note: The styling for the classes `part`, `front`, `back`, `up`, `down`, `left`, and `right` is duplicated in `planeparts.css`. `planeparts.css` overwrites the corresponding `cubeparts.css` styling, so any changes to the listed classes must also be made in `planeparts.css`.
- `planeparts.css`: Analogous to `cubeparts.css` except it handles the styling for the plane view of the cube (which can be toggled on using `v` in the visualizer).
	- Classes follow the same convention except prepended by an `x`, e.g. `xf1` is the first part of the front face in plane view.
- `cubeanimations.css`: Animates the movements of the cube (when the user uses the arrow keys to change the facings or when the automated animation changes the facings).
	- The classes (e.g. `s23`) correspond to the different states of the cube created in `cube.js`.

### Logic
- `cube.js`: Handles all the user interaction. Includes functions corresponding to each keyboard command (e.g. `faceturn()`, `changeView()`) and handles the keyboard events.

### GUI
- `index.html`: The visualizer itself as the user sees it. Includes the cube (styled according to the [sheets](#style-sheets)) and tables which explain the keyboard commands for each action, as handled in `cube.js`.

### Supplementary:
- `cube.cpp`: Used to automate writing the `cubeparts.css` and `cubeanimations.css` files. Reads the raw data of the coordinates from `cubeinput.txt` and prints that data into the context of CSS code.
- `cubeinput.txt`: Has the (x,y,z) coordinates for `cube.cpp` to read for the positions of each state (labeled in the comments as `front`, `back`, etc.) and the coordinates for the animation transformations.
	- Example: The first row of data under the `front` label is `0 0 45`. This corresponds to the line `transform: translate3d(0px, 0px, 45px);` for `#f1` in `cubeparts.css`.
- `cube.txt`: Previously served the function of `cubeinput.txt`, now is a blank file.
- `/assets`: Stores images used in `README.md`.