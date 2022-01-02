class DFS {

    #end;

    constructor(maze) {
        this.deep_copy = JSON.parse(JSON.stringify(maze))
        this.maze = this.deep_copy;
        this.#end = maze.length - 2;
        this.path = [];
        this.visited = [];
        let result = this.solve(1, 1);
        console.log("DFS Solvable: ", result);
        return [this.path, result];
    }

    solve(a, b) {
        this.maze[a][b] = 2;
        this.path.push([a, b]);
        if (a === this.#end && b === this.#end) {
            return true;
        }

        let r = this.maze[a][b + 1];
        let d = this.maze[a + 1][b];
        let l = this.maze[a][b - 1];
        let u = this.maze[a - 1][b];

        if (r === 0 && this.solve(a, b + 1)) {
            return true;
        }
        if (d === 0 && this.solve(a + 1, b)) {
            return true;
        }
        if (l === 0 && this.solve(a, b - 1)) {
            return true;
        }
        if (u === 0 && this.solve(a - 1, b)) {
            return true;
        }

        return false;
    }
}
