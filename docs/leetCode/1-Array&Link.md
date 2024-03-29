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

## 数组习题

- 11 ✅

  > 盛最多水的容器-找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水

  ```js
    <!-- 盛水最多 -->
    <!-- 1. 暴力解法、时间O(n^2) 空间O(1)-->
    <!-- 2. 双指针左右夹逼:向内移动短板 时间O(n) 空间O(1)-->

    <!-- 三元写法 -->
    res = height[i] < height[j] ?
        Math.max(res, (j - i) * height[i++]):
        Math.max(res, (j - i) * height[j--]);
  ```

- 70 ✅

  > 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
  > 分治是一种思想，实现分治的方式可以是递归、递推。
  > 可以使用分治的条件是存在子问题，切子问题的解决方式相同

  ```js
  /**
   * @param {number} n
   * @return {number}
   * 存在子问题
   * 子问题解决方案相同
   * 存在边界条件
   */
  var climbStairs = function(n) {
    if(n<=2)return n
    return climbStairs(n-1) + climbStairs(n-2)
  };
  
  // 分治的递推实现
  function climStarts(n){
    if (n <= 2) return n;
    let f1 = 1;
    let f2 = 2;
    let f3 = f2 + f1;
    let i = 3;
    while (i <= n) {
      f3 = f2 + f1;
      f1 = f2;
      f2 = f3;
      i++;
    }
    return f3;
  }
  
  // 构造数组实现分治递推
  function climbStairs(n) {
    if (n <= 2) return n;
    const arr = new Array(n);
    arr[0] = 1;
    arr[1] = 2;
    let i = 2;
    while (i < n) {
      arr[i] = arr[i - 1] + arr[i - 2];
      i++;
    }
    return arr[arr.length - 1];
  }

  
  ```

- 1 ✅

  > 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。

  ```js
  <!-- 双循环 -->
  <!--  hashMap -->
  var twoSum = function (nums, target) {
    const mapV = {};
    for (let i = 0; i < nums.length; i++) {
      if (mapV[nums[i]] === 0 || mapV[nums[i]]) {
        return [mapV[nums[i]], i];
      } else {
        mapV[target - nums[i]] = i;
      }
    }
  };
  ```

- 15 ✅

  > 三数之和

  ```js
  <!-- 三数之和 1. 三数之和等于0 循环+双指针,2.去重，条件判断*逻辑要清晰 -->
  function threeSum(nums){
  const result = [];
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
      let left = i + 1;
      let right = nums.length - 1;
      if (nums[i] > 0) break;
      if (nums[i] === nums[i - 1]) continue;
      while (left < right) {
        let sum = nums[i] + nums[left] + nums[right];
        if (sum === 0) {
          result.push([nums[i], nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) {
            left++;
          }
          while (left < right && nums[right] === nums[right - 1]) {
            right--;
          }
          left++;
          right--;
        } else if (sum < 0) {
          left = left + 1;
        } else {
          right = right - 1;
        }
      }
    }
    return result;
  }
  ```

- 26 ✅

  > 给你一个 升序排列 的数组 nums ,请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。

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

  > 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。

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

- 189 ✅

  > 给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

  ```js
  // 粗暴解法：截取-拼接
  var rotate = function(nums, k) {
    k %= nums.length;
    nums.unshift(...nums.splice(nums.length - k));
  };

  // 翻转

  var rotate = function(nums, k) {
    k %= nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
  };

  let reverse = function(nums, start, end) {
    while (start < end) {
      [nums[start++], nums[end--]] = [nums[end], nums[start]];
    }
  };
  ```

- 88 ✅

  > 合并有序数组，给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

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

- 283:零移问题 ✅

```js
// 暴力解法：遇零删除，最后补零，顺序遍历，遇零删除是需要将下标回退
var moveZeroes = function(nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      i--;
      j++;
    }
  }

  while (j > 0) {
    nums.push(0);
    j--;
  }
};
```

```js
// 暴力逆序遍历，较顺序遍历的优点是无需对下标进行回退操作，时间复杂度、操作依然复杂
var moveZeroes = function(nums) {
  let j = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      j++;
    }
  }
  while (j > 0) {
    nums.push(0);
    j--;
  }
};
```

```js
// 双指针法，数组常用操作，时间复杂度O(n)，依然需要进行补零操作
var moveZeroes = function(nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j++] = nums[i];
    }
  }
  while (nums.length - j > 0) {
    nums[j++] = 0;
  }
};
```

```js
// 号称滚雪球操作，较双指针法时间复杂度相同，思想有区别，会统计0的个数，进行滚动
var moveZeroes = function(nums) {
  let snow = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      snow++;
    } else if (snow > 0) {
      // 滚动雪球
      nums[i - snow] = nums[i];
      nums[i] = 0;
    }
  }
};
```

- 66 ✅

  > 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。

  ```js
  <!--错误的想法进入了死胡同，暴力解题无果、先入为主的思想就是找相关性、找规律只要后一位是0,当前位置就加1，但是陷入了边界条件的判断在中了，还有就是都进一位，数组长度加1的场景直接把我赶崩溃了  -->
  var plusOne = function (digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
      let cur = digits[i];

      digits[i] =
        (cur + (digits[i + 1] === 0 || i === digits.length - 1 ? 1 : 0)) % 10;
    }
    return digits;
  };
  ```

  ```js
  <!-- 暴力无果，确实存在前后两位的相关性，但是重点分析后一位即可完成需求-->
  var plusOne = function (digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
      if (digits[i] === 9) {
        digits[i] = 0;
      } else {
        digits[i] += 1;
        return digits;
      }
    }
    digits.unshift("1");
    return digits;
  };

  ```

# 链表定义

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

## 链表习

- 21

  > 合并两有链表

  ```js
  // 递归
  var mergeTwoLists = function(l1, l2) {
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
  var mergeTwoLists = function(l1, l2) {
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
  <!-- 主要区别于递推1的场景、融合了特殊情况的判断，还是方案1逻辑更为清晰易懂 -->
  var mergeTwoLists = function (list1, list2) {
    const head = new ListNode();
    let pre = head;
    while (list1 || list2) {
      if (list1 === null) {
        pre.next = list2;
        list2 = list2.next;
        pre = pre.next;
        break;
      }
      if (list2 === null) {
        pre.next = list1;
        list1 = list1.next;
        pre = pre.next;
        break;
      }
      if (list1.val < list2.val) {
        pre.next = list1;
        list1 = list1.next;
      } else {
        pre.next = list2;
        list2 = list2.next;
      }
      pre = pre.next;
    }
    return head;
  };
  ```

- 206:翻转链表

  > 递归，跟普通的递归有些区别，正常的都是 1. 终结条件 2.处理当前层 3. 下探到下一层 4. 变量清除

  ```js
  function reverseList(head) {
    // 递归终结条件
    if (head === null || head.next === null) {
      return head;
    }
    // 下探都下一层
    const newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
  }
  ```

  > 递推，有些类似双指针

  ```js
  function reverseList(head) {
    let pre = null;
    while (head) {
      const next = head.next;
      head.next = pre;
      pre = head;
      head = next;
    }
    return pre;
  }
  ```

- 24：链表两两翻转

```js
// 递推，构建一个两两翻转的前节点出来，注意翻转的节奏
var swapPairs = function(head) {
  const pre = new ListNode();
  pre.next = head;
  let temp = pre;
  while (temp.next !== null && temp.next.next !== null) {
    let first = temp.next;
    let second = temp.next.next;
    // 从头开始翻转
    temp.next = second;
    first.next = second.next;
    second.next = first;
    temp = first;
  }
  return pre.next;
};
```

```js
// 递归 想清楚当前循环需要做什么即可
var swapPairs = function(head) {
  // 递归终结条件
  if (head === null || head.next === null) {
    return head;
  }

  // 处理当前层,将第二个及其以后的节点看成一个
  let next = head.next;
  head.next = swapPairs(next.next);
  next.next = head;

  return next;
};
```

- 141：链表是否存在环

```js
// 哈希表解法
var hasCycle = function(head) {
  const seen = new WeakSet();
  while (head !== null) {
    if (seen.has(head)) {
      return true;
    }
    seen.add(head);
    head = head.next;
  }
  return false;
};
```

```js
//双指针 1
var hasCycle = function(head) {
  if (head === null || head.next === null) {
    return false;
  }
  let slow = head;
  let first = head.next;
  while (slow !== first) {
    if (fast == null || fast.next == null) {
      return false;
    }
    first = first.next.next;
    slow = slow.next;
  }
  return true;
};

// 双指针2
var hasCycle = function(head) {
  if (head == null || head.next == null) {
    return false;
  }
  let slow = head;
  let fast = head.next;
  while (fast !== null) {
    fast = fast.next;
    if (fast !== null) {
      fast = fast.next;
    }
    if (fast == slow) {
      return true;
    }
    slow = slow.next;
  }
  return false;
};
```

- 链表中倒数第 k 个节点

```js
// 顺利遍历即可
var getKthFromEnd = function(head, k) {
  let node = head,
    n = 0;
  while (node) {
    node = node.next;
    n++;
  }
  node = head;
  for (let i = 0; i < n - k; i++) {
    node = node.next;
  }
  return node;
};
```

```js
// 快慢指针，先定位快指针位置，在同步快慢指针一起走
var getKthFromEnd = function(head, k) {
  let fast = head,
    slow = head;

  while (fast && k > 0) {
    [fast, k] = [fast.next, k - 1];
  }
  while (fast) {
    [fast, slow] = [fast.next, slow.next];
  }
  return slow;
};
```

- 142:链表环的开始节点位置

```js
//hash简单易懂
var detectCycle = function(head) {
  const nodeSet = new WeakSet();
  while (head) {
    if (nodeSet.has(head)) {
      return head;
    }
    nodeSet.add(head);
    head = head.next;
  }
  return null;
};
```

```js
// 从快慢指针的所走路径进行分析得到结论，第一次相遇之后，环节点与开头、相遇点的关系得出
var detectCycle = function(head) {
  let fast = head;
  let slow = head;
  while (true) {
    if (fast === null || fast.next === null) {
      return null;
    }
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      break;
    }
  }
  fast = head;
  while (fast !== slow) {
    fast = fast.next;
    slow = slow.next;
  }
  return fast;
};
```

- 876: 链表的中间结点

```js
// 精妙之处在于利用下标，避免奇偶问题
var middleNode = function(head) {
  let A = [head];
  while (A[A.length - 1].next != null) A.push(A[A.length - 1].next);
  return A[Math.trunc(A.length / 2)];
};
```

```js
// 单指针
var middleNode = function(head) {
  n = 0;
  cur = head;
  while (cur != null) {
    ++n;
    cur = cur.next;
  }
  k = 0;
  cur = head;
  while (k < Math.trunc(n / 2)) {
    ++k;
    cur = cur.next;
  }
  return cur;
};
```

- 25: K 个一组翻转链表

```js
function reverse(head, tail) {
  let prev = tail.next;
  let p = head;
  while (prev != tail) {
    let next = p.next;
    p.next = pre;
    pre = p;
    p = next;
  }

  return [tail, head];
}

function reverseKGroup(head, k) {
  const hair = new ListNode(0);
  hair.next = head;
  let pre = hair;
  while (head) {
    let tail = pre;
    // 判断k长度，确定尾节点
    for (let i = 0; i < k; ++i) {
      tail = tail.next;
      if (!tail) {
        return hair.next;
      }
    }
    const nex = tail.next;
    //
    [head, tail] = myReverse(head, tail);
    // 把子链表重新接回原链表
    pre.next = head;
    tail.next = nex;
    pre = tail;
    head = tail.next;
  }
  return hair.next;
}
```
