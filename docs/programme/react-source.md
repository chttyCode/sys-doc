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

  - 调用 root.legacy_renderSubtreeIntoContainer 进行初始化渲染

    ```js
    function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
      var root = container._reactRootContainer;

      if (!root) {
        // Initial mount
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);

        unbatchedUpdates(function () {
          if (parentComponent != null) {
            root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
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
      var shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);

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
      ReactRoot.prototype.render = function (children, callback) {
        var root = this._internalRoot;
        var work = new ReactWork();
        callback = callback === undefined ? null : callback;
        {
          warnOnInvalidCallback(callback, 'render');
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
    unbatchedUpdates(function () {
      if (parentComponent != null) {
        root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
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
      return updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback);
    }
    ```

    - updateContainerAtExpirationTime 进入调度

    ```js
    function updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback) {
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

## Fiber Scheduler

- scheduleWork

  ```js
  function scheduleWork(fiber, expirationTime) {
    var root = scheduleWorkToRoot(fiber, expirationTime);
    if (!isWorking && nextRenderExpirationTime !== NoWork && expirationTime < nextRenderExpirationTime) {
      // This is an interruption. (Used for performance tracking.)
      interruptedBy = fiber;
      resetStack();
    }

    markPendingPriorityLevel(root, expirationTime);

    if (
      // If we're in the render phase, we don't need to schedule this root
      // for an update, because we'll do it before we exit...
      !isWorking ||
      isCommitting$1 || // ...unless this is a different root than the one we're rendering.
      nextRoot !== root
    ) {
      var rootExpirationTime = root.expirationTime;
      requestWork(root, rootExpirationTime);
    }
  }
  ```

  - 调用 scheduleWorkToRoot 目的

    - 找到当前 Fiber 的 root
    - 给更新节点的父节点链上的每个节点的 expirationTime 设置为这个 update 的 expirationTime，除非他本身时间要小于 expirationTime
    - 给更新节点的父节点链上的每个节点的 childExpirationTime 设置为这个 update 的 expirationTime，除非他本身时间要小于 expirationTime
    - 最终返回 root 节点的 Fiber 对象即 fiberRoot

      ```js
      function scheduleWorkToRoot(fiber, expirationTime) {
        // Update the source fiber's expiration time

        if (fiber.expirationTime === NoWork || fiber.expirationTime > expirationTime) {
          fiber.expirationTime = expirationTime;
        }

        var alternate = fiber.alternate;

        if (alternate !== null && (alternate.expirationTime === NoWork || alternate.expirationTime > expirationTime)) {
          alternate.expirationTime = expirationTime;
        } // Walk the parent path to the root and update the child expiration time.

        var node = fiber.return;
        var root = null;

        if (node === null && fiber.tag === HostRoot) {
          root = fiber.stateNode;
        } else {
          while (node !== null) {
            alternate = node.alternate;

            if (node.childExpirationTime === NoWork || node.childExpirationTime > expirationTime) {
              node.childExpirationTime = expirationTime;

              if (
                alternate !== null &&
                (alternate.childExpirationTime === NoWork || alternate.childExpirationTime > expirationTime)
              ) {
                alternate.childExpirationTime = expirationTime;
              }
            } else if (
              alternate !== null &&
              (alternate.childExpirationTime === NoWork || alternate.childExpirationTime > expirationTime)
            ) {
              alternate.childExpirationTime = expirationTime;
            }

            if (node.return === null && node.tag === HostRoot) {
              root = node.stateNode;
              break;
            }

            node = node.return;
          }
        }
          return null;
        }

        return root;
      }
      ```

  - 判断是否有任务被打断，如果有需要将其重置
  - 更新各种 expirationTime
  - 如果是 !isWorking || isCommitting 开始调用 requestWork

- requestWork

  ```js
  function requestWork(root: FiberRoot, expirationTime: ExpirationTime) {
    addRootToSchedule(root, expirationTime);
    if (isRendering) {
      // Prevent reentrancy. Remaining work will be scheduled at the end of
      // the currently rendering batch.
      return;
    }

    if (isBatchingUpdates) {
      // Flush work at the end of the batch.
      if (isUnbatchingUpdates) {
        nextFlushedRoot = root;
        nextFlushedExpirationTime = Sync;
        performWorkOnRoot(root, Sync, true);
      }
      return;
    }

    if (expirationTime === Sync) {
      performSyncWork();
    } else {
      scheduleCallbackWithExpirationTime(root, expirationTime);
    }
  }
  ```

  - addRootToSchedule 把 root 加入到调度队列，但是要注意一点，不会存在两个相同的 root 前后出现在队列中

    ```js
    function addRootToSchedule(root, expirationTime) {
      // Add the root to the schedule.
      // Check if this root is already part of the schedule.
      if (root.nextScheduledRoot === null) {
        // This root is not already scheduled. Add it.
        root.expirationTime = expirationTime;

        if (lastScheduledRoot === null) {
          firstScheduledRoot = lastScheduledRoot = root;
          root.nextScheduledRoot = root;
        } else {
          lastScheduledRoot.nextScheduledRoot = root;
          lastScheduledRoot = root;
          lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
        }
      } else {
        // This root is already scheduled, but its priority may have increased.
        var remainingExpirationTime = root.expirationTime;

        if (remainingExpirationTime === NoWork || expirationTime < remainingExpirationTime) {
          // Update the priority.
          root.expirationTime = expirationTime;
        }
      }
    }
    ```

    - 将 root 添加到调度队列中

  - 之后根据 expirationTime 调用 performSyncWork 还是 scheduleCallbackWithExpirationTime

- scheduleCallbackWithExpirationTime

  ```js
  function scheduleCallbackWithExpirationTime(root, expirationTime) {
    if (callbackExpirationTime !== NoWork) {
      // A callback is already scheduled. Check its expiration time (timeout).
      if (expirationTime > callbackExpirationTime) {
        // Existing callback has sufficient timeout. Exit.
        return;
      } else {
        if (callbackID !== null) {
          // Existing callback has insufficient timeout. Cancel and schedule a
          // new one.
          scheduler.unstable_cancelCallback(callbackID);
        }
      } // The request callback timer is already running. Don't start a new one.
    } else {
      startRequestCallbackTimer();
    }

    callbackExpirationTime = expirationTime;
    var currentMs = scheduler.unstable_now() - originalStartTimeMs;
    var expirationTimeMs = expirationTimeToMs(expirationTime);
    var timeout = expirationTimeMs - currentMs;
    callbackID = scheduler.unstable_scheduleCallback(performAsyncWork, {
      timeout: timeout,
    });
  }
  ```

  - 计算过期时间
  - 进入调度

- unstable_scheduleCallback

  - 时间分片
  - 模拟 requestIdleCallback(浏览器空闲时执行，存在兼容性问题)

    ```js
    function unstable_scheduleCallback(callback, deprecated_options) {
      var startTime = currentEventStartTime !== -1 ? currentEventStartTime : exports.unstable_now();
      var expirationTime;

      if (
        typeof deprecated_options === 'object' &&
        deprecated_options !== null &&
        typeof deprecated_options.timeout === 'number'
      ) {
        // FIXME: Remove this branch once we lift expiration times out of React.
        expirationTime = startTime + deprecated_options.timeout;
      } else {
        // 根据currentPriorityLevel 计算 expirationTime
      }

      var newNode = {
        callback: callback,
        priorityLevel: currentPriorityLevel,
        expirationTime: expirationTime,
        next: null,
        previous: null,
      }; // Insert the new callback into the list, ordered first by expiration, then
      // by insertion. So the new callback is inserted any other callback with
      // equal expiration.

      if (firstCallbackNode === null) {
        // This is the first callback in the list.
        firstCallbackNode = newNode.next = newNode.previous = newNode;
        ensureHostCallbackIsScheduled();
      } else {
      // 非首次渲染
      }

        var previous = next.previous;
        previous.next = next.previous = newNode;
        newNode.next = next;
        newNode.previous = previous;
      }

      return newNode;
    }
    ```

    - ensureHostCallbackIsScheduled

      ```js
      function ensureHostCallbackIsScheduled() {
        if (isExecutingCallback) {
          // Don't schedule work yet; wait until the next time we yield.
          return;
        } // Schedule the host callback using the earliest expiration in the list.

        var expirationTime = firstCallbackNode.expirationTime;

        if (!isHostCallbackScheduled) {
          isHostCallbackScheduled = true;
        } else {
          // Cancel the existing host callback.
          cancelHostCallback();
        }

        _requestHostCallback(flushWork, expirationTime);
      }
      ```

      - 判断是否正在执行调度
      - 调用\_requestHostCallback

        ```js
        function _requestHostCallback(callback, absoluteTimeout) {
          scheduledHostCallback = callback;
          timeoutTime = absoluteTimeout;

          if (isFlushingHostCallback || absoluteTimeout < 0) {
            // Don't wait for the next frame. Continue working ASAP, in a new event.
            window.postMessage(messageKey, '*');
          } else if (!isAnimationFrameScheduled) {
            // If rAF didn't already schedule one, we need to schedule a frame.
            // TODO: If this rAF doesn't materialize because the browser throttles, we
            // might want to still have setTimeout trigger rIC as a backup to ensure
            // that we keep performing work.
            isAnimationFrameScheduled = true;
            requestAnimationFrameWithTimeout(animationTick);
          }
        }
        ```

        - 如果过期则通过任务队列，将 firstCallbackNode 加入调度队列
        - 如果没过期则进入调度，设置 isAnimationFrameScheduled 为 true,调用 requestAnimationFrameWithTimeout
        - 调用 requestAnimationFrameWithTimeout

          ```js
          function requestAnimationFrameWithTimeout(callback) {
            // schedule rAF and also a setTimeout
            rAFID = localRequestAnimationFrame(function (timestamp) {
              // cancel the setTimeout
              localClearTimeout(rAFTimeoutID);
              callback(timestamp);
            });
            rAFTimeoutID = localSetTimeout(function () {
              // cancel the requestAnimationFrame
              localCancelAnimationFrame(rAFID);
              callback(exports.unstable_now());
            }, ANIMATION_FRAME_TIMEOUT);
          }
          ```

          - 这是一个相互取消的操作，如果在 ANIMATION_FRAME_TIMEOUT，requestAnimationFrame 没有执行，则通过定时器执行(?)
          - animationTick

            - 通过 requestAnimationFrame 或者定时器加入队列调用

              ```js
              function animationTick(rafTime) {
                if (scheduledHostCallback !== null) {
                  // Eagerly schedule the next animation callback at the beginning of the
                  // frame. If the scheduler queue is not empty at the end of the frame, it
                  // will continue flushing inside that callback. If the queue *is* empty,
                  // then it will exit immediately. Posting the callback at the start of the
                  // frame ensures it's fired within the earliest possible frame. If we
                  // waited until the end of the frame to post the callback, we risk the
                  // browser skipping a frame and not firing the callback until the frame
                  // after that.
                  requestAnimationFrameWithTimeout(animationTick);
                } else {
                  // No pending work. Exit.
                  isAnimationFrameScheduled = false;
                  return;
                }

                var nextFrameTime = rafTime - frameDeadline + activeFrameTime;

                if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
                  if (nextFrameTime < 8) {
                    // Defensive coding. We don't support higher frame rates than 120hz.
                    // If the calculated frame time gets lower than 8, it is probably a bug.
                    nextFrameTime = 8;
                  } // If one frame goes long, then the next one can be short to catch up.
                  // If two frames are short in a row, then that's an indication that we
                  // actually have a higher frame rate than what we're currently optimizing.
                  // We adjust our heuristic dynamically accordingly. For example, if we're
                  // running on 120hz display or 90hz VR display.
                  // Take the max of the two in case one of them was an anomaly due to
                  // missed frame deadlines.

                  activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
                } else {
                  previousFrameTime = nextFrameTime;
                }

                frameDeadline = rafTime + activeFrameTime;

                if (!isMessageEventScheduled) {
                  isMessageEventScheduled = true;
                  window.postMessage(messageKey, '*');
                }
              }
              ```

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

      if (targetInst !== null && typeof targetInst.tag === 'number' && !isFiberMounted(targetInst)) {
        // If we get an event (ex: img onload) before committing that
        // component's mount, ignore it for now (that is, treat it as if it was an
        // event on a non-React tree). We might also consider queueing events and
        // dispatching them after the mount.
        targetInst = null;
      }

      var bookKeeping = getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst);

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

## 各类组件 update

## 完成节点任务

## commitRoot

## 功能详解：基础

## suspense and priority

## 功能详解：hooks
