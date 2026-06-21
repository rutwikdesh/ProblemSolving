// Description: https://leetcode.com/problems/lfu-cache/

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.freq = 1;

    this.prev = null;
    this.next = null;
  }
}

// Reused LRU logic → just turned into a reusable list
class DoublyLinkedList {
  constructor() {
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);

    this.head.next = this.tail;
    this.tail.prev = this.head;

    this.size = 0;
  }

  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
  }

  insert(node) {
    node.next = this.head.next;
    node.prev = this.head;

    this.head.next.prev = node;
    this.head.next = node;

    this.size++;
  }

  removeLRU() {
    const node = this.tail.prev;
    this.remove(node);
    return node;
  }

  isEmpty() {
    return this.size === 0;
  }
}

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;

    this.minFreq = 0;

    this.keyMap = new Map();   // key -> node
    this.freqMap = new Map();  // freq -> DLL
  }

  updateFreq(node) {
    const freq = node.freq;
    const list = this.freqMap.get(freq);

    list.remove(node);

    // critical step
    if (freq === this.minFreq && list.isEmpty()) {
      this.minFreq++;
    }

    node.freq++;

    if (!this.freqMap.has(node.freq)) {
      this.freqMap.set(node.freq, new DoublyLinkedList());
    }

    this.freqMap.get(node.freq).insert(node);
  }

  get(key) {
    if (!this.keyMap.has(key)) return -1;

    const node = this.keyMap.get(key);
    this.updateFreq(node);

    return node.value;
  }

  put(key, value) {
    if (this.capacity === 0) return;

    if (this.keyMap.has(key)) {
      const node = this.keyMap.get(key);
      node.value = value;
      this.updateFreq(node);
      return;
    }

    if (this.size === this.capacity) {
      const list = this.freqMap.get(this.minFreq);
      const lru = list.removeLRU();

      this.keyMap.delete(lru.key);
      this.size--;
    }

    const node = new Node(key, value);

    if (!this.freqMap.has(1)) {
      this.freqMap.set(1, new DoublyLinkedList());
    }

    this.freqMap.get(1).insert(node);

    this.keyMap.set(key, node);

    this.minFreq = 1;
    this.size++;
  }
}