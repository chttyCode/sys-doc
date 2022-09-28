# 队列、栈、双端队列

- 栈
  - 什么是栈
    - 是一个操作受限制的线性表
  - 为什么要有栈这种数据结构
    - 相对数组链表都是线性而且没有操作限制，相对比较自由、容易出错
  - 栈的特点
    - 先进后出，后进先出，满足一端出入
  - 如何实现栈
    - 顺序栈
      - 用数组实现
      - 时间空间复杂度
        - O(1)，存在动态扩容的栈在个别时候会退化成 O(n)，在平均情况下还是 o(1)的
    - 链式栈
      - 用链表实现
  - 栈的使用场景
    - 函数的调用栈
    - 表达式求值
      - 用两个栈，一个栈存操作数，一个栈存运算符，
      - 遇到操作符优先级高的进栈，优先级低的对左栈取出 2 个操作数进行计算
    - 括号匹配
      - 左括号进栈，右括号时，取出左括号进行对比
    - 浏览器中的栈
      - 使用两个栈进行模拟
        - 首次访问栈
        - 后退栈
  - 思考
    - 函数执行为什么要用栈来保存临时变量
      - 函数调用符合先进后出，后进先出的特点，函数调用即进栈分配一定的内存空间，出栈即可回收
    - 堆栈 vs 栈中的栈意义相同吗

# 习题

- 20 有效括号
  > 算法一致，但 js 的执行时间比较长

```js
// 正则时间较长
var isValid = function(s) {
  let reg = /\(\)|\{\}|\[\]/g;
  while (reg.test(s)) {
    s = s.replace(reg, "");
  }
  return !s.length;
};
// 栈的方式:时间复杂度O(n^2)
var isValid = function() {
  let left = [];
  let map = {
    "[": "]",
    "(": ")",
    "{": "}",
  };
  for (let i = 0; i < s.length; i++) {
    const key = s[i];
    if (map[key]) {
      left.push(key);
    } else {
      if (map[left.pop()] !== key) {
        return false;
      }
    }
  }
  return !s.length;
};
// 栈的方式
var isValid = function(s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    const key = s[i];
    if (key === ")" && stack[stack.length - 1] === "(") {
      stack.pop();
    } else if (key === "]" && stack[stack.length - 1] === "[") {
      stack.pop();
    } else if (key === "}" && stack[stack.length - 1] === "{") {
      stack.pop();
    } else {
      stack.push(key);
    }
  }
  return !stack.length;
};
```

- 155

  > 最小栈，想法都是入栈排队，但是入站排队分两种方式，1.每次对最小栈进行排序，2.对最小栈入栈不再排序而是比较新入栈对与栈顶元素对大小，重点就是对 push 和 top 的方式不同

  ```js
  var MinStack = function() {
    this.stack = [];
    this.orderStack = [Infinity];
  };

  /**
   * @param {number} val
   * @return {void}
   */
  MinStack.prototype.push = function(val) {
    this.stack.push(val);
    this.orderStack.push(
      Math.min(this.orderStack[this.orderStack.length - 1], x)
    );
    return val;
  };

  /**
   * @return {void}
   */
  MinStack.prototype.pop = function() {
    const val = this.stack.pop();
    this.orderStack.pop();
    return val;
  };

  /**
   * @return {number}
   */
  MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
  };

  /**
   * @return {number}
   */
  MinStack.prototype.getMin = function() {
    return this.orderStack[this.orderStack.length - 1];
  };
  ```

- 84

  > 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1

  ```js
  /**
   * @param {number[]} heights
   * @return {number}
   */
  var largestRectangleArea = function(heights) {};
  ```

- 239

  > 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

  ```js
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number[]}
   */
  var maxSlidingWindow = function(nums, k) {};
  ```

- 641

  > 设计实现双端队列。

  ```js
  /**
   * @param {number} k
   */
  var MyCircularDeque = function(k) {};

  /**
   * @param {number} value
   * @return {boolean}
   */
  MyCircularDeque.prototype.insertFront = function(value) {};

  /**
   * @param {number} value
   * @return {boolean}
   */
  MyCircularDeque.prototype.insertLast = function(value) {};

  /**
   * @return {boolean}
   */
  MyCircularDeque.prototype.deleteFront = function() {};

  /**
   * @return {boolean}
   */
  MyCircularDeque.prototype.deleteLast = function() {};

  /**
   * @return {number}
   */
  MyCircularDeque.prototype.getFront = function() {};

  /**
   * @return {number}
   */
  MyCircularDeque.prototype.getRear = function() {};

  /**
   * @return {boolean}
   */
  MyCircularDeque.prototype.isEmpty = function() {};

  /**
   * @return {boolean}
   */
  MyCircularDeque.prototype.isFull = function() {};

  /**
   * Your MyCircularDeque object will be instantiated and called as such:
   * var obj = new MyCircularDeque(k)
   * var param_1 = obj.insertFront(value)
   * var param_2 = obj.insertLast(value)
   * var param_3 = obj.deleteFront()
   * var param_4 = obj.deleteLast()
   * var param_5 = obj.getFront()
   * var param_6 = obj.getRear()
   * var param_7 = obj.isEmpty()
   * var param_8 = obj.isFull()
   */
  ```

- 42

> 接雨水,给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {};
```

- 232

  > 用栈实现队列，栈只能一端出入，而队列只能开头出栈，结尾入栈

  ```js
  // 用一个栈去承载结果
  var MyQueue = function() {
    this.leftStack = [];
    this.rightStack = [];
  };

  /**
   * @param {number} x
   * @return {void}
   */
  MyQueue.prototype.push = function(x) {
    let top;
    while ((top = this.leftStack.pop())) {
      this.rightStack.push(top);
    }
    this.leftStack.push(x);
    while ((top = this.rightStack.pop())) {
      this.leftStack.push(top);
    }
  };

  /**
   * @return {number}
   */
  MyQueue.prototype.pop = function() {
    let val = this.leftStack[this.leftStack.length - 1];
    this.leftStack.length -= 1;
    return val;
  };

  /**
   * @return {number}
   */
  MyQueue.prototype.peek = function() {
    return this.leftStack[this.leftStack.length - 1];
  };

  /**
   * @return {boolean}
   */
  MyQueue.prototype.empty = function() {
    return !this.leftStack.length;
  };

  // 用两个栈去承载结果，这样就要把保证两栈的数据同步
  // 用栈实现队列
  var MyQueue = function() {
    // stack
    let leftStack = [];
    let rightStack = [];
  };

  /**
   * @param {number} x
   * @return {void}
   */
  MyQueue.prototype.push = function(x) {
    this.leftStack.push(x);
    this.rightStack.unshift(x);
  };

  /**
   * @return {number}
   */
  MyQueue.prototype.pop = function() {
    this.rightStack.pop();
    return this.leftStack.shift();
  };

  /**
   * @return {number}
   */
  MyQueue.prototype.peek = function() {
    return this.leftStack[0];
  };

  /**
   * @return {boolean}
   */
  MyQueue.prototype.empty = function() {
    return !this.leftStack.length;
  };
  ```

- 844

  > 比较含退格的字符串，现在看到这个题目第一个想法就是栈，第二个就是 remove0 的滚雪球解法
  > ，第三个可以理解为倒叙的滚雪球

  ```js
  // 栈的解法，O(n+m)的时间复杂度
  var backspaceCompare = function(s, t) {
    let sStack = [];
    let tStack = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "#") {
        sStack.pop();
      } else {
        sStack.push(s[i]);
      }
    }
    for (let t = 0; i < t.length; i++) {
      if (t[i] === "#") {
        tStack.pop();
      } else {
        tStack.push(t[i]);
      }
    }
    return s.join() === t.join();
  };

  // 滚雪球解法，字符串不可改，所以用数组承载新的结果
  function removeD(str) {
    let slow = 0;
    let newStr = [];
    for (let fast = 0; fast < str.length; fast++) {
      if (str[fast] !== "#") {
        newStr[slow++] = str[fast];
      } else if (slow > 0) {
        slow--;
      }
    }
    return newStr.slice(0, slow).join();
  }
  return removeD(s) === removeD(t);

  // 我理解为倒叙的滚雪球，同样有字符串的拼接
  var backspaceCompare = function(s, t) {
    function removeD(str) {
      let newStr = "";
      let backCount = 0;
      for (let fast = str.length - 1; fast >= 0; fast--) {
        if (str[fast] === "#") {
          backCount++;
        } else {
          if (backCount === 0) {
            newStr += str[fast];
          } else {
            backCount--;
          }
        }
      }
      return newStr;
    }
    return removeD(s) === removeD(t);
  };
  ```

- 224 基本计算

  > 难点是都能想到栈，但是优先级的细节怎么处理 确实分水岭，也是难点所在

  ```js
  // 方案一纵观全局分析，括号的存在会改变符号
  function calc(s) {
    let sign = 1;
    let ops = [1];
    let i = 0;
    let ret = 0;
    while (i < s.length) {
      if (s[i] === " ") {
        i++;
      } else if (s[i] === "+") {
        sign = ops[ops.length - 1];
        i++;
      } else if (s[i] === "-") {
        sign = -ops[ops.length - 1];
        i++;
      } else if (s[i] === "(") {
        ops.push(sign);
        i++;
      } else if (s[i] === ")") {
        ops.pop();
        i++;
      } else {
        let num = 0;
        while (s[i] !== " " && i < s.length && !isNaN(Number(s[i]))) {
          num = num * 10 + s[i].charCodeAt() - "0".charCodeAt();
          i++;
        }
        ret += sign * num;
      }
    }
    return ret;
  }

  // 方案二顺序思维解题
  function calc(s) {
    let sign = 1;
    let ret = 0;
    let stack = [];
    let i = 0;
    while (i < s.length) {
      if (s[i] === " ") {
        i++;
      } else if (s[i] !== " " && !isNaN(s[i])) {
        let num = 0;
        while (s[i] !== " " && i < s.length && !isNaN(Number(s[i]))) {
          num = num * 10 + s[i].charCodeAt() - "0".charCodeAt();
          i++;
        }
        ret += sign * num;
      } else if (s[i] === "+") {
        sign = 1;
        i++;
      } else if (s[i] === "-") {
        sign = -1;
        i++;
      } else if (s[i] === "(") {
        stack.push(ret);
        stack.push(sign);
        ret = 0;
        sign = 1;
        i++;
      } else if (s[i] === ")") {
        ret = ret * stack.pop() + stack.pop();
        i++;
      }
    }
    return ret;
  }
  ```

- 682

  > 棒球比赛

  ```js
  /**
   * @param {string[]} ops
   * @return {number}
   */
  var calPoints = function(ops) {};
  ```

- 496

  ```js
  <!-- 下一个更大的一类问题，可暴力解，但是单调栈是更优解，小细节1.倒叙遍历，2.过滤比当前值小的 -->
  function nextGreaterElement(nums1, nums2) {
    const stack = [];
    const retMap = {};
    for (let i = nums2.length - 1; i >= 0; i--) {
      if (stack.length && stack[stack.length - 1] < nums2[i]) {
        stack.pop();
      }
      retMap[nums2[i]] = stack.length ? stack[stack.length - 1] : -1;
      stack.push(nums2[i]);
    }
    for (i = 0; i < nums1.length; i++) {
      nums1[i] = retMap[nums1[i]];
    }
    return nums1;
  }
  ```

- 649

  > Dota2 的世界里有两个阵营：Radiant(天辉)和 Dire(夜魇)

  ```js
  /**
   * @param {string} senate
   * @return {string}
   */
  var predictPartyVictory = function(senate) {};
  ```

# 队列

队列和栈一样也是一种操作受限的线性数据结构，这种结构的好处就是可以避免出错

队列是对头出，队尾入，只有这两个操作，生活场景就是排队吃饭，你总要限制排队的规则，不能顺便进出，既然生活种有这种需求那程序抽象必然也需要

## 队列的实现方式

用数组实现叫顺序栈

存在的问题：数据挪移

用链表实现叫链式栈

存在的问题：无边界，队列无法控制与预判

## 工程种常用的队列

### 循环队列

解决了顺序队列种的数据搬移问题，可以实现并发队列

### 阻塞队列

当队列空时对对头操作有限制

当队列满时对队尾操作有限制

eg: 生产-消费这模型

### 并发队列

对队列进行加锁控制，可以解决并发队列的问题，但对锁的粒度有要求

可以考虑循环队列，处理并发问题

## 习题

- 622

  > 设计循环队列

  ```js
  /**
   * @param {number} k
   */
  var MyCircularQueue = function(k) {};

  /**
   * @param {number} value
   * @return {boolean}
   */
  MyCircularQueue.prototype.enQueue = function(value) {};

  /**
   * @return {boolean}
   */
  MyCircularQueue.prototype.deQueue = function() {};

  /**
   * @return {number}
   */
  MyCircularQueue.prototype.Front = function() {};

  /**
   * @return {number}
   */
  MyCircularQueue.prototype.Rear = function() {};

  /**
   * @return {boolean}
   */
  MyCircularQueue.prototype.isEmpty = function() {};

  /**
   * @return {boolean}
   */
  MyCircularQueue.prototype.isFull = function() {};

  /**
   * Your MyCircularQueue object will be instantiated and called as such:
   * var obj = new MyCircularQueue(k)
   * var param_1 = obj.enQueue(value)
   * var param_2 = obj.deQueue()
   * var param_3 = obj.Front()
   * var param_4 = obj.Rear()
   * var param_5 = obj.isEmpty()
   * var param_6 = obj.isFull()
   */
  ```
