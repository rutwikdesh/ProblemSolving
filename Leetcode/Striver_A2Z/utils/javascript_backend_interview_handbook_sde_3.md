# 🚀 JavaScript Backend / Full-Stack Interview Handbook (SDE-3)

A high-signal, senior-level reference for JavaScript interviews focused on backend & full-stack roles. Emphasis on correctness, performance, concurrency, and real-world patterns.

---

## 🧠 Core Language Gotchas (Must Know)

### Event Loop (Macro vs Micro Tasks)
```js
// Order: sync -> microtasks -> macrotasks
console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve().then(() => console.log(3));

console.log(4);
// Output: 1 4 3 2
```

### this Binding (call / apply / bind)
```js
function greet() { return `Hi ${this.name}`; }
const user = { name: 'A' };

greet.call(user);
greet.apply(user);
const fn = greet.bind(user);
fn();
```

### Closures
```js
function counter() {
  let count = 0;
  return () => ++count;
}
```

---

## ⚡ Async Patterns

### Promise Utilities
```js
const all = (promises) => Promise.all(promises);
const race = (promises) => Promise.race(promises);
```

### Retry with Exponential Backoff
```js
async function retry(fn, retries = 3, delay = 100) {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;
    await new Promise(r => setTimeout(r, delay));
    return retry(fn, retries - 1, delay * 2);
  }
}
```

### Concurrency Limit (p-limit style)
```js
async function runWithLimit(tasks, limit) {
  const res = [];
  let i = 0;

  const workers = Array.from({ length: limit }, async () => {
    while (i < tasks.length) {
      const idx = i++;
      res[idx] = await tasks[idx]();
    }
  });

  await Promise.all(workers);
  return res;
}
```

---

## 📦 Data Handling

### Deep Clone (structuredClone preferred)
```js
const clone = (obj) => structuredClone(obj);
```

### Flatten Object
```js
function flatten(obj, prefix = '', res = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      flatten(v, key, res);
    } else {
      res[key] = v;
    }
  }
  return res;
}
```

### Deep Equal
```js
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const k of keysA) {
    if (!deepEqual(a[k], b[k])) return false;
  }

  return true;
}
```

---

## 🧵 Functional Utilities

### Debounce
```js
function debounce(fn, delay) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### Throttle
```js
function throttle(fn, limit) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= limit) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```

### Memoize
```js
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const res = fn.apply(this, args);
    cache.set(key, res);
    return res;
  };
}
```

---

## 🌐 Backend Patterns

### Simple LRU Cache
```js
class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  put(key, val) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, val);

    if (this.map.size > this.cap) {
      const first = this.map.keys().next().value;
      this.map.delete(first);
    }
  }
}
```

### Rate Limiter (Token Bucket)
```js
class RateLimiter {
  constructor(limit, interval) {
    this.limit = limit;
    this.tokens = limit;
    this.interval = interval;

    setInterval(() => {
      this.tokens = Math.min(this.limit, this.tokens + 1);
    }, interval);
  }

  allow() {
    if (this.tokens > 0) {
      this.tokens--;
      return true;
    }
    return false;
  }
}
```

---

## 🧪 API Handling

### Fetch with Timeout
```js
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal: controller.signal });
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}
```

---

## 🔐 Security Awareness

- Avoid prototype pollution (`Object.create(null)` for maps)
- Validate inputs (never trust client)
- Handle JSON parsing safely

---

## ⚙️ Performance Patterns

- Use streaming for large data
- Avoid blocking event loop (CPU heavy → worker threads)
- Prefer O(1)/O(log n) structures

---

## 📌 SDE-3 Expectations

- Explain **tradeoffs clearly**
- Think in **systems, not just functions**
- Optimize for **latency + scalability**
- Show **real-world constraints (timeouts, retries, failures)**

---

🔥 Revise this regularly — this aligns with real backend interview expectations.

