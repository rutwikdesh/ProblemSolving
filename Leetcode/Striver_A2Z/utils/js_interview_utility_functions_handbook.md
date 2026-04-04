# 🚀 JavaScript Interview Utility Functions Handbook (SDE-3)

A concise, high-signal reference of commonly used utility functions and patterns for senior backend interviews.

---

## 🔍 Binary Search Variants

### Lower Bound (First element ≥ target)
```js
function lowerBound(arr, target) {
  let left = 0, right = arr.length;

  while (left < right) {
    const mid = (left + right) >> 1;
    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }

  return left; // index
}
```

### Upper Bound (First element > target)
```js
function upperBound(arr, target) {
  let left = 0, right = arr.length;

  while (left < right) {
    const mid = (left + right) >> 1;
    if (arr[mid] <= target) left = mid + 1;
    else right = mid;
  }

  return left;
}
```

### Binary Search (Exact match)
```js
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = (left + right) >> 1;

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

---

## 🧮 Math Utilities

### GCD (Euclidean Algorithm)
```js
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}
```

### LCM
```js
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
```

### Fast Power (Binary Exponentiation)
```js
function power(base, exp) {
  let result = 1;

  while (exp > 0) {
    if (exp & 1) result *= base;
    base *= base;
    exp >>= 1;
  }

  return result;
}
```

---

## 🧵 Array Utilities

### Prefix Sum
```js
function prefixSum(arr) {
  const pre = new Array(arr.length + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
    pre[i + 1] = pre[i] + arr[i];
  }
  return pre;
}
```

### Two Sum (HashMap)
```js
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (map.has(need)) return [map.get(need), i];
    map.set(nums[i], i);
  }

  return [];
}
```

### Kadane's Algorithm (Max Subarray)
```js
function maxSubArray(nums) {
  let maxSum = -Infinity, curr = 0;

  for (const num of nums) {
    curr = Math.max(num, curr + num);
    maxSum = Math.max(maxSum, curr);
  }

  return maxSum;
}
```

---

## 🔗 Sliding Window

### Fixed Window Sum
```js
function maxSumSubarray(nums, k) {
  let sum = 0;

  for (let i = 0; i < k; i++) sum += nums[i];

  let maxSum = sum;

  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, sum);
  }

  return maxSum;
}
```

### Variable Window (Longest substring without repeating)
```js
function longestUniqueSubstring(s) {
  const set = new Set();
  let left = 0, maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left++]);
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

---

## 🌲 Tree Traversals

### DFS (Recursive)
```js
function dfs(root) {
  if (!root) return;

  dfs(root.left);
  dfs(root.right);
}
```

### BFS (Level Order)
```js
function bfs(root) {
  if (!root) return [];

  const queue = [root];
  const res = [];

  while (queue.length) {
    const size = queue.length;
    const level = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    res.push(level);
  }

  return res;
}
```

---

## 🔁 Backtracking Template

```js
function backtrack(path, options) {
  if (/* base condition */) {
    // process result
    return;
  }

  for (const choice of options) {
    path.push(choice);

    backtrack(path, options);

    path.pop();
  }
}
```

---

## 🧠 Graph (Adj List + BFS)

```js
function shortestPath(n, edges, src) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const dist = Array(n).fill(Infinity);
  const queue = [src];
  dist[src] = 0;

  while (queue.length) {
    const node = queue.shift();

    for (const nei of graph[node]) {
      if (dist[nei] === Infinity) {
        dist[nei] = dist[node] + 1;
        queue.push(nei);
      }
    }
  }

  return dist;
}
```

---

## ⚡ Heap (Using library preferred)

> Prefer: `@datastructures-js/priority-queue`

```js
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

const pq = new MinPriorityQueue({ priority: x => x });
pq.enqueue(5);
pq.enqueue(1);

pq.dequeue().element; // 1
```

---

## 🧩 Union Find (DSU)

```js
class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    let px = this.find(x);
    let py = this.find(y);

    if (px === py) return;

    if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py;
    } else if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else {
      this.parent[py] = px;
      this.rank[px]++;
    }
  }
}
```

---

## 🪄 Debounce / Throttle

### Debounce
```js
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### Throttle
```js
function throttle(fn, limit) {
  let inThrottle = false;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

---

## 📌 Notes for SDE-3

- Always discuss **time + space tradeoffs**
- Prefer **iterative over recursive** when stack depth risk exists
- Highlight **edge cases explicitly**
- Use **clean abstractions (DSU, heap, graph templates)**
- Optimize for **readability + correctness first, then micro-optimizations**

---

🔥 Keep revising this before interviews — this covers ~70% of patterns asked.

