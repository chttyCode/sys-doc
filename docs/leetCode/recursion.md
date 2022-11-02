# 递归

## 递归的理解

## 递归的模版

## 习题

- [70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)
- [22. 括号生成](https://leetcode.cn/problems/generate-parentheses/)
- [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/description/)
- [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)
- [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree)
- [111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)
- [297. 二叉树的序列化与反序列化](https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/)
- [77. 组合](https://leetcode.cn/problems/combinations/)
- [46. 全排列](https://leetcode.cn/problems/permutations/)
- [47. 全排列 II](https://leetcode-cn.com/problems/permutations-ii/)

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
