// https://takeuforward.org/plus/dsa/problems/factorial-of-a-given-number-i

function fact(n) {
  if (n === 0) return 0;
  if (n <= 2) return n;
  return n * fact(n - 1);
}

console.log(fact(4));
