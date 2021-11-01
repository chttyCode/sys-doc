---
sidebarDepth: 2
---

# 1. 数组

- 定义：是一种线性表结构数据、使用连续内存、存储类型选相同的数据
  - 线性表(可以类比线性方程),即一条直线，特点是每个数据只有前后关系
  - 连续内存，可以快速访问、缺点是增删会造成群移操作
    - 有序数组的插入，
      - 方法一：群移+插入
      - 方法二：插入指定位置，将该位置添加到末尾，快排序的思想
    - 数组的删除
      - 追个删除，每次删除都会引起数组内的群移操作
      - 标记删除，遍历记录待删除项，最后删除，引起一次数组群移操作
- 数组快速访问

  - 计算机按地址寻值
  - 数组申请内存的方式是
    - 申请首址，base_address，后续为连续地址
  - 计算机寻址
    ```js
      a[i]_address = base_address + i * data_type_size
    ```
  - 数组下标为从 0 开始
    - 方便计算寻址地址，首址 base_address + 0 \* data_type_size
    - C 语言设计者用 0 开始计数数组下标，之后的 Java、JavaScript 等高级语言都效仿了 C 语言

- Array

  - 11 ✅
  - 283 ✅
  - 70 ✅
  - 15 ✅

  - 26 ✅ => 80 ✅
  - 189
  - 21
  - 88
  - 1
  - 283
  - 66

## 26

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
// 便于理解80题的解法
var removeDuplicates = function(nums) {
  const n = nums.length;

  let fast = 0,
    slow = 0;
  while (fast < n) {
    if (nums[slow] !== nums[fast]) {
      nums[++slow] = nums[fast];
    }
    return slow;
  };
```

## 189

> 向右平移旋转数组

- 暴力解法

```js
// unshift支持批量塞入、splice包含当前小标，且支持
var rotate = function (nums, k) {
  let len = nums.length;
  nums.unshift(...nums.splice(len - k));
  return nums;
};
// AC超时
var rotate = function (nums, k) {
  let len = nums.length;
  k = k % len;
  while (k > 0) {
    nums.unshift(nums.pop(nums[len - 1]));
    k--;
  }
  return nums;
};
```

- 创建新数组，将每一项放到最终该放的位置上

```js
var rotate = function (nums, k) {
  let len = nums.length;
  let newArray = new Array(len);
  k %= len;
  for (let i = 0; i < len; i++) {
    newArray[(i + k) % len] = nums[i];
  }
  newArray.forEach((val, i) => {
    nums[i] = val;
  });
  return nums;
};
```

- 在原数组上进行翻转

```js
var rotate = function (nums, k) {
  function reverse(nums, start, end) {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  }
  let len = nums.length;
  k %= len;
  reverse(nums, 0, len - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, len - 1);
  return nums;
};
```
