---
sidebarDepth: 0
---

# LeetCode

## 概述

- 有些东西你不学或许一辈子也用不到，但是人总是要成长的，整日的原地踏步，也终将会十年如一日。数据结构与算法就是其中之一。
- 数据结构和算法可以算是修炼的编程的一种内功，如果说平时的编程都是一层不变的业务逻辑，那么应用好数据结构与算法就提高编程质量内功。
- 数据结构有自己的特性、服务于特定的算法，算法有自己的特点、使用场景二者相辅相成
- 复杂度分析就是衡量内功水平的方法
- 学习还是要循序渐进、不断的反复沉淀的过程，要做好长期艰苦奋斗、没有一蹴而就的成功

## 复杂度分析

- 数据结构&算法本身就是为了解决程序快、省的问题，如何衡量
  - 事后统计法
    - 对实际运行的效果进行统计分析
    - 缺点
      - 依赖环境配置
      - 依赖数据量
  - 复杂度分析
    - 不使用具体测试数据，进行粗略估算的方法，不运行代码，分析代码得到执行时间
- 大 O 复杂度分析
  - 时间复杂度
    - 时间复杂度的全称是渐进时间复杂度，表示算法的执行时间与数据规模之间的增长关系(假设每行代码执行时间相等)
    - 公式中的 O，表示 T(n)与 f(n)成正比
    ```js
    T(n) = O(f(n));
    ```
  - 空间复杂度
    - 表示算法的存储空间与数据规模之间的增长关系。

## 1. 数组、链表

- 数组
  | operate | complex |
  | ---- | ---- |
  | pre-pend | O(1) |
  | append | O(1) |
  | lookup | O(1) |
  | insert | O(n) |
  | delete | O(n) |

- 链表
  | operate | complex |
  | ---- | ---- |
  | pre-pend | O(1) |
  | append | O(1) |
  | lookup | O(n) |
  | insert | O(1) |
  | delete | O(1) |

## 2. 队列、栈、双端队列

## 3. hash 表、映射、集合

## 4. 树、二叉树

```js
const traversePath = [];
function preOder(root) {
  if (root) {
    traversePath.pus(root.value);
    preOder(root.left);
    preOder(root.right);
  }
}
```

```js
const traversePath = [];
function inOder(root) {
  if (root) {
    inOder(root.left);
    traversePath.pus(root.value);
    inOder(root.right);
  }
}
```

```js
const traversePath = [];
function postOder(root) {
  if (root) {
    postOder(root.left);
    postOder(root.right);
    traversePath.pus(root.value);
  }
}
```

## 5. 泛型递归、树的递归

```js
function recursion(level,params1,params2,....args) {
    // 递归终结条件
    if(level>MAX_LEVEL){
        // 处理结果
        process_result
        return;
    }
    // 处理当前层信息
    process(level,params)
    //下探到下一层
    recursion(level+1,p1,...)
    // 清理当前层信息
}
```

## 6. 分治、回溯

```js
function divideConquer(problem,parma1,param2,...){
    // 递归终结条件,到达叶子节点
    if(problem is None){
        // 处理结果
        process_result
        return；
    }
    // 处理当前逻辑，即将大问题进行拆分
    data=prepare_data(problem)
    subProblems=split_problem(problem,data)

    // 处理子问题,下探到下一层
    subResult1=divideConquer(subProblems[0],p1,...)
    subResult2=divideConquer(subProblems[1],p1,...)
    subResult3=divideConquer(subProblems[2],p1,...)

    // 汇总子问题，组装结果
    result = process_result(subResult1,subResult2,subResult3)

    // 清理当前层信息
}
```

## 7. 深度、广度优先搜索

```js
const visited = [];
function dfs(node) {
  // 递归终止条件
  if (node in visited) {
    return;
  }
  // 处理当前层
  visited.push(node);
  // 下探到下一层
  dfs(node.left);
  dfs(node.right);
}
```

```js
// 多叉树
const visited = [];
function dfs(node) {
  // 处理当前层
  visited.push(node);
  // 下探到下一层
  for (next_node in node.children) {
    if (!(next_node in visited)) {
      // 下探到下一层
      dfs(next, visited);
    }
  }
}
```

```js
// 多叉树
const visited = [];
function dfs(tree) {
  if (!tree.root) {
    return [];
  }
  const visited = [];
  const stack = [tree.root];
  while (stack) {
    const node = stack.pop();
    visited.push(node);
    process(node);
    const nodes = generate_related_nodes(node);
    stack.push(nodes);
  }
}
```

```js
function bfs(graph, start, end) {
  queue = [];
  queue.push([start]);
  visited.push(start);
  while (queue) {
    node = queue.pop();
    visited.push(node);
    process(node);
    nodes = generate_related_nodes(node);
    queue.push(nodes);
  }
  // other processing work
}
```

## 8. 贪心算法

- 贪心
  - 在每一步选择中都采取在当前状态下最好或最优解的选择，从而希望导致结果是全局最好或最优解
- vs 回溯
  - 能够回退
- vs 动态规划
  - 最优判断+回退

## 9. 二分查找

- 前提
  - 目标函数单调性
  - 存在上下边界
  - 能够通过索引访问

```js
  left,right=0,len(array)-1
  while left<=right
    mid = (left+right)/2
    if(array[mid] === target){
      break or return result
    }else if(array[mid]<target){
      left=mid+1
    }else{
      right=mid+1
    }
```

## 10. 动态规划

## 11. 字典树、并查集

## 12. 高级搜索

## 13. 红黑树、AVL 树

## 14. 位运算

## 15. 布鲁过滤器、LRU 缓存

## 16. 排序算法

## 17. 高级动态规划

## 18. 字符串

## 参考

> [vscode 刷题配置](https://juejin.cn/post/6844904105782018055)
