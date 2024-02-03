
export class Stack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container = [...this.container, item]
    };

    pop = (): void => {
        const size = this.getSize();
        if (this.getSize()) {
            this.container.splice(size - 1, 1);
        }
    };

    peak = (): T | null => {
        const size = this.getSize();
        if (this.getSize()) {
            return this.container[size - 1];
        }
        return null;
    };

    getSize = () => this.container.length;
    getVisualisationData = () => [...this.container]
}
export class Queue<T> {
    private container: (T | null)[] = [];
    private _head = 0;
    private _tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        this.container[this._tail % this.size] = item;
        this._tail++;
        this.length++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        delete this.container[this._head]
        this._head++;
        this.length = this.length - 1;
    };

    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this.container[this._head];
    };

    isEmpty = () => this.length === 0;
    getVisualisationData = () => [...this.container]
    getTail = () => {
        if (this.length === 0) {
            return null;
        }
        else {
            return this._tail - 1;
        }
    }
    getHead = () => {
        if (this.length === 0) {
            return null;
        }
        else {
            return this._head;
        }
    }
}

export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}
export class LinkedList<T> {
    private head: Node<T> | null;
    private size: number;
    constructor() {
        this.head = null;
        this.size = 0;
    }

    getAt(index: number) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return null;
        }
        let indCounter = 0;
        let result = this.head;
        while (result && indCounter !== index) {
            indCounter++;
            result = result.next;
        }
        return result;
    }

    insertAt(elementData: T, index: number) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            const newNode = new Node(elementData);

            if (index === 0) {
                newNode.next = this.head;
                this.head = newNode;
                this.size++;
            } else {
                const prev = this.getAt(index - 1);
                if (prev) {
                    const temp = prev.next;
                    newNode.next = temp;
                    prev.next = newNode;
                    this.size++;
                }
            }
        }
    }

    removeAt(index: number) {
        if (this.size && this.head && this.size > index) {
            if (index === 0) {
                this.head = this.head.next;
                this.size--;
            }
            else {
                const prev = this.getAt(index - 1);
                if (prev) {
                    const next = prev.next !== null ? prev.next.next:null;
                    prev.next = next;
                    this.size--;
                }
            }
        }
    }
    addHead(elementData: T) {
        this.insertAt(elementData,0)
    }
    addTail(elementData: T) {
        this.insertAt(elementData, this.size)
    }
    removeHead() {
        this.removeAt(0)
    }
    removeTail() {
        this.removeAt(this.size-1)
    }

    getSize() {
        return this.size;
    }
}