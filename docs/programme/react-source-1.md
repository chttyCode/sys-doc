# React 中的更新

## 基础

- jsx 转换

  ```js
  function App() {
    return <h1 className="title">Hello World!</h1>;
  }

  ReactDom.render(<App />, document.getElementById("root"));
  ```

  - \<= v17,采用 classic 的方式进行转译

    - 缺点
      - 代码中需要引入
      ```js
      import React from "react";
      ```
    - 编译结果

    ```js
    function App() {
      return /*#__PURE__*/ React.createElement(
        "h1",
        {
          className: "title",
        },
        "Hello World!"
      );
    }

    ReactDom.render(
      /*#__PURE__*/ React.createElement(App, null),
      document.getElementById("root")
    );
    ```

  - \> v17,采用 runtime 的方式，编译过程中自动插入

    - 优点
      - 无需手动引入 React，自动按需插入
      ```js
      var _jsxRuntime = require("react/jsx-runtime");
      ```
    - 编辑结果

      ```js
      var _jsxRuntime = require("react/jsx-runtime");

      function App() {
        return /*#__PURE__*/ (0, _jsxRuntime.jsx)("h1", {
          className: "title",
          children: "Hello World!",
        });
      }

      ReactDom.render(
        /*#__PURE__*/ (0, _jsxRuntime.jsx)(App, {}),
        document.getElementById("root")
      );
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
      return ReactElement(
        type,
        key,
        ref,
        self,
        source,
        ReactCurrentOwner.current,
        props
      );
    }
    const ReactElement = function(type, key, ref, self, source, owner, props) {
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
      - $$
        $$
      - type 类型，用于判断如何创建节点
      - key 和 ref 这些特殊信息
      - props 新的属性内容

## render

- react dom render

  - 调用 root.legacy_renderSubtreeIntoContainer 进行初始化渲染

    ```js
    function legacyRenderSubtreeIntoContainer(
      parentComponent,
      children,
      container,
      forceHydrate,
      callback
    ) {
      var root = container._reactRootContainer;

      if (!root) {
        // Initial mount
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
          container,
          forceHydrate
        );

        unbatchedUpdates(function() {
          if (parentComponent != null) {
            root.legacy_renderSubtreeIntoContainer(
              parentComponent,
              children,
              callback
            );
          } else {
            root.render(children, callback);
          }
        });
      }

      return getPublicRootInstance(root._internalRoot);
    }
    ```

    - 创建 ReactRoot

    ```js
    function legacyCreateRootFromDOMContainer(container, forceHydrate) {
      var shouldHydrate =
        forceHydrate || shouldHydrateDueToLegacyHeuristic(container);

      if (!shouldHydrate) {
      } // Legacy roots are not async by default.

      var isConcurrent = false;
      return new ReactRoot(container, isConcurrent, shouldHydrate);
    }
    ```

    - 返回实例 ReactRoot 实例

      - 创建属性\_internalRoot

      ```js
      function ReactRoot(container, isConcurrent, hydrate) {
        var root = createContainer(container, isConcurrent, hydrate);
        this._internalRoot = root;
      }
      ```

      - createContainer 返回 fiberRoot

        ```js
        function createContainer(containerInfo, isConcurrent, hydrate) {
          return createFiberRoot(containerInfo, isConcurrent, hydrate);
        }
        ```

        - createFiberRoot 创建 fiberRoot

          ```js
          function createContainer(containerInfo, isConcurrent, hydrate) {
            return createFiberRoot(containerInfo, isConcurrent, hydrate);
          }
          ```

        - 返回 fiberRoot

        ```js
        function createFiberRoot(containerInfo, isConcurrent, hydrate) {
        var uninitializedFiber = createHostRootFiber(isConcurrent);
        var root = void 0;

        if (enableSchedulerTracing) {
          root = {
            current: uninitializedFiber,
            containerInfo: containerInfo,
            pendingChildren: null,
            earliestPendingTime: NoWork,
            latestPendingTime: NoWork,
            earliestSuspendedTime: NoWork,
            latestSuspendedTime: NoWork,
            latestPingedTime: NoWork,
            didError: false,
            pendingCommitExpirationTime: NoWork,
            finishedWork: null,
            timeoutHandle: noTimeout,
            context: null,
            pendingContext: null,
            hydrate: hydrate,
            nextExpirationTimeToWorkOn: NoWork,
            expirationTime: NoWork,
            firstBatch: null,
            nextScheduledRoot: null,
            interactionThreadID: tracing.unstable_getThreadID(),
            memoizedInteractions: new Set(),
            pendingInteractionMap: new Map()
          };
        } else {}

        uninitializedFiber.stateNode = root;

        return root
        ```

      - 添加原型方法

      ```js
      ReactRoot.prototype.render = function(children, callback) {
        var root = this._internalRoot;
        var work = new ReactWork();
        callback = callback === undefined ? null : callback;
        {
          warnOnInvalidCallback(callback, "render");
        }

        if (callback !== null) {
          work.then(callback);
        }

        updateContainer(children, root, null, work._onCommit);
        return work;
      };
      ```

  - 调用 render 方法
    - 因为这是初次渲染，需要尽快完成所以需要使用 unbatchedUpdates 非批量更新
    ```js
    unbatchedUpdates(function() {
      if (parentComponent != null) {
        root.legacy_renderSubtreeIntoContainer(
          parentComponent,
          children,
          callback
        );
      } else {
        root.render(children, callback);
      }
    });
    ```
  - 调用 updateContainer

    - 计算超时时间

    ```js
    function updateContainer(element, container, parentComponent, callback) {
      var current$$1 = container.current;
      var currentTime = requestCurrentTime();
      var expirationTime = computeExpirationForFiber(currentTime, current$$1);
      return updateContainerAtExpirationTime(
        element,
        container,
        parentComponent,
        expirationTime,
        callback
      );
    }
    ```

    - updateContainerAtExpirationTime 进入调度

    ```js
    function updateContainerAtExpirationTime(
      element,
      container,
      parentComponent,
      expirationTime,
      callback
    ) {
      // TODO: If this is a nested container, this won't be the root.
      var current$$1 = container.current;

      return scheduleRootUpdate(current$$1, element, expirationTime, callback);
    }
    ```

  - 开始调度

    - 首先要生成一个 update
    - 不管你是 setState 还是 ReactDOM.render 造成的 React 更新，都会生成一个叫 update 的对象，并且会赋值给 Fiber.updateQueue
    - 注意到这里之前 setState 和 ReactDOM.render 是不一样,但进度调度就都一样了

    ```js
    function scheduleRootUpdate(current$$1, element, expirationTime, callback) {
      var update = createUpdate(expirationTime);
      // being called "element".

      update.payload = {
        element: element,
      };
      callback = callback === undefined ? null : callback;

      enqueueUpdate(current$$1, update);
      scheduleWork(current$$1, expirationTime);
      return expirationTime;
    }
    ```

- 以上时进入调度前的整体流程，其中涉及细节如下
  - fiber tree
  - react update and updateQueue
  - react expiration time
  - different expiration time
  - react setState forUpdate

## BatchUpdates 批量更新

- batchUpdates

  > 常见的一个问题是 setState 是同步还是异步

  - 触发 react 更新的方式
    - render
    - setState
    - forceupdate
    - hooks Api(待验证)
  - 以 setState 为例

    - React 封装事件

    ```js
    function dispatchEvent(topLevelType, nativeEvent) {
      if (!_enabled) {
        return;
      }

      var nativeEventTarget = getEventTarget(nativeEvent);
      var targetInst = getClosestInstanceFromNode(nativeEventTarget);

      if (
        targetInst !== null &&
        typeof targetInst.tag === "number" &&
        !isFiberMounted(targetInst)
      ) {
        // If we get an event (ex: img onload) before committing that
        // component's mount, ignore it for now (that is, treat it as if it was an
        // event on a non-React tree). We might also consider queueing events and
        // dispatching them after the mount.
        targetInst = null;
      }

      var bookKeeping = getTopLevelCallbackBookKeeping(
        topLevelType,
        nativeEvent,
        targetInst
      );

      try {
        // Event queue being processed in the same cycle allows
        // `preventDefault`.
        batchedUpdates(handleTopLevel, bookKeeping);
      } finally {
        releaseTopLevelCallbackBookKeeping(bookKeeping);
      }
    }
    ```

    - 批量更新将全局变量设置为 true

    ```js
    function batchedUpdates(fn, bookkeeping) {
      if (isBatching) {
        // If we are currently inside another batch, we need to wait until it
        // fully completes before restoring state.
        return fn(bookkeeping);
      }

      isBatching = true;

      try {
        return _batchedUpdatesImpl(fn, bookkeeping);
      } finally {
        // Here we wait until all updates have propagated, which is important
        // when using controlled components within layers:
        // https://github.com/facebook/react/issues/1698
        // Then we restore state of any controlled component.
        isBatching = false;
        var controlledComponentsHavePendingUpdates = needsStateRestore();

        if (controlledComponentsHavePendingUpdates) {
          // If a controlled event was fired, we may need to restore the state of
          // the DOM node back to the controlled value. This is necessary when React
          // bails out of the update without touching the DOM.
          _flushInteractiveUpdatesImpl();

          restoreStateIfNeeded();
        }
      }
    }
    ```

    - 又因所有的更新都通过 requestWork 请求调度，当 isBatchingUpdates 为 true 时直接 return,不在进行调度，因此不会更新
