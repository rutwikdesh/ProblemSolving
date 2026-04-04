function getDivisors(n: number): number[] {
  const divisors: number[] = [];

  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      divisors.push(i);

      if (i !== n / i) {
        divisors.push(n / i);
      }
    }
  }

  return divisors.sort((a, b) => a - b);
}
