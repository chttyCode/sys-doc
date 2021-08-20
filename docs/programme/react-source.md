# React 源码阅读

## 基础 APi

- jsx 转换
- react element
- react component
- react-ref
- forward-ref
- context
- concurrent-mode
- suspense-and-lazy
- hooks
- children
- others

## React 中的更新

- react dom render
- react fiberRoot
- react fiber
- react update and updateQueue
- react expiration time
- different expiration time
- react setState forUpdate

## Fiber Scheduler

- scheduleWork
  - 重点
    - 找到对应的 fiberRoot 节点
    - 重置 stack
    - 有条件调用 requestWork
- requestWork
- batchUpdates
- reactScheduleWork
- performWork
- renderRoot

## 各类组件 update

## 完成节点任务

## commitRoot

## 功能详解：基础

## suspense and priority

## 功能详解：hooks
