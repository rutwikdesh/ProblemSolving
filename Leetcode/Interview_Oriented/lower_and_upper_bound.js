// a number which is just greater than or equal to the target
const lowerBound = (arr, target) => {
  let low = 0, high = arr.length;

  while (low < high) {
    let mid = (low + high) >> 1;
    if (arr[mid] >= target) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return high;
}

let arr = [1, 2, 3, 3, 4, 8, 9, 11, 25];
let target = 3;
console.log(`Lower Bound is ${arr[lowerBound(arr, target)]}`);
// o/p: 3


// a number which is just greater than the target
const upperBound = (arr, target) => {
  let low = 0, high = arr.length;

  while (low < high) {
    let mid = (low + high) >> 1;
    if (arr[mid] > target) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return high;
}

// let arr = [1, 2, 3, 3, 4, 8, 9, 11, 25];
// let target = 3;
console.log(`Upper Bound is ${arr[upperBound(arr, target)]}`);
// o/p: 4
