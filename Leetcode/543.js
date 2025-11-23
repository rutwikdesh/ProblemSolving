//543. Diameter of Binary Tree [https://leetcode.com/problems/diameter-of-binary-tree/description/]

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  const ans = {
    value: 0
  }
  height(root, ans);
  return ans.value;
};

const height = function (root, ans) {
  if (root === null) return 0;

  const lHeight = height(root.left, ans);
  const rHeight = height(root.right, ans);
  const curr = lHeight + rHeight;

  ans.value = Math.max(ans.value, curr);

  return 1 + Math.max(lHeight, rHeight);
}

console.log(diameterOfBinaryTree([1, 2, 3, 4, 5]));
