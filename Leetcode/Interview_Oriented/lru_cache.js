// Description: https://leetcode.com/problems/lru-cache/description/

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}


/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.m = new Map();

  this.head = new Node(0, 0);
  this.tail = new Node(0, 0);

  this.head.next = this.tail;
  this.tail.prev = this.head;
};

LRUCache.prototype.insert = function (node) {
  this.head.next.prev = node;
  node.next = this.head.next;
  this.head.next = node
  node.prev = this.head;
}

LRUCache.prototype.remove = function (node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
}

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.m.has(key)) return -1;
  const node = this.m.get(key);
  this.remove(node);
  this.insert(node);

  return node.value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.m.has(key)) {
    const node = this.m.get(key);
    this.remove(node);
  }

  const node = new Node(key, value);
  this.m.set(key, node);
  this.insert(node);

  if (this.m.size > this.capacity) {
    const lru = this.tail.prev;
    this.remove(lru);
    this.m.delete(lru.key);
  }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */