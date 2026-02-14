// https://leetcode.com/problems/split-array-into-consecutive-subsequences/

function isPossible(nums: number[]): boolean {
  const am = new Map(); // availability map
  const vm = new Map(); // vacancy map

  for (let num of nums) {
    am.set(num, (am.get(num) || 0) + 1);
  }

  // Every num has 2 options
  // 1. become part of existing group
  // 2. create new group
  for (let num of nums) {
    if (am.get(num) <= 0) continue;
    // option 1
    if (vm.has(num) && vm.get(num) >= 1) {
      am.set(num, (am.get(num) || 0) - 1);
      vm.set(num, vm.get(num) - 1);
      vm.set(num + 1, (vm.get(num + 1) || 0) + 1);
    } else if (
      am.get(num) >= 1 &&
      am.get(num + 1) >= 1 &&
      am.get(num + 2) >= 1
    ) {
      am.set(num, (am.get(num) || 0) - 1);
      am.set(num + 1, (am.get(num + 1) || 0) - 1);
      am.set(num + 2, (am.get(num + 2) || 0) - 1);
      // add vm for next num
      vm.set(num + 3, (vm.get(num + 3) || 0) + 1);
    } else {
      return false;
    }
  }

  return true;
}
