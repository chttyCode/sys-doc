/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
  let isBalance = true;
  function getDepth(node) {
    //如果已经找到不平衡的树枝，不需要递归，直接返回
    if (!isBalance) {
      return 0;
    }
    if (node == null) {
      return 0;
    }
    const left = getDepth(node.left);
    const right = getDepth(node.right);
    //判断左右树枝是否平衡，如果不平衡更新减枝变量
    if (Math.abs(left - right) > 1) {
      isBalance = false;
    }
    return Math.max(left, right) + 1;
  }
  if (root == null) {
    return true;
  }
  getDepth(root);
  return isBalance;
};
