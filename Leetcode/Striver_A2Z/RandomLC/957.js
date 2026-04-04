// 957. Prison Cells After N Days [https://leetcode.com/problems/prison-cells-after-n-days/description/]

function prisonAfterNDays(cells, n) {
  // Helper function to compute the next day's state
  const getNextState = (current) => {
    const next = [0]; // First cell is always 0
    for (let i = 1; i < 7; i++) {
      // Cell becomes 1 if both neighbors are same (both 0 or both 1)
      next[i] = current[i - 1] === current[i + 1] ? 1 : 0;
    }
    next[7] = 0; // Last cell is always 0
    return next;
  };

  // Convert array to string for use as Map key
  const toKey = (arr) => arr.join('');

  const seen = new Map(); // Maps state -> day number when first seen
  let current = cells;
  let day = 0;

  while (day < n) {
    const key = toKey(current);

    if (seen.has(key)) {
      // Cycle detected! Calculate remaining days using modulo
      const cycleStart = seen.get(key);
      const cycleLength = day - cycleStart;
      const remainingDays = (n - day) % cycleLength;

      // Fast forward through remaining days
      for (let i = 0; i < remainingDays; i++) {
        current = getNextState(current);
      }
      return current;
    }

    seen.set(key, day);
    current = getNextState(current);
    day++;
  }

  return current;
}

// Example:
console.log(prisonAfterNDays([0, 1, 0, 1, 1, 0, 0, 1], 7)); // [0, 0, 1, 1, 0, 0, 0, 0]
