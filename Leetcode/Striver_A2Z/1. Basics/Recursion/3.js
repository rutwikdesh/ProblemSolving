// https://takeuforward.org/recursion/print-1-to-n-using-recursion

function solve(a, b) {
  if (b < a) return;
  console.log(a);
  if (a === b) return;
  solve(a + 1, b);
}

solve(1, 10);
