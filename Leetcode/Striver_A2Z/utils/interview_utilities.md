# Interview utilities (JavaScript)

**Last updated:** 2026-04-04 — one-page patterns for SDE2/3-style DSA loops. Snippets are plain JS; complexity is noted inline.

## Table of contents

1. [Workspace / tooling](#workspace--tooling)
2. [How to use this doc](#how-to-use-this-doc)
3. [Binary search](#binary-search)
4. [Arrays & ranges](#arrays--ranges)
5. [Stacks & queues](#stacks--queues)
6. [Heaps — `@datastructures-js/priority-queue`](#heaps---datastructures-jspriority-queue)
7. [Graphs](#graphs)
8. [Union-Find (DSU)](#union-find-dsu)
9. [Strings](#strings)
10. [Bits](#bits)
11. [Number theory](#number-theory)
12. [JavaScript gotchas (DSA)](#javascript-gotchas-dsa)
13. [Pre-submit checklist](#pre-submit-checklist)

---

## Workspace / tooling

- Run TypeScript files locally: `tsx filename.ts`
- **Numeric sort:** `array.sort((a, b) => a - b);` — default `.sort()` is lexicographic.

---

## How to use this doc

Skim in this order before a round: **binary search** (bounds, duplicates) → **prefix / diff / sliding window** → **heap + graphs** (BFS, Dijkstra, topo) → **DSU** for connectivity → **strings / bits / mod math** as needed. Prefer library heap locally; on LeetCode’s editor you usually **cannot** `npm` packages—use a small array-heap there or another language with a built-in heap.

---

## Binary search

Assume `arr` is sorted **non-decreasing**. All indices are 0-based. Time `O(log n)`, space `O(1)`.

**Invariant template:** maintain a half-open or closed interval and shrink until `lo === hi` (or similar). Test empty `arr` first.

```js
/** @returns index i of target, or -1 */
function binarySearch(arr, target) {
  let lo = 0,
    hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

/** First i with arr[i] >= x. If all < x, returns arr.length. */
function lowerBound(arr, x) {
  let lo = 0,
    hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/** First i with arr[i] > x. If all <= x, returns arr.length. */
function upperBound(arr, x) {
  let lo = 0,
    hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] <= x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/** First index of x, or -1 (arr sorted, may have duplicates). */
function firstEqual(arr, x) {
  const i = lowerBound(arr, x);
  return i < arr.length && arr[i] === x ? i : -1;
}

/** Last index of x, or -1. */
function lastEqual(arr, x) {
  const i = upperBound(arr, x) - 1;
  return i >= 0 && arr[i] === x ? i : -1;
}
```

**Edge cases:** `[]`; all values `< x` or `> x`; duplicates—use `lowerBound`/`upperBound` pair for count: `upperBound(x) - lowerBound(x)`.

---

## Arrays & ranges

**Prefix sum:** point query of range sum in `O(1)` after `O(n)` build.

```js
function buildPrefix(arr) {
  const p = [0];
  for (let i = 0; i < arr.length; i++) p.push(p[p.length - 1] + arr[i]);
  return p;
}
/** sum arr[l..r] inclusive, given prefix p from buildPrefix */
function rangeSum(p, l, r) {
  return p[r + 1] - p[l];
}
```

**Difference array:** many range adds, then final values (or point queries after prefix of diff).

```js
/** Add val to [l, r] inclusive on indices 0..n-1; then toArray() builds final a */
function rangeAddDiff(n) {
  const d = Array(n + 1).fill(0);
  return {
    add(l, r, val) {
      d[l] += val;
      d[r + 1] -= val;
    },
    toArray() {
      const a = Array(n).fill(0);
      let s = 0;
      for (let i = 0; i < n; i++) {
        s += d[i];
        a[i] = s;
      }
      return a;
    },
  };
}
```

**Sliding window (variable size):** expand `r`, shrink `l` while invalid.

```js
function longestSubarrayAtMostK(nums, k) {
  // example: at most k zeros → flip window
  let l = 0,
    zeros = 0,
    best = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === 0) zeros++;
    while (zeros > k) {
      if (nums[l] === 0) zeros--;
      l++;
    }
    best = Math.max(best, r - l + 1);
  }
  return best;
}
```

---

## Stacks & queues

**Monotonic stack** (e.g. next greater to the right; histogram uses similar idea).

```js
/** nextGreater[i] = next index j>i with a[j]>a[i], or -1 */
function nextGreaterIndex(a) {
  const n = a.length,
    st = [],
    ng = Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    while (st.length && a[st[st.length - 1]] < a[i]) {
      ng[st.pop()] = i;
    }
    st.push(i);
  }
  return ng;
}
```

**Sliding window maximum** (monotonic deque — `shift` from front is `O(1)` amortized with index deque):

```js
function maxSlidingWindow(nums, k) {
  const dq = [],
    out = [];
  for (let i = 0; i < nums.length; i++) {
    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();
    dq.push(i);
    if (dq[0] <= i - k) dq.shift();
    if (i >= k - 1) out.push(nums[dq[0]]);
  }
  return out;
}
```

---

## Heaps — `@datastructures-js/priority-queue`

JS has no built-in heap. This repo already depends on **`@datastructures-js/priority-queue`** (see `e:\Code\ProblemSolving\package.json`). Local practice: use it; **LeetCode in-browser** usually has no npm—keep a 5-line mental model of a binary heap in an array, or switch language for that problem.

**Install:** `npm i @datastructures-js/priority-queue`

```js
// ESM
import { MinPriorityQueue, MaxPriorityQueue } from "@datastructures-js/priority-queue";
// CommonJS
// const { MinPriorityQueue, MaxPriorityQueue } = require("@datastructures-js/priority-queue");

const pq = new MinPriorityQueue();
pq.enqueue(3);
pq.enqueue(1);
pq.front(); // 1 — peek min without removing
pq.dequeue(); // 1 — removes and returns the element (same type you enqueued)
pq.isEmpty();
pq.size(); // method, not .length

// Custom order: tuples, edges, { dist, node } — legacy compare API
const edgePQ = new MinPriorityQueue({
  compare: (a, b) => a[0] - b[0],
});
edgePQ.enqueue([2, 1]);
edgePQ.enqueue([5, 0]);

// Max heap: use MaxPriorityQueue, OR MinPriorityQueue with negated numeric keys
const maxQ = new MaxPriorityQueue();
```

**Docs:** [datastructures-js priority-queue](https://datastructures-js.info/docs/priority-queue)

---

## Graphs

**Adjacency list** from edge list (undirected: push both ways).

```js
function buildAdj(n, edges, directed = false) {
  const g = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    g[u].push(v);
    if (!directed) g[v].push(u);
  }
  return g;
}
```

**BFS** — unweighted shortest path from `start`.

```js
function bfs(g, start) {
  const n = g.length,
    dist = Array(n).fill(-1),
    q = [start];
  dist[start] = 0;
  for (let i = 0; i < q.length; i++) {
    const u = q[i];
    for (const v of g[u]) {
      if (dist[v] === -1) {
        dist[v] = dist[u] + 1;
        q.push(v);
      }
    }
  }
  return dist;
}
```

**DFS** (recursive + iterative).

```js
function dfsRecursive(g, start, visited = new Set()) {
  visited.add(start);
  for (const v of g[start]) if (!visited.has(v)) dfsRecursive(g, v, visited);
}

function dfsIterative(g, start) {
  const st = [start],
    seen = new Set();
  while (st.length) {
    const u = st.pop();
    if (seen.has(u)) continue;
    seen.add(u);
    for (let i = g[u].length - 1; i >= 0; i--) st.push(g[u][i]);
  }
}
```

**Topological sort (Kahn)** — `edges` as `[u,v]` meaning `u → v`.

```js
function topologicalSortKahn(n, edges) {
  const indeg = Array(n).fill(0),
    g = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    g[u].push(v);
    indeg[v]++;
  }
  const q = [],
    order = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);
  for (let i = 0; i < q.length; i++) {
    const u = q[i];
    order.push(u);
    for (const v of g[u]) if (--indeg[v] === 0) q.push(v);
  }
  return order.length === n ? order : []; // empty => cycle
}
```

**Dijkstra** (non-negative weights) — `adj[u]` as `[[v, w], ...]`.

```js
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

function dijkstra(adj, start, n) {
  const dist = Array(n).fill(Infinity);
  dist[start] = 0;
  const pq = new MinPriorityQueue({ compare: (a, b) => a[0] - b[0] });
  pq.enqueue([0, start]);
  while (!pq.isEmpty()) {
    const [d, u] = pq.dequeue();
    if (d !== dist[u]) continue; // stale entry (lazy delete)
    for (const [v, w] of adj[u] || []) {
      const nd = d + w;
      if (nd < dist[v]) {
        dist[v] = nd;
        pq.enqueue([nd, v]);
      }
    }
  }
  return dist;
}
```

---

## Union-Find (DSU)

Path compression + union by size. Near–`O(α(n))` per op.

```js
class DSU {
  constructor(n) {
    this.p = Array.from({ length: n }, (_, i) => i);
    this.sz = Array(n).fill(1);
  }
  find(x) {
    return this.p[x] === x ? x : (this.p[x] = this.find(this.p[x]));
  }
  union(a, b) {
    a = this.find(a);
    b = this.find(b);
    if (a === b) return false;
    if (this.sz[a] < this.sz[b]) [a, b] = [b, a];
    this.p[b] = a;
    this.sz[a] += this.sz[b];
    return true;
  }
  connected(a, b) {
    return this.find(a) === this.find(b);
  }
}
```

---

## Strings

**Rolling hash** (single mod; use two mods + compare pairs for stricter contests).

```js
function rollingHash(s, base = 131n, mod = 1_000_000_007n) {
  let h = 0n;
  for (let i = 0; i < s.length; i++) h = (h * base + BigInt(s.charCodeAt(i))) % mod;
  return h;
}
```

**KMP:** linear-time substring search with failure function—long to type cold; know it exists and review a full template before a string-heavy round.

---

## Bits

```js
const lowbit = (x) => x & -x; // lowest set bit as isolated value
const isPow2 = (x) => x > 0 && (x & (x - 1)) === 0;
// non-negative x; for 32-bit unsigned patterns use (x >>> 0) first
const popcount = (x) => {
  let c = 0;
  for (; x; x &= x - 1) c++;
  return c;
};
// For unsigned 32-bit: (n >>> 0)
```

---

## Number theory

```js
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;

/** (base^exp) % mod — mod > 0 */
function modPow(base, exp, mod) {
  let r = 1n;
  base = BigInt(base) % BigInt(mod);
  let e = BigInt(exp),
    m = BigInt(mod);
  while (e > 0n) {
    if (e & 1n) r = (r * base) % m;
    base = (base * base) % m;
    e >>= 1n;
  }
  return Number(r);
}
```

**More in repo:** primes / sieve / divisors — [seive.ts](e:\Code\ProblemSolving\Leetcode\Striver_A2Z\utils\seive.ts), [findAllDivisors.ts](e:\Code\ProblemSolving\Leetcode\Striver_A2Z\utils\findAllDivisors.ts).

---

## JavaScript gotchas (DSA)

- **`sort`:** numeric arrays need `(a, b) => a - b` (see [Workspace](#workspace--tooling)).
- **Integer safety:** `Number` is IEEE-754; beyond `Number.MAX_SAFE_INTEGER` use **`BigInt`** for exact combinatorics / large mods.
- **2D grid copy:** `grid.map((row) => [...row])`.
- **Hash maps:** `Map` / `Set` for arbitrary keys; object keys are strings/symbols.

---

## Pre-submit checklist

- **Bounds:** `0 <= index < n`, off-by-one on ranges `[l,r]` vs half-open `[l,r)`.
- **Empty / single element** inputs.
- **Overflow / mod:** intermediate products; use `BigInt` or `% mod` as required.
- **Graph:** disconnected components, self-loops, multi-edges if relevant.
- **Time:** nested loops → rough `O(n^2)` vs `O(n log n)` expectation for constraints.
