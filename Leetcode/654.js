/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
  if (!nums || nums.length === 0) return null;

  // Find the maximum value and its index
  let maxVal = -Infinity;
  let maxIndex = -1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > maxVal) {
      maxVal = nums[i];
      maxIndex = i;
    }
  }

  // Create the root node with the maximum value
  let root = new TreeNode(maxVal);

  // Recursively build the left subtree from the left part of the array
  root.left = constructMaximumBinaryTree(nums.slice(0, maxIndex));

  // Recursively build the right subtree from the right part of the array
  root.right = constructMaximumBinaryTree(nums.slice(maxIndex + 1));

  return root;
};
