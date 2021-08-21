# React 源码阅读

## 基础

- jsx 转换

  ```js
  function App() {
    return <h1 className="title">Hello World!</h1>;
  }

  ReactDom.render(<App />, document.getElementById('root'));
  ```

  - \<= v17,采用 classic 的方式进行转译

    - 缺点
      - 代码中需要引入
      ```js
      import React from 'react';
      ```
    - 编译结果

    ```js
    function App() {
      return /*#__PURE__*/ React.createElement(
        'h1',
        {
          className: 'title',
        },
        'Hello World!'
      );
    }

    ReactDom.render(/*#__PURE__*/ React.createElement(App, null), document.getElementById('root'));
    ```

  - \> v17,采用 runtime 的方式，编译过程中自动插入

    - 优点
      - 无需手动引入 React，自动按需插入
      ```js
      var _jsxRuntime = require('react/jsx-runtime');
      ```
    - 编辑结果

      ```js
      var _jsxRuntime = require('react/jsx-runtime');

      function App() {
        return /*#__PURE__*/ (0, _jsxRuntime.jsx)('h1', {
          className: 'title',
          children: 'Hello World!',
        });
      }

      ReactDom.render(/*#__PURE__*/ (0, _jsxRuntime.jsx)(App, {}), document.getElementById('root'));
      ```

- react element

  - 通过 createElement 创建，调用该方法需要,type、config、children
  - type 指代这个 ReactElement 的类型

    - 字符串比如 div，p 代表原生 DOM，称为 HostComponent
    - Class 类型是我们继承自 Component 或者 PureComponent 的组件，称为 ClassComponent
    - 方法就是 functional Component
    - 原生提供的 Fragment、AsyncMode 等是 Symbol，会被特殊处理

    ```js
    export function createElement(type, config, children) {
      // 参数处理
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }
    const ReactElement = function (type, key, ref, self, source, owner, props) {
      const element = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,

        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,

        // Record the component responsible for creating this element.
        _owner: owner,
      };

      return element;
    };
    ```

    - 参数处理过程主要包含
      - 剥离 config&ref 单独处理
      - children 处理
      - 将 defaultProps 合并到 props
    - element 结构
      - $$typeof 用于确定是否属于 ReactElement
      - type 类型，用于判断如何创建节点
      - key 和 ref 这些特殊信息
      - props 新的属性内容

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

