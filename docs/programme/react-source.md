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

  - 异步进行 root 任务调度就是通过这个方法来做的
  - 计算过期时间
  - 传入 performAsyncWork，timeout 超时事件的对象，进入调度

- unstable_scheduleCallback

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

  - 创建一个调度节点 newNode，并按照 timoutAt 的顺序加入到 CallbackNode 链表
  - expirationTime 是调用时传入的 timeoutAt 加上当前时间形成的过期时间

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

  - 调度之前判断，判断是否在已经在调度中，如果已经在调度中，直接 return,当前 node 已存在于链表中，会自动进入调度
  - 如果调度没有开始，要将 isHostCallbackScheduled 置为 true
  - 如果已经开始了，要取消，因为

    ```js
    function _requestHostCallback(callback, absoluteTimeout) {
      scheduledHostCallback = callback;
      timeoutTime = absoluteTimeout;

      if (isFlushingHostCallback || absoluteTimeout < 0) {
        // Don't wait for the next frame. Continue working ASAP, in a new event.
        window.postMessage(messageKey, '*');
      } else if (!isAnimationFrameScheduled) {
        isAnimationFrameScheduled = true;
        requestAnimationFrameWithTimeout(animationTick);
      }
    }
    ```

    - 开始进入调度，设置调度的内容，用 scheduledHostCallback 和 timeoutTime 这两个全局变量记录回调函数和对应的过期时间
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
              requestAnimationFrameWithTimeout(animationTick);
            } else {
              // No pending work. Exit.
              isAnimationFrameScheduled = false;
              return;
            }

            var nextFrameTime = rafTime - frameDeadline + activeFrameTime;

            if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
              if (nextFrameTime < 8) {
                nextFrameTime = 8;
              }

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

          - 只要 scheduledHostCallback 还在就继续调要
          - 调节帧时间

            - frameDeadline 初始值为 0，activeFrameTime 初始值为 33(即每秒 30 帧，每帧 33 毫秒)
            - 首次 frameDeadline 的时间加了初始值的 33 毫秒，利用浏览器的任务队列原理，此刻代码执行完，即将进入浏览器的渲染阶段，即这 33 毫秒，包含了此次渲染的时间
            - 因为 animationTick 是通过 requestAnimationFrameWithTimeout 递归调用
            - 如果下一次执行的时间小于 activeFrameTime(33 毫秒)，即浏览器的刷新频率大于 30 帧/秒，会进入帧时间调整

          - 通过 postMessage 执行任务队列中的 idleTick

            ```js
            function idleTick(event) {
              if (event.source !== window || event.data !== messageKey) {
                return;
              }

              isMessageEventScheduled = false;
              var prevScheduledCallback = scheduledHostCallback;
              var prevTimeoutTime = timeoutTime;
              scheduledHostCallback = null;
              timeoutTime = -1;
              var currentTime = exports.unstable_now();
              var didTimeout = false;

              if (frameDeadline - currentTime <= 0) {
                // There's no time left in this idle period. Check if the callback has
                // a timeout and whether it's been exceeded.
                if (prevTimeoutTime !== -1 && prevTimeoutTime <= currentTime) {
                  // Exceeded the timeout. Invoke the callback even though there's no
                  // time left.
                  didTimeout = true;
                } else {
                  // No timeout.
                  if (!isAnimationFrameScheduled) {
                    // Schedule another animation callback so we retry later.
                    isAnimationFrameScheduled = true;
                    requestAnimationFrameWithTimeout(animationTick);
                  } // Exit without invoking the callback.

                  scheduledHostCallback = prevScheduledCallback;
                  timeoutTime = prevTimeoutTime;
                  return;
                }
              }

              if (prevScheduledCallback !== null) {
                isFlushingHostCallback = true;

                try {
                  prevScheduledCallback(didTimeout);
                } finally {
                  isFlushingHostCallback = false;
                }
              }
            }
            ```

            - 首先判断 postMessage 是不是自己的，不是直接返回
            - 获取当前时间，对比 frameDeadline，查看是否已经超时了
            - 如果超时了，判断一下任务 callback 的过期时间有没有到，如果没有到，则重新对这个 callback 进行一次调度，然后返回。如果到了，则设置 didTimeout 为 true
            - 接下去就是调用 callback 了，这里设置 isFlushingHostCallback 全局变量为 true 代表正在执行。并且调用 callback 也就是 flushWork 并传入 didTimeout
            - 进入 flushWork 调用

              ```js
              function flushWork(didTimeout) {
                isExecutingCallback = true;
                deadlineObject.didTimeout = didTimeout;

                try {
                  if (didTimeout) {
                    // Flush all the expired callbacks without yielding.
                    while (firstCallbackNode !== null) {
                      // Read the current time. Flush all the callbacks that expire at or
                      // earlier than that time. Then read the current time again and repeat.
                      // This optimizes for as few performance.now calls as possible.
                      var currentTime = exports.unstable_now();

                      if (firstCallbackNode.expirationTime <= currentTime) {
                        do {
                          flushFirstCallback();
                        } while (firstCallbackNode !== null && firstCallbackNode.expirationTime <= currentTime);

                        continue;
                      }

                      break;
                    }
                  } else {
                    // Keep flushing callbacks until we run out of time in the frame.
                    if (firstCallbackNode !== null) {
                      do {
                        flushFirstCallback();
                      } while (firstCallbackNode !== null && getFrameDeadline() - exports.unstable_now() > 0);
                    }
                  }
                } finally {
                  isExecutingCallback = false;

                  if (firstCallbackNode !== null) {
                    // There's still work remaining. Request another callback.
                    ensureHostCallbackIsScheduled();
                  } else {
                    isHostCallbackScheduled = false;
                  } // Before exiting, flush all the immediate work that was scheduled.

                  flushImmediateWork();
                }
              }
              ```

              - 先设置 isExecutingCallback 为 true，代表正在调用 callback
              - 设置 deadlineObject.didTimeout，在 React 业务中可以用来判断任务是否超时
              - 如果超时，会一次从 firstCallbackNode 向后一直执行，直到第一个没过期的任务
              - 如果没有超时，则依此执行第一个 callback，知道帧时间结束为止
              - 最后清理变量，如果任务没有执行完，则再次调用 ensureHostCallbackIsScheduled 进入调度顺便把 Immedia 优先级的任务都调用一遍。
              - flushFirstCallback

                ```js
                function flushFirstCallback() {
                  var flushedNode = firstCallbackNode; // Remove the node from the list before calling the callback. That way the
                  // list is in a consistent state even if the callback throws.

                  var next = firstCallbackNode.next;

                  if (firstCallbackNode === next) {
                    // This is the last callback in the list.
                    firstCallbackNode = null;
                    next = null;
                  } else {
                    var lastCallbackNode = firstCallbackNode.previous;
                    firstCallbackNode = lastCallbackNode.next = next;
                    next.previous = lastCallbackNode;
                  }

                  flushedNode.next = flushedNode.previous = null; // Now it's safe to call the callback.

                  var callback = flushedNode.callback;
                  var expirationTime = flushedNode.expirationTime;
                  var priorityLevel = flushedNode.priorityLevel;
                  var previousPriorityLevel = currentPriorityLevel;
                  var previousExpirationTime = currentExpirationTime;
                  currentPriorityLevel = priorityLevel;
                  currentExpirationTime = expirationTime;
                  var continuationCallback;

                  try {
                    continuationCallback = callback(deadlineObject);
                  } finally {
                    currentPriorityLevel = previousPriorityLevel;
                    currentExpirationTime = previousExpirationTime;
                  } // A callback may return a continuation. The continuation should be scheduled
                  // with the same priority and expiration as the just-finished callback.

                  if (typeof continuationCallback === 'function') {
                    var continuationNode = {
                      callback: continuationCallback,
                      priorityLevel: priorityLevel,
                      expirationTime: expirationTime,
                      next: null,
                      previous: null,
                    }; // Insert the new callback into the list, sorted by its expiration. This is
                    // almost the same as the code in `scheduleCallback`, except the callback
                    // is inserted into the list *before* callbacks of equal expiration instead
                    // of after.

                    if (firstCallbackNode === null) {
                      // This is the first callback in the list.
                      firstCallbackNode = continuationNode.next = continuationNode.previous = continuationNode;
                    } else {
                      var nextAfterContinuation = null;
                      var node = firstCallbackNode;

                      do {
                        if (node.expirationTime >= expirationTime) {
                          // This callback expires at or after the continuation. We will insert
                          // the continuation *before* this callback.
                          nextAfterContinuation = node;
                          break;
                        }

                        node = node.next;
                      } while (node !== firstCallbackNode);

                      if (nextAfterContinuation === null) {
                        // No equal or lower priority callback was found, which means the new
                        // callback is the lowest priority callback in the list.
                        nextAfterContinuation = firstCallbackNode;
                      } else if (nextAfterContinuation === firstCallbackNode) {
                        // The new callback is the highest priority callback in the list.
                        firstCallbackNode = continuationNode;
                        ensureHostCallbackIsScheduled();
                      }

                      var previous = nextAfterContinuation.previous;
                      previous.next = nextAfterContinuation.previous = continuationNode;
                      continuationNode.next = nextAfterContinuation;
                      continuationNode.previous = previous;
                    }
                  }
                }
                ```

                - 如果当前队列中只有一个回调，清空队列
                - 调用回调并传入 deadline 对象，里面有 timeRemaining 方法通过 frameDeadline - now()来判断是否帧时间已经到了
                - 如果回调有返回内容，把这个返回加入到回调队列

- performWork
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
