class Queue {

    #array 

    constructor() {
        this.#array = [];
    }

    push(data) {
        this.#array.push(data);
    }

    pop() {
        if (this.isEmpty()) {
            return "Queue Underflow Error";
        }
        return this.#array.shift();
    }

    peek() {
        if (this.isEmpty()) {
            return "Queue is Empty";
        }
        return this.#array[0];
    }

    length() {
        return this.#array.length;
    }

    clear() {
        this.#array = [];
    }

    isEmpty() {
        return this.length() === 0;
    }

    display() {
        this.#array.map((i) => {
            console.log(i);
        });
    }
}
