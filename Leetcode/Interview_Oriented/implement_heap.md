# 📚 Heap Implementation in JavaScript — Visual Guide

> A complete visual guide to understanding and implementing a **Min Heap** in JavaScript using array-based complete binary tree representation.

---

## 🌳 Step 1: Heap = Complete Binary Tree

A heap is a **complete binary tree** stored in an **array** using **level-order traversal**.

```
        2
      /   \
     4     7
    / \   /
   8   9 10
```

**Array representation (level order):**

```js
[2, 4, 7, 8, 9, 10];
```

| Level | Nodes    |
| ----- | -------- |
| 0     | 2        |
| 1     | 4, 7     |
| 2     | 8, 9, 10 |

> ✅ **Key insight**: No pointers needed — the array index _is_ the tree structure.

---

## 🔢 Step 2: Finding Children (Index Math)

```js
const heap = [2, 4, 7, 8, 9, 10];
```

| Index | 0   | 1   | 2   | 3   | 4   | 5   |
| ----- | --- | --- | --- | --- | --- | --- |
| Value | 2   | 4   | 7   | 8   | 9   | 10  |

```
            0(2)
          /      \
      1(4)       2(7)
     /   \       /
  3(8)  4(9)  5(10)
```

### Formulas

| Relationship    | Formula   | Example (i=2)                  |
| --------------- | --------- | ------------------------------ |
| **Left child**  | `2*i + 1` | `2*2+1 = 5` ✅                 |
| **Right child** | `2*i + 2` | `2*2+2 = 6` ❌ (out of bounds) |

> ✅ Index 5 exists (value `10`), index 6 doesn't — matches the tree perfectly.

---

## 🔼 Step 3: Finding Parent

Reverse the child formula:

```
parent = Math.floor((i - 1) / 2)
```

| Index | Value | Parent Index  | Parent Value |
| ----- | ----- | ------------- | ------------ |
| 5     | 10    | ⌊(5-1)/2⌋ = 2 | 7 ✅         |

> ✅ Node `10` (index 5) correctly sits under `7` (index 2).

---

## ➕ Step 4: Insert (Push) — _Bubble Up_

### Initial Heap

```
        2
      /   \
     4     7
    / \
   8   9
```

```js
[2, 4, 7, 8, 9];
```

### Insert `5`

```js
[2, 4, 7, 8, 9, 5]; // Append at end
```

```
        2
      /   \
     4     7
    / \   /
   8   9 5   ← Violation! 7 > 5
```

---

## 🫧 Step 5: Bubble Up (Sift Up)

```
        2
      /   \
     4     7     ← Compare 5 with parent (7)
    / \   /
   8   9 5
```

**Swap 7 ↔ 5**

```
        2
      /   \
     4     5     ← Compare 5 with parent (2)
    / \   /
   8   9 7
```

**5 ≥ 2** ✅ Heap property restored.

```js
// Before: [2, 4, 7, 8, 9, 5]
// After:  [2, 4, 5, 8, 9, 7]
```

### 🎬 Bubble Up Animation

```
Insert 5
[2,4,7,8,9]
    ↓
[2,4,7,8,9,5]
    ↓
Compare:  7
         /
        5
    ↓
Swap → [2,4,5,8,9,7]
    ↓
Done ✅
```

### 💻 Bubble Up Code

```js
function bubbleUp(heap, idx) {
  while (idx > 0) {
    const parent = (idx - 1) >> 1; // Math.floor((idx - 1) / 2)
    if (heap[parent] <= heap[idx]) break; // Min-heap property satisfied
    [heap[parent], heap[idx]] = [heap[idx], heap[parent]]; // swap
    idx = parent;
  }
}
```

---

## ➖ Step 6: Remove (Pop) — _Bubble Down_

### Initial Heap

```
        2
      /   \
     4     5
    / \   /
   8   9 7
```

```js
[2, 4, 5, 8, 9, 7];
```

### Remove Root (2)

1. Move last element (`7`) to root
2. Remove last element

```
        7           ← Violation! 7 > 4,5
      /   \
     4     5
    / \
   8   9
```

```js
[7, 4, 5, 8, 9];
```

---

## 🫧 Step 7: Bubble Down (Sift Down)

```
        7
      /   \
     4     5     ← Smaller child = 4
    / \
   8   9
```

**Swap 7 ↔ 4**

```
        4
      /   \
     7     5
    / \
   8   9
```

**7 ≤ 8,9** ✅ Stop.

```js
// Before: [7, 4, 5, 8, 9]
// After:  [4, 7, 5, 8, 9]
```

### 🎬 Bubble Down Animation

```
Remove 2
[2,4,5,8,9,7]
    ↓
Move last → [7,4,5,8,9]
    ↓
Swap with smaller child (4)
[4,7,5,8,9]
    ↓
Done ✅
```

### 💻 Bubble Down Code

```js
function bubbleDown(heap, idx) {
  const n = heap.length;

  while (true) {
    let smallest = idx;
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;

    if (left < n && heap[left] < heap[smallest]) {
      smallest = left;
    }
    if (right < n && heap[right] < heap[smallest]) {
      smallest = right;
    }
    if (smallest === idx) break; // Heap property satisfied

    [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]]; // swap
    idx = smallest;
  }
}
```

---

## ⚙️ The Two Core Operations

| Operation | Steps                                       |
| --------- | ------------------------------------------- |
| **PUSH**  | 1. Insert at end → 2. **Bubble Up** ↑       |
| **POP**   | 1. Move last to root → 2. **Bubble Down** ↓ |

> 💡 **Every heap method** (`push`, `pop`, `peek`, `size`) is built around these two fundamental reordering operations.

---

## ⏱️ Time Complexity

| Operation | Time     | Space |
| --------- | -------- | ----- |
| `peek()`  | O(1)     | O(1)  |
| `push()`  | O(log n) | O(1)  |
| `pop()`   | O(log n) | O(1)  |
| `size()`  | O(1)     | O(1)  |

> 💡 **Key insight**: Height of complete binary tree = ⌊log₂ n⌋ → bubble up/down traverses at most one path from leaf to root or root to leaf.

---

## 🧠 Complete MinHeap Implementation

```js
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // O(1)
  peek() {
    return this.heap[0];
  }

  // O(1)
  size() {
    return this.heap.length;
  }

  // O(log n)
  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  // O(log n)
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return min;
  }

  _bubbleUp(idx) {
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.heap[parent] <= this.heap[idx]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  _bubbleDown(idx) {
    const n = this.heap.length;

    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < n && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }
      if (right < n && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }
      if (smallest === idx) break;

      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];
      idx = smallest;
    }
  }
}
```

---

## 🎯 Quick Reference: Index Formulas

```
┌─────────────────────────────────────────────────────────────┐
│  PARENT(i)     = Math.floor((i - 1) / 2)   = (i - 1) >> 1  │
│  LEFT_CHILD(i) = 2 * i + 1                                  │
│  RIGHT_CHILD(i)= 2 * i + 2                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 💡 Key Takeaways

1. **Array = Tree** — No pointers needed; index math maps array ↔ tree
2. **Complete tree** — Always filled left-to-right, level-by-level
3. **Bubble Up** — Fix violations after insertion (leaf → root)
4. **Bubble Down** — Fix violations after removal (root → leaf)
5. **O(log n)** — Height of complete tree = ⌊log₂ n⌋
6. **Min vs Max Heap** — Flip comparison (`<` ↔ `>`) to switch

---

> 🎓 **Master these two patterns (bubble up / bubble down) and you can implement any heap variant from memory!**
