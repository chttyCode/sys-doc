---
sidebarDepth: 2
---

# 1. 数组、链表

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
var rotate = function(nums, k) {
  let len = nums.length;
  nums.unshift(...nums.splice(len - k));
  return nums;
};
// AC超时
var rotate = function(nums, k) {
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
var rotate = function(nums, k) {
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
var rotate = function(nums, k) {
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
