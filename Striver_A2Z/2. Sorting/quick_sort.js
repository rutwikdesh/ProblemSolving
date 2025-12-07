function partition(arr, low, high) {
  let pivot = arr[low];
  let i = low;
  let j = high;

  while (i < j) {
    while (arr[i] <= pivot && i < high) {
      i++;
    }
    while (arr[j] > pivot && j > low) {
      j--;
    }
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[low], arr[j]] = [arr[j], arr[low]];
  return j;
}

function quickSort(arr, low, high) {
  if (low < high) {
    let pIndex = partition(arr, low, high);
    quickSort(arr, low, pIndex - 1);
    quickSort(arr, pIndex + 1, high);
  }
}

function sortArray(arr) {
  quickSort(arr, 0, arr.length - 1);
  return arr;
}

const arr = [4, 6, 2, 5, 7, 9, 1, 3];
console.log("Original Array:", arr);
sortArray(arr);
console.log("Sorted Array:", arr);
