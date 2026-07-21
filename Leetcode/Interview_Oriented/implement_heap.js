class Heap {
  constructor(compare = (a, b) => a - b) {
    this.heap = [];
    this.compare = compare;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  peek() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    let i = this.heap.length - 1;

    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.compare(this.heap[p], this.heap[i]) <= 0) break;

      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  pop() {
    if (this.isEmpty()) return null;

    const top = this.heap[0];
    const last = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = last;

      let i = 0;

      while (true) {
        let smallest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (
          left < this.size() &&
          this.compare(this.heap[left], this.heap[smallest]) < 0
        ) {
          smallest = left;
        }

        if (
          right < this.size() &&
          this.compare(this.heap[right], this.heap[smallest]) < 0
        ) {
          smallest = right;
        }

        if (smallest === i) break;

        [this.heap[i], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[i],
        ];

        i = smallest;
      }
    }

    return top;
  }
}