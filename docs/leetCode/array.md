---
sidebarDepth: 2
---

# 数组

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

  ```js
    <!-- 盛水最多 -->
    <!-- 1. 暴力解法、时间O(n^2) 空间O(1)-->
    <!-- 2. 双指针左右夹逼:向内移动短板 时间O(n) 空间O(1)-->

    <!-- 三元写法 -->
    res = height[i] < height[j] ?
        Math.max(res, (j - i) * height[i++]):
        Math.max(res, (j - i) * height[j--]);
  ```

* 283 ✅
* 70 ✅
* 15 ✅

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

  - 26 ✅

  ```js
    <!-- 双指针:i 记录不重复位置 j遍历指针 -->

    var removeDuplicates = function (nums) {
    let i = 0;
    for (let j = 0; j < nums.length; j++) {
        if (nums[i] !== nums[j]) {
        nums[++i] = nums[j];
        }
    }
    return i + 1;
    };

    <!-- 记数,记录重复的个数 -->
    var removeDuplicates = function (nums) {
    let n = 0;
    for (let j = 1; j < nums.length; j++) {
        if (nums[j - 1] === nums[j]) {
        n++;
        } else {
        nums[j - n] = nums[j];
        }
    }
    return nums.length - n;
    };
  ```

  - 80 ✅

  ```js
    <!-- 双指针,i 记录可重复2次有序位置，与有序数组的倒数第二个做对比 -->
    var removeDuplicates = function (nums) {
    let i = 0;
    for (let j = 0; j < nums.length; j++) {
        if (j < 2 || nums[j] > nums[j - 2]) {
        nums[i++] = nums[j];
        }
    }
    return i;
    };
  ```

- 189
  > 向右平移数组

```js
// 粗暴解法：截取-拼接
var rotate = function (nums, k) {
  k %= nums.length;
  nums.unshift(...nums.splice(nums.length - k));
};

// 翻转

var rotate = function (nums, k) {
  k %= nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
};

let reverse = function (nums, start, end) {
  while (start < end) {
    [nums[start++], nums[end--]] = [nums[end], nums[start]];
  }
};
```

- 21
  > 合并两有链表

```js
// 递归
var mergeTwoLists = function (l1, l2) {
  //  递归终结条件
  if (l1 === null) {
    return l2;
  } else if (l2 === null) {
    return l1;
  }
  //   处理当前层
  if (l1.val < l2.val) {
    //  下探
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    //  下探
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
// 递推
var mergeTwoLists = function (l1, l2) {
  //  创建空节点
  const head = new ListNode();
  let current = head;
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
  }
  current.next = l1 === null ? l2 : l1;
  return head.next;
};
```

- 88
```js
<!-- 双指针 顺序 时间复杂度：O(n) 空间复杂度O(n)：1. 想到了双指针 2. 没有建立copy数组，导致取值有问题 3. 双指针比较大小 -->
  var merge = function (nums1, m, nums2, n) {
  let copyNums1 = nums1.slice();
  let len = m + n;
  let x = (y = 0);
  for (let i = 0; i < len; i++) {
    let cur;
    if (y >= n) {
      cur = copyNums1[x++];
    } else if (x >= m) {
      cur = nums2[y++];
    } else if (copyNums1[x] > nums2[y]) {
      cur = nums2[y++];
    } else {
      cur = copyNums1[x++];
    }
    nums1[i] = cur;
  }
};
<!-- 双指针 逆序优势不用拷贝数组 时间复杂度O(n),控件复杂度O(1) -->
var merge = function (nums1, m, nums2, n) {
  let len = m + n;
  let x = m - 1,
    y = n - 1;
  for (let i = len - 1; i >= 0; i--) {
    if (y < 0) {
      cur = nums1[x--];
    } else if (x < 0) {
      cur = nums2[y--];
    } else if (nums1[x] > nums2[y]) {
      cur = nums1[x--];
    } else {
      cur = nums2[y--];
    }
    nums1[i] = cur;
  }
};
<!-- 甚是妙哉，因为是有序且是nums2 mergeto nums1 所以只需关注nums2是否已合入 -->
var merge = function (nums1, m, nums2, n) {
  let len = m + n - 1;
  let x = m - 1;
  let y = n - 1;
  while (y >= 0) {
    if (x < 0 || nums2[y] >= nums1[x]) {
      nums1[len--] = nums2[y--];
    } else {
      nums1[len--] = nums1[x--];
    }
  }
};
```
- 1
- 283
- 66
