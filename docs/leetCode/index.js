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
