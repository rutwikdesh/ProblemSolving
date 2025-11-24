// 213. House Robber II [https://leetcode.com/problems/house-robber-ii/description/]

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);
  const temp = [...nums];
  temp.shift();
  nums.pop();
  const firstPortion = robHelper(nums);
  const secondPortion = robHelper(temp);
  return Math.max(firstPortion, secondPortion);
}

var robHelper = function (nums) {
  const dp = new Array(nums.length + 1).fill(-1);
  return fun(nums, 0, dp);
}

var fun = function (nums, ind, dp) {
  if (ind >= nums.length) return 0;
  if (ind === nums.length - 1) return nums[nums.length - 1];

  if (dp[ind] !== -1) return dp[ind];

  let pick = nums[ind] + fun(nums, ind + 2, dp);
  let notPick = fun(nums, ind + 1, dp);

  return dp[ind] = Math.max(pick, notPick);
}
