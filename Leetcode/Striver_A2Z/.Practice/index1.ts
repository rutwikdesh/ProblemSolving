// Problem Statement

// Given a string s, find the length of the longest substring without repeating characters.

// Examples

// Input: s = "abcabcbb"
// Output: 3

// Input: s = "bbbbb"
// Output: 1

// Input: s = "pwwkew"
// Output: 3

// map -> { a:1 }
// map -> { a:1, b:1 }
// map -> { a:1, b:1, c:1 }
// map -> { a:1, b:1, c:1 } -> bwd=0 -> res = fwd-bwd = 3
// map -> { a:3, b:1, c:1 } -> bwd=1 -> res = fwd-bwd = 3
// map -> { a:3, b:4, c:1 } -> bwd=1 -> res = fwd-bwd = 3

const solve = (s: string): number => {
  const m = new Map<string, number>();
  let max = 0;
  let i = 0,
    j = 0;
  while (j < s.length) {
    if (m.has(s[j])) {
      i = Math.max(i, m.get(s[j])!);
    }
    max = Math.max(max, j - i);
    m.set(s[j], j);
    j++;
  }
  return max;
};

console.log(solve("abcabcbb"));
console.log(solve("bbbbb"));
console.log(solve("pwwkew"));
