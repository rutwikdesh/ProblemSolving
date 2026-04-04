/* Function to count the 
    number of digits in N */
function countDigit(n: number) {
  let count = Math.floor(Math.log10(n)) + 1;
  return count;
}

console.log(countDigit(1234567));
