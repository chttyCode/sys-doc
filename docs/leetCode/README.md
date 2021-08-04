---
sidebarDepth: 2
---

# LeetCode

## 1. Array & Link

- Link

  - 206 ✅
  - 24 ✅
  - 141 ✅
  - 142 ✅
  - 25 ✅

- Array

  - 11 ✅
  - 283 ✅
  - 70 ✅
  - 15 ✅

  - 26
  - 189
  - 21
  - 88
  - 1
  - 283
  - 66

- 26
  > 注意点：1. 该数组是有序数组 2. 隐式要求就是要去返回重数组，不仅是长度  
  
    - 暴力解法
    > 可正逆向删除，逆向优先

    ```js
    function removeDuplicates(nums) {
      for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] === nums[i - 1]) {
          nums.splice(i, 1);
        }
      }
      return nums.length;
    }
    ```

    - 双指针
    > 快慢指针，慢指针维护不重复数组的下标，快指针负责遍历数组

    ```js
    var removeDuplicates = function(nums) {
      const n = nums.length;
      if (n === 0) {
        return 0;
      }
      let fast = 1,
        slow = 1;
      while (fast < n) {
        if (nums[fast] !== nums[fast - 1]) {
          nums[slow] = nums[fast];
          ++slow;
        }
        ++fast;
      }
      return slow;
    };
    ```

## 2. 队列、栈、双端队列

## 3. hash 表、映射、集合

## 4. 树、二叉树

## 5. 泛型递归、树的递归

## 6. 分治、回溯

## 7. 深度、广度优先搜索

## 8. 贪心算法

## 9. 二分查找

## 10. 动态规划

## 11. 字典树、并查集

## 12. 高级搜索

## 13. 红黑树、AVL 树

## 14. 位运算

## 15. 布鲁过滤器、LRU 缓存

## 16. 排序算法

## 17. 高级动态规划

## 18. 字符串

> vscode 刷题配置 https://juejin.cn/post/6844904105782018055
