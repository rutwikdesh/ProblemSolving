/* Function to count the 
    number of digits in N */
function countDigit(n: number) {
  let count = Math.floor(Math.log10(n)) + 1;
  return count;
}

console.log(countDigit(1234567));

// ar, st, ll, tree, graph, bs, 2p, qu, heap, hashmap, sliding window, backtraking, greedy, dp, recursion, bfs, monotonic stack, prefix sum, bit manupulation\
const connections = [
  [0, 1],
  [1, 2],
  [2, 0],
  [1, 3],
];
const m = new Map();
for (let [a, b] of connections) {
  m.set(a, [...(m.get(a) || []), b]);
  m.set(b, [...(m.get(b) || []), a]);
}
