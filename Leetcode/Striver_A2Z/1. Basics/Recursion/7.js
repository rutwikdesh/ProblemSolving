// https://takeuforward.org/plus/dsa/problems/reverse-an-array

function reverse(arr, start, end) {
  if (start >= end) return arr;
  let temp = arr[start];
  arr[start] = arr[end];
  arr[end] = temp;
  return reverse(arr, start + 1, end - 1);
}

console.log(reverse([1, 2, 3, 4, 5], 0, 4));
