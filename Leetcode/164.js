/**
 * Helper: Returns the digit in 'num' at the given 'place'
 * getDigit(12345, 0) => 5
 * getDigit(12345, 1) => 4
 */
function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

/**
 * Helper: Returns how many digits are in a number
 * digitCount(456) => 3
 */
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

/**
 * Helper: Finds the max number of digits in the entire array
 */
function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

function radixSort(nums) {
  let maxDigitCount = mostDigits(nums);

  for (let k = 0; k < maxDigitCount; k++) {
    // 1. Create 10 empty buckets (0-9)
    let digitBuckets = Array.from({ length: 10 }, () => []);

    // 2. Put each number into a bucket based on its kth digit
    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }

    // 3. Reconstruct the array from the buckets
    nums = [].concat(...digitBuckets);
    // console.log(digitBuckets)
    console.log([].concat(...digitBuckets))
  }

  return nums;
}

// Example usage:
const unsorted = [23, 345, 5467, 12, 2345, 9852];
console.log(radixSort(unsorted)); // [12, 23, 345, 2345, 5467, 9852]