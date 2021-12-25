
class BFS {

    #end;
    constructor(maze) {
        this.maze = maze;
        this.#end = maze.length - 2;
        this.visited = [];
        this.queue = new Queue();
        let result = this.solve(1, 1);
        console.log("BFS Solvable: ",result);
        let path = this.queue.peek();
        return [this.visited, path, result];
    }

    solve(a, b) {
        let solvable = false;
        this.queue.push([[a, b]]);              // queue = [[[1,1]]]
        this.visited.push([a, b]);

        while (!this.queue.isEmpty()) {
            var path = this.queue.pop();            // path = [[1,1]]
            let tup = path[path.length - 1];         // a=1 b=1
            a = tup[0];
            b = tup[1];
            // this.maze[a][b] = 2;

            const r = this.maze[a][b + 1];
            const d = this.maze[a + 1][b];
            const l = this.maze[a][b - 1];
            const u = this.maze[a - 1][b];

            const pos_r = [a, b + 1];
            const pos_d = [a + 1, b];
            const pos_l = [a, b - 1];
            const pos_u = [a - 1, b];

            if (r == 0 && !this.visited.has(pos_r)) {
                this.queue.push([...path, ...[pos_r]]);     // queue = [[[1,1], [1,2]]]
                this.visited.push(pos_r);
            }
            if (d == 0 && !this.visited.has(pos_d)) {       // queue = [[[1,1], [1,2]], [[1,1], [2,1]]]
                this.queue.push([...path, ...[pos_d]]);
                this.visited.push(pos_d);
            }
            if (l == 0 && !this.visited.has(pos_l)) {
                this.queue.push([...path, ...[pos_l]]);
                this.visited.push(pos_l);
            }
            if (u == 0 && !this.visited.has(pos_u)) {
                this.queue.push([...path, ...[pos_u]]);
                this.visited.push(pos_u);
            }

            if (a == this.#end && b == this.#end) {
                solvable = true;
                path.forEach(coord => {
                    const k = coord[0];
                    const v = coord[1];
                    this.maze[k][v] = 3;
                });
                this.queue.clear();
                this.queue.push(path);
                break;
            }
        }

        return solvable;
    }
}
