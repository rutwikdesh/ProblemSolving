// ? Second Largest Element in an Array without sorting

// * INFO: The idea is to keep track of the largest and second largest element while traversing the array. Initialize largest and secondLargest with -1.

// * Now, for any index i:
// * 1. If arr[i] > largest, update secondLargest with largest and largest with arr[i].
// * 2. Else If arr[i] < largest and arr[i] > secondLargest, update secondLargest with arr[i].

function getSecondLargest(arr) {
  const n = arr.length;

  let largest = -1, secondLargest = -1;

  for (let i = 0; i < n; i++) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    }
    else if (arr[i] < largest && arr[i] > secondLargest) {
      secondLargest = arr[i];
    }
  }
  return secondLargest;
}

const arr = [12, 35, 1, 10, 34, 1];
console.log(getSecondLargest(arr));
