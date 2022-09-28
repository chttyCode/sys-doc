var swapPairs = function(head) {
  if (head == null || head.next == null) return { head };
  const next = head.next;
  head.next = swapPairs(next.next);
  next.next = head;
  return next;
};

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
