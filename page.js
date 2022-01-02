Array.prototype.has = function (list) {
    for (let i = 0; i < this.length; i++) {
        if (this[i][0] === list[0] && this[i][1] === list[1]) {
            return true;
        }
    }
    return false;
};

// Renders Maze
function RenderMaze(maze) {
    mazeState["displayed"] = true;
    mazeState["solved"] = false;
    mazeState["solving_in_progress"] = false;
    // Clear GUI
    while (mazeGUI.firstChild) {
        mazeGUI.removeChild(mazeGUI.firstChild);
    }

    let count = 0;
    const dim = maze.length;
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            const num = maze[i][j];
            const cell = document.createElement("div");
            const id = document.createElement("p");
            if (i > 0 && i < dim - 1 && j > 0 && j < dim - 1) {
                count += 1;
                id.innerText = count;
            }
            cell.appendChild(id);
            cell.setAttribute("id", `cell-${i}-${j}`);
            cell.style.setProperty("background-color", colorCode[num]);
            mazeGUI.appendChild(cell);
        }
    }
    document.querySelector("#cell-1-1").style.setProperty("background-color", "#A6F3A6");
    document.querySelector(`#cell-${dim - 2}-${dim - 2}`).style.setProperty("background-color", "#F3A6A6");
    mazeGUI.style.setProperty('--grid-rows', dim);
    mazeGUI.style.setProperty('--grid-cols', dim);
    cellEnumeration();
}

// controls if maze is enumerated
function cellEnumeration() {
    let type = mazeState["enumerated"] ? "block" : "none";
    // loop through each div in labyrinth
    $(".labyrinth").children().each((index, element) => {
        // change dispaly type of each p in div
        element.firstChild.style.display = type;
    });
}

// function that colors square for the path
function nextCell(iter, color) {

    let obj = iter.next();
    if (obj.done) {
        return obj.done;
    } else {
        let pos = obj.value;
        // console.log(pos);
        const cell = document.querySelector(`#cell-${pos[0]}-${pos[1]}`);
        const p = cell.querySelector("p");
        cell.style.setProperty("background-color", color);
        p.style.setProperty("color", colorCode[0]);
        return obj.done;
    }
}

function RenderDFSPath() {
    // If maze not displayed render maze
    if (mazeState["displayed"] == false) {
        RenderMaze(maze);
    }

    let path_solv = new DFS(maze);
    let pathIterable = path_solv[0];
    let solvable = path_solv[1];
    let pathIterator = pathIterable[Symbol.iterator]();
    let solveSpeed = mazeState["speed"];
    let msg = solvable ? `Maze solvable in <b>${pathIterable.length} steps</b>.` : 'Maze not solvable.';

    mazeState["solving_in_progress"] = true;
    // Start Path Animation
    const setInt = setInterval(function () {
        // Makes it so if you generate a new maze while solving it stops solving.
        if(mazeState["solving_in_progress"] == false){
            clearInterval(setInt);
        }else{
            let done = nextCell(pathIterator, colorCode[2]);
            if (done) {
                clearInterval(setInt);
                generateMessage(500, "DFS", msg, colorCode[2]);
                mazeState["solved"] = true;
            }
        }
    }, solveSpeed);
}

function RenderBFSPath() {
    // If maze not displayed render maze
    if (mazeState["displayed"] == false) {
        RenderMaze(maze);
    }
    let vist_path_solv = new BFS(maze);
    console.log("BOTH: ", vist_path_solv);
    let visitedIterable = vist_path_solv[0];
    let pathIterable = vist_path_solv[1];
    console.log(pathIterable);
    let solvable = vist_path_solv[2];
    let visitedIterator = visitedIterable[Symbol.iterator]();
    let pathIterator = pathIterable[Symbol.iterator]();
    let solveSpeed = mazeState["speed"];
    let msg = solvable ? `Maze's shortest path solvable in <b>${pathIterable.length} steps</b>.` : 'Maze not solvable.';
    
    mazeState["solving_in_progress"] = true;
    // Start Path Animation for spread
    const setInt2 = setInterval(function () {
        if(mazeState["solving_in_progress"] == false){
            clearInterval(setInt2);
        }else{
            let done = nextCell(visitedIterator, colorCode[3]);
            if (done) {
                // Start Path for shortest
                clearInterval(setInt2);
                const setInt = setInterval(function () {
                    if(mazeState["solving_in_progress"] == false){
                            clearInterval(setInt);
                        }else{
                        let done = nextCell(pathIterator, colorCode[4]);
                        if (done) {
                            clearInterval(setInt);
                            generateMessage(500, "BFS", msg, colorCode[3]);
                            mazeState["solved"] = true;
                        }
                    }
                }, solveSpeed);
            }
        }
    }, solveSpeed / 2);
}

// Called when size button is pressed
function buttonHandlerSize(num) {
    dimention = parseInt(num);
    // limit of slider
    let limit = dimention * dimention - 2;
    // reset obstacles: 10:25, 15:50, 20:100
    obstacles = Math.pow(2, ((dimention / 5) - 2)) * 25;
    slider.max = limit;
    slider.value = obstacles;
    rangeValue.innerText = slider.value;
    maze = new Maze(dimention, obstacles);
    RenderMaze(maze);
    dismissMessage();
}

// Called when speed button is pressed
function buttonHandlerSpeed(num) {
    mazeState["speed"] = num;
}

// Called when slider changes
function sliderHandler() {
    if (!isNaN(this.value))     // prevent XSS attacks
        rangeValue.innerHTML = this.value;
    obstacles = this.value;
    maze = new Maze(dimention, obstacles);
    RenderMaze(maze);
};

// window.location.reload(true);
let dimention = 10; // default
let obstacles = 25; // default
let speed = 75;     // default
let maze = new Maze(dimention, obstacles);
const slider = document.getElementById("walls");
const rangeValue = document.getElementById("rangeValue");
slider.value = obstacles;
rangeValue.innerHTML = slider.value;
const sizeButtons = document.querySelectorAll("#sizeBtns button[type=button]");
const speedButtons = document.querySelectorAll("#speedBtns button[type=button]");
const mazeGUI = document.querySelector(".labyrinth");
const dfsButton = document.querySelector("#dfs");
const bfsButton = document.querySelector("#bfs");
const colorCode = ["white", "black", "#007bff", "#28a745", "#dc3545"];
const mazeState = {
    "displayed": false, "solved": false, "enumerated": false,
    "speed": speed, "solving_in_progress": false
};

slider.oninput = sliderHandler;
sizeButtons.forEach(b => { b.addEventListener("click", buttonHandlerSize.bind(this, b.value)); });
speedButtons.forEach(b => { b.addEventListener("click", buttonHandlerSpeed.bind(this, b.value)); });
dfsButton.addEventListener("click", RenderDFSPath);
bfsButton.addEventListener("click", RenderBFSPath);

$(document).ready(function () {
    $("#flexCheckDefault").click(function () {
        if ($(this).prop("checked") == true) {
            mazeState["enumerated"] = true;
            cellEnumeration();
        }
        else if ($(this).prop("checked") == false) {
            mazeState["enumerated"] = false;
            cellEnumeration();
        }
    });
});