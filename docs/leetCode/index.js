/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  const pre = new ListNode();
  pre.next = head;
  let tem = pre;
  while (tem.next !== null && tem.next.next !== null) {
    const first = tem.next;
    const second = tem.next.next;
    tem.next = second;
    first.next = second.next;
    second.next = first;
    tem = first;
  }
  return pre.next;
};

var swapPairs = function(head) {
  if (head === null || head.next === null) {
    return head;
  }

  let next = head.next;
  head.next.next = head;
  head.next = swapPairs(next.next);
  return head;
};

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

var isValid = function(s) {
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

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

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

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
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

var backspaceCompare = function(s, t) {
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
};

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

backspaceCompare("p#c", "o#c");
