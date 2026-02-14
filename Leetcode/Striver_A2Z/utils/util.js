/* Function to count the 
    number of digits in N */
function countDigit(n) {
  let count = Math.floor(Math.log10(n)) + 1;
  return count;
}
