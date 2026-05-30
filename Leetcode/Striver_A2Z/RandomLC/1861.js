/**
 * @param {character[][]} boxGrid
 * @return {character[][]}
 */
var rotateTheBox = function (boxGrid) {
  const rows = boxGrid.length;
  const cols = boxGrid[0].length;

  const ans = Array.from({ length: cols }, () => Array.from({ length: rows }, () => "."));

  for (let i = 0; i < rows; i++) {
    let low = cols - 1;
    for (let j = cols; j >= 0; j--) {
      if (boxGrid[i][j] === '*') {
        ans[j][i] = '*';
        low = j - 1;
      } else if (boxGrid[i][j] === '#') {
        console.log(`low=${low}`)
        ans[low][i] = '#';
        low--;
      }
    }
  }

  return ans.map((arr) => arr.reverse());
};

const boxGrid = [["#", "#", "*", ".", "*", "."],
["#", "#", "#", "*", ".", "."],
["#", "#", "#", ".", "#", "."]];

console.log(rotateTheBox(boxGrid));
