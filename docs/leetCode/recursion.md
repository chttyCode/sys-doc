# 递归

## 习题

- 04.04. 检查平衡性

  > 实现一个函数，检查二叉树是否平衡。在这个问题中，平衡树的定义如下：任意一个节点，其两棵子树的高度差不超过 1。

  ```js
  <!-- 第一想法暴力无从下手 -->
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
  ```
