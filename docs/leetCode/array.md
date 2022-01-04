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

# 链表

- 链表就通过指针将一组零散的地址串联起来使用的一种数据结构
- 数组能够随机访问，是因为使用了寻址公式，链表只能从头指针开始一个一个遍历查找
- 数组使用的是连续内存地址，链表使用一组零散内存串联起来使用
  - 数组这种使用连续内存，对 CPU 缓存比较友好，可以借助预读数组中的数据，提高访问效率，链表无法预读
  - 缺点内存大小固定，存在动态扩容拷贝数据的问题
  - 链表频繁的增删存在增加 GC
- 链表:
  - 单链表通过一种空间换时间的思想，来衍生出双向链表、循环链表
  - 重要的思想
    - 空间换时间(空间足够时，可以考虑牺牲空间来换时间)、时间换空间(在空间比较珍贵时，可以考虑使用时间来换空间)
- 缓存的方式(可以类比，买了很多书，需要整理的时候)
  - 先进先出
  - 使用最少
  - 最近最少使用
- 单链表实现 LRU 缓存淘汰算法(当一个新数据被访问时) 时间复杂度为 O(n)
  - 如果此数据缓存中已存在，这遍历找到对应的节点，删除原节点，添加在头结点
  - 如果数据缓存中不存在 - 如果数据未满，在头节点插入新数据 - 如果数据已满，删除尾节点，将新数据插入头结点

> CPU 缓存机制:CPU 在从内存读取数据的时候，会先把读取到的数据加载到 CPU 的缓存中。而 CPU 每次从内存读取数据并不是只读取那个特定要访问的地址，而是读取一个数据块(这个大小我不太确定。。)并保存到 CPU 缓存中，然后下次访问内存数据的时候就会先从 CPU 缓存开始查找，如果找到就不需要再从内存中取。这样就实现了比内存访问速度更快的机制，也就是 CPU 缓存存在的意义:为了弥补内存访问速度过慢与 CPU 执行速度快之间的差异而引入。

- Linked List

- 206
- 24
- 141
- 142
- 25

- test
  - 26 ✅ => 80 ✅
  - 189
  - 21
  - 88
  - 1
  - 283
  - 66
