## Rolling Hash Template

```javascript
function rollingHashTemplate(s) {
  const n = s.length;

  const base = 31;
  const mod = 1e9 + 7;

  let hash = 0;
  let power = 1;

  for (let i = 0; i < n; i++) {
    const val = s.charCodeAt(i) - 96;

    // build hash
    hash = (hash * base + val) % mod;

    // update power if needed
    power = (power * base) % mod;
  }

  return hash;
}
```

> 💡 **Note**: This basic template alone isn't sufficient for most problems. Below are the practical patterns you'll actually use in interviews.

---

### 🔥 1. Substring Matching (Most Common Use Case)

```javascript
function findPattern(text, pattern) {
  const n = text.length,
    m = pattern.length;
  if (m > n) return [];

  const base = 31;
  const mod = 1e9 + 7;

  let pHash = 0,
    wHash = 0,
    power = 1;
  const res = [];

  // Calculate base^(m-1) % mod for removing the leftmost character
  for (let i = 0; i < m - 1; i++) {
    power = (power * base) % mod;
  }

  // Calculate initial hashes for pattern and first window of text
  for (let i = 0; i < m; i++) {
    pHash = (pHash * base + (pattern.charCodeAt(i) - 96)) % mod;
    wHash = (wHash * base + (text.charCodeAt(i) - 96)) % mod;
  }

  // Slide the window over the text
  for (let i = 0; i <= n - m; i++) {
    // Check if hashes match (potential match found)
    if (pHash === wHash) {
      // Verify actual string match to handle hash collisions
      if (text.slice(i, i + m) === pattern) {
        res.push(i);
      }
    }

    // Calculate hash for next window (if not at the end)
    if (i < n - m) {
      const oldChar = text.charCodeAt(i) - 96;
      const newChar = text.charCodeAt(i + m) - 96;

      // Remove leftmost character, shift window, add new character
      wHash = (wHash - ((oldChar * power) % mod) + mod) % mod;
      wHash = (wHash * base + newChar) % mod;
    }
  }

  return res;
}
```

---

### 🔥 2. Prefix Palindrome (LC 214 Style)

```javascript
function longestPalPrefix(s) {
  const n = s.length;

  const base = 31;
  const mod = 1e9 + 7;

  let forward = 0; // Hash of string read forwards
  let reverse = 0; // Hash of string read backwards
  let power = 1; // base^i % mod

  let maxLen = 0;

  for (let i = 0; i < n; i++) {
    const val = s.charCodeAt(i) - 96;

    // Update forward hash: hash = hash * base + val
    forward = (forward * base + val) % mod;

    // Update reverse hash: hash = hash + val * base^i
    reverse = (reverse + ((val * power) % mod)) % mod;

    // If hashes match, we have a palindrome prefix
    if (forward === reverse) {
      maxLen = i + 1;
    }

    // Update power for next iteration
    power = (power * base) % mod;
  }

  return maxLen;
}
```

---

### 🧠 Mental Template to Remember

These are the core operations you'll use repeatedly:

**🔹 Build hash** (extend window to the right)

```javascript
hash = (hash * base + val) % mod;
```

**🔹 Slide window** (remove left, add right)

```javascript
// Remove leftmost character's contribution
hash = (hash - ((oldChar * power) % mod) + mod) % mod;
// Shift window and add new character
hash = (hash * base + newChar) % mod;
```

**🔹 Reverse hash** (for palindrome detection)

```javascript
// For reverse hash: hash = hash + val * base^i
reverse = (reverse + val * power) % mod;
```

> ⚠️ **Important**: Always use a large prime modulus (like 1e9+7) to minimize collisions, and verify string equality when hashes match in substring search.
