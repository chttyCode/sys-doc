# React 源码阅读

## 基础

## React 中的更新

## Fiber Scheduler

- 总体流程概况
- scheduleWork
  > 所有的更新都会从 scheduleWork 开始
  - 找到更新对应的 FiberRoot 节点
  - 如果符合一定的条件重置 stack
  - 如果符合条件就请求调度工作
- requestWork
  - 把 root 加入到调度队列中
  - 判断是否批量更新
  - 根据 expiration 判断调度类型
- batchUpdate
  - 批量更新
- reactSchedule
  > 异步调度流程
  - 维护时间片
  - 模拟 requestIdeCallback
  - 调度列表和超时判断
- performWork
  - 是否有 deadline 的区分
  - 循环渲染 Root 的条件
  - 超时处理
- renderRoot
  - 调用 workLoop 进行循环单元更新
  - 捕获错误进行处理

## 各类组件 update

- 入口优化
  > 子节点的更新不一定会引起兄弟节点的更新
  - 判断组件的更新是否可以优化
  - 更具节点类型分发处理
  - 根据 expirationTime 判断是否可以跳过
- functionComponent 更新

## 完成节点任务

## commitRoot

## 功能详解：基础

## suspense and priority

## 功能详解：hooks
