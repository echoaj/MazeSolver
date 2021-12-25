class Maze {

    #empty;
    #wall;
    #size;

    constructor(size, obstacles) {
        this.#empty = 0;
        this.#wall = 1;
        this.#size = size
        this.create();
        this.wallify();
        this.borderfy();
        return this.matrix;
    }

    create() {
        this.matrix = [...Array(this.#size)].map(e => Array(this.#size).fill(this.#empty));
    }

    borderfy() {
        for (let i = 0; i < this.#size; i++) {
            this.matrix[i].unshift(1);
            this.matrix[i].push(1);
        }
        this.matrix.unshift([...Array(this.#size + 2).fill(this.#wall)]);
        this.matrix.push([...Array(this.#size + 2).fill(this.#wall)]);
    }

    wallify() {
        let spots = [...Array(this.#size * this.#size).keys()];
        spots.shift();
        spots.pop();
        for (let i = 0; i < obstacles; i++) {
            const num = Math.floor(Math.random() * spots.length);
            const location = spots[num];
            const x = Math.floor(location / this.#size);
            const y = location % this.#size;
            this.matrix[x][y] = this.#wall;
            const index = spots.indexOf(location);
            spots.splice(index, 1);
        }
    }

}

// module.exports = { Maze };