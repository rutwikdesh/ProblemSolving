function findPattern(text, pattern) {
  const n = text.length, m = pattern.length;
  if (m > n) return [];

  const base = 31;        // smaller, easier to reason
  const mod = 1e9 + 7;

  let pHash = 0, wHash = 0, power = 1;
  const res = [];

  // compute base^(m-1)
  for (let i = 0; i < m - 1; i++) {
    power = (power * base) % mod;
  }

  // initial hashes
  for (let i = 0; i < m; i++) {
    pHash = (pHash * base + (pattern.charCodeAt(i) - 96)) % mod;
    wHash = (wHash * base + (text.charCodeAt(i) - 96)) % mod;
  }

  for (let i = 0; i <= n - m; i++) {
    if (pHash === wHash) {
      if (text.slice(i, i + m) === pattern) {
        res.push(i);
      }
    }

    if (i < n - m) {
      // remove left char
      wHash = (wHash - (text.charCodeAt(i) - 96) * power % mod + mod) % mod;

      // shift + add next char
      wHash = (wHash * base + (text.charCodeAt(i + m) - 96)) % mod;
    }
  }

  return res;
}

//*    hash = hash * base + value

//?    now to add next char, do -> 
//*    wHash * base
//?    as pre-req (to update existing string)
