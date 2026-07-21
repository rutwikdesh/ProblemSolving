# 🧩 Disjoint Set (Union-Find) — Visual Guide

> A complete visual guide to understanding **Disjoint Set** (also called **Union-Find**) data structure using the **size-based union approach** with intuitive diagrams and real code examples.

---

## 🎯 What is a Disjoint Set?

A **Disjoint Set** helps us answer one key question:

> **"Are these two elements in the same group?"**

Think of it like having **separate groups of friends** where:

- Each person starts as their own group
- We can **merge groups** (union)
- We can **find which group someone belongs to** (find)
- We want to do this **efficiently**

---

## 🌳 Initial State: Everyone is Alone

```js
class DisjointSet {
  constructor(n) {
    this.size = Array(n).fill(1); // Each group has size 1
    this.parent = Array(n);

    for (let i = 0; i < n; i++) {
      this.parent[i] = i; // Each person is their own parent
    }
  }
}
```

### 📊 Visual Representation

> 💡 **Key Insight**: Each person is the **root** of their own group.

---

## 🔍 Finding a Group (Find Operation)

### The Problem

When we merge groups, we need to know **which group someone belongs to**.

### The Solution: Path Compression

```js
findUParent(node) {
  if (node === this.parent[node]) return node;           // Base case: reached root
  return this.parent[node] = this.findUParent(this.parent[node]); // Path compression
}
```

### 🎬 Visual Animation

```
Initial:  1  2  3  4  5  6  7
          |  |  |  |  |  |  |
          v  v  v  v  v  v  v

After union(1,2):  1  2  3  4  5  6  7
                   |  |  |  |  |  |  |
                   v  v  v  v  v  v  v

Find(2) path:
2 → 1 (root)

Path compression makes future finds faster!
```

---

## 🔗 Merging Groups (Union Operation)

### The Size-Based Strategy

**Why size matters?** When merging two groups, attach the **smaller group to the larger group**. This keeps the tree **shallow** and operations fast.

### The Algorithm

```js
unionBySize(u, v) {
  let ultpar_u = this.findUParent(u);   // Find root of u's group
  let ultpar_v = this.findUParent(v);   // Find root of v's group

  if (this.size[ultpar_u] > this.size[ultpar_v]) {
    this.parent[ultpar_v] = ultpar_u;   // Attach v's root to u's root
    this.size[ultpar_u] += this.size[ultpar_v];
  } else {
    this.parent[ultpar_u] = ultpar_v;   // Attach u's root to v's root
    this.size[ultpar_v] += this.size[ultpar_u];
  }
}
```

### 🎬 Visual Animation: Union by Size

```
Initial:  1  2  3  4  5  6  7
          |  |  |  |  |  |  |
          v  v  v  v  v  v  v

Step 1: Union(1,2)
   Group 1: size 2, root 1
   Group 2: size 1, root 2
   → Attach 2 to 1 (smaller to larger)

Result:  1  2  3  4  5  6  7
          |  |  |  |  |  |  |
          v  v  v  v  v  v  v
          ↑
          Group: {1,2}, root: 1, size: 2

Step 2: Union(2,3)
   Find(2) → 1 (root)
   Find(3) → 3 (root)
   Group 1: size 2, root 1
   Group 3: size 1, root 3
   → Attach 3 to 1 (smaller to larger)

Result:  1  2  3  4  5  6  7
          |  |  |  |  |  |  |
          v  v  v  v  v  v  v
          ↑     ↑
          Group: {1,2,3}, root: 1, size: 3
```

---

## 🧪 Complete Example Walkthrough

Let's trace through the example code:

```js
const ds = new DisjointSet(7);

ds.unionBySize(1, 2); // {1,2} size 2, root 1
ds.unionBySize(2, 3); // {1,2,3} size 3, root 1
ds.unionBySize(4, 5); // {4,5} size 2, root 4
ds.unionBySize(6, 7); // {6,7} size 2, root 6
ds.unionBySize(5, 6); // {4,5,6,7} size 4, root 4
```

### 📊 State After Each Operation

| Operation  | Groups Formed               | Root          | Size        |
| ---------- | --------------------------- | ------------- | ----------- |
| Initial    | {1},{2},{3},{4},{5},{6},{7} | 1,2,3,4,5,6,7 | 1           |
| union(1,2) | {1,2},{3},{4},{5},{6},{7}   | 1,3,4,5,6,7   | 2,1,1,1,1,1 |
| union(2,3) | {1,2,3},{4},{5},{6},{7}     | 1,4,5,6,7     | 3,1,1,1,1   |
| union(4,5) | {1,2,3},{4,5},{6},{7}       | 1,4,6,7       | 3,2,1,1     |
| union(6,7) | {1,2,3},{4,5},{6,7}         | 1,4,6         | 3,2,2       |
| union(5,6) | {1,2,3},{4,5,6,7}           | 1,4           | 3,4         |

### 🎬 Visual Tree Structure

```
After all unions:

Group 1: {1,2,3}     Group 2: {4,5,6,7}
    1               4
   / \             / | \
  2   3           5  6  7

Key: Arrows point to parent
```

---

## 🔍 Checking if Elements are in Same Group

```js
if (ds.findUParent(3) === ds.findUParent(7)) {
  console.log("Same");
} else {
  console.log("Not Same");
}
```

### 🎬 Visual Check

```
Find(3): 3 → 2 → 1 (root)
Find(7): 7 → 4 (root)

1 ≠ 4 → "Not Same"
```

### After Union(3,4)

```js
ds.unionBySize(3, 4);
```

```
Find(3): 3 → 2 → 1 (root)
Find(7): 7 → 4 → 1 (root after union)

1 === 1 → "Same"
```

---

## ⚡ Time Complexity

| Operation       | Time               | Why                              |
| --------------- | ------------------ | -------------------------------- |
| `findUParent()` | **O(α(n))** ≈ O(1) | Path compression + union by size |
| `unionBySize()` | **O(α(n))** ≈ O(1) | Same as find                     |
| Space           | **O(n)**           | Store parent and size arrays     |

> 💡 **α(n)** is the inverse Ackermann function - grows extremely slowly. For all practical purposes, it's O(1).

---

## 🎯 When to Use Disjoint Sets

Use Disjoint Sets when you need to:

1. **Track connected components** in graphs
2. **Detect cycles** in undirected graphs
3. **Group similar items** efficiently
4. **Answer connectivity queries** quickly

### Example Applications

- **Network connectivity** - Are two computers connected?
- **Image processing** - Are two pixels in the same region?
- **Social networks** - Are two users friends (directly or indirectly)?
- **Kruskal's algorithm** - Build minimum spanning tree

---

## 💡 Key Takeaways

1. **Start simple**: Each element is its own group
2. **Union by size**: Always attach smaller to larger
3. **Path compression**: Make future finds faster
4. **Two operations**: `find()` and `union()`
5. **Near-constant time**: α(n) complexity

---

> 🎓 **Master these two operations** and you can solve many connectivity problems efficiently!

---

## 📝 Quick Reference

```js
// Initialize
const ds = new DisjointSet(n);

// Find root (with path compression)
ds.findUParent(node);

// Union by size
ds.unionBySize(u, v);

// Check if same group
ds.findUParent(a) === ds.findUParent(b);
```
