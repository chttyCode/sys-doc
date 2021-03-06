## Fiber Scheduler

- scheduleWork

  ```js
  function scheduleWork(fiber, expirationTime) {
    var root = scheduleWorkToRoot(fiber, expirationTime);
    if (
      !isWorking &&
      nextRenderExpirationTime !== NoWork &&
      expirationTime < nextRenderExpirationTime
    ) {
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

        if (
          remainingExpirationTime === NoWork ||
          expirationTime < remainingExpirationTime
        ) {
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
        window.postMessage(messageKey, "*");
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
        rAFID = localRequestAnimationFrame(function(timestamp) {
          // cancel the setTimeout
          localClearTimeout(rAFTimeoutID);
          callback(timestamp);
        });
        rAFTimeoutID = localSetTimeout(function() {
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

            if (
              nextFrameTime < activeFrameTime &&
              previousFrameTime < activeFrameTime
            ) {
              if (nextFrameTime < 8) {
                nextFrameTime = 8;
              }

              activeFrameTime =
                nextFrameTime < previousFrameTime
                  ? previousFrameTime
                  : nextFrameTime;
            } else {
              previousFrameTime = nextFrameTime;
            }

            frameDeadline = rafTime + activeFrameTime;

            if (!isMessageEventScheduled) {
              isMessageEventScheduled = true;
              window.postMessage(messageKey, "*");
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
                        } while (
                          firstCallbackNode !== null &&
                          firstCallbackNode.expirationTime <= currentTime
                        );

                        continue;
                      }

                      break;
                    }
                  } else {
                    // Keep flushing callbacks until we run out of time in the frame.
                    if (firstCallbackNode !== null) {
                      do {
                        flushFirstCallback();
                      } while (
                        firstCallbackNode !== null &&
                        getFrameDeadline() - exports.unstable_now() > 0
                      );
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

                  if (typeof continuationCallback === "function") {
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

  - performWork 通过两种方式调用

    - performAsyncWork 异步方式

      ```js
      function performAsyncWork(dl) {
        if (dl.didTimeout) {
          if (firstScheduledRoot !== null) {
            recomputeCurrentRendererTime();
            var root = firstScheduledRoot;

            do {
              didExpireAtExpirationTime(root, currentRendererTime);
              root = root.nextScheduledRoot;
            } while (root !== firstScheduledRoot);
          }
        }

        performWork(NoWork, dl);
      }
      ```

      - 如果超时则将该任务的 newExpirationTimeToWorkOn 为当前时间,表示这个任务直接执行就行了，不需要判断是否超过了帧时间

        ```js
        function didExpireAtExpirationTime(root, currentTime) {
          var expirationTime = root.expirationTime;

          if (expirationTime !== NoWork && currentTime >= expirationTime) {
            // The root has expired. Flush all work up to the current time.
            root.nextExpirationTimeToWorkOn = currentTime;
          }
        }
        ```

      - 给 performWork 设置的 minExpirationTime 是 NoWork

    - performSyncWork 同步方式

      ```js
      function performSyncWork() {
        performWork(Sync, null);
      }
      ```

      - 同步方式久比较简单了，设置 minExpirationTime 为 Sync 也就是 1

  - 具体 performWork

    ```js
    function performWork(minExpirationTime, dl) {
      deadline = dl;

      findHighestPriorityRoot();

      if (deadline !== null) {
        recomputeCurrentRendererTime();
        currentSchedulerTime = currentRendererTime;

        if (enableUserTimingAPI) {
          var didExpire = nextFlushedExpirationTime < currentRendererTime;
          var timeout = expirationTimeToMs(nextFlushedExpirationTime);
          stopRequestCallbackTimer(didExpire, timeout);
        }

        while (
          nextFlushedRoot !== null &&
          nextFlushedExpirationTime !== NoWork &&
          (minExpirationTime === NoWork ||
            minExpirationTime >= nextFlushedExpirationTime) &&
          (!deadlineDidExpire ||
            currentRendererTime >= nextFlushedExpirationTime)
        ) {
          performWorkOnRoot(
            nextFlushedRoot,
            nextFlushedExpirationTime,
            currentRendererTime >= nextFlushedExpirationTime
          );
          findHighestPriorityRoot();
          recomputeCurrentRendererTime();
          currentSchedulerTime = currentRendererTime;
        }
      } else {
        while (
          nextFlushedRoot !== null &&
          nextFlushedExpirationTime !== NoWork &&
          (minExpirationTime === NoWork ||
            minExpirationTime >= nextFlushedExpirationTime)
        ) {
          performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, true);
          findHighestPriorityRoot();
        }
      } // We're done flushing work. Either we ran out of time in this callback,
      // or there's no more work left with sufficient priority.
      // If we're inside a callback, set this to false since we just completed it.

      if (deadline !== null) {
        callbackExpirationTime = NoWork;
        callbackID = null;
      } // If there's work left over, schedule a new callback.

      if (nextFlushedExpirationTime !== NoWork) {
        scheduleCallbackWithExpirationTime(
          nextFlushedRoot,
          nextFlushedExpirationTime
        );
      } // Clean-up.

      deadline = null;
      deadlineDidExpire = false;
      finishRendering();
    }
    ```

    - 设置全局 deadline 对象
    - 通过 findHighestPriorityRoot 找到下一个需要操作的 root，会设置两个全局变量

      ```js
      function findHighestPriorityRoot() {
        var highestPriorityWork = NoWork;
        var highestPriorityRoot = null;

        if (lastScheduledRoot !== null) {
          var previousScheduledRoot = lastScheduledRoot;
          var root = firstScheduledRoot;

          while (root !== null) {
            var remainingExpirationTime = root.expirationTime;

            if (remainingExpirationTime === NoWork) {
              !(previousScheduledRoot !== null && lastScheduledRoot !== null)
                ? invariant(
                    false,
                    "Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue."
                  )
                : void 0;

              if (root === root.nextScheduledRoot) {
                // This is the only root in the list.
                root.nextScheduledRoot = null;
                firstScheduledRoot = lastScheduledRoot = null;
                break;
              } else if (root === firstScheduledRoot) {
                // This is the first root in the list.
                var next = root.nextScheduledRoot;
                firstScheduledRoot = next;
                lastScheduledRoot.nextScheduledRoot = next;
                root.nextScheduledRoot = null;
              } else if (root === lastScheduledRoot) {
                // This is the last root in the list.
                lastScheduledRoot = previousScheduledRoot;
                lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
                root.nextScheduledRoot = null;
                break;
              } else {
                previousScheduledRoot.nextScheduledRoot =
                  root.nextScheduledRoot;
                root.nextScheduledRoot = null;
              }

              root = previousScheduledRoot.nextScheduledRoot;
            } else {
              if (
                highestPriorityWork === NoWork ||
                remainingExpirationTime < highestPriorityWork
              ) {
                // Update the priority, if it's higher
                highestPriorityWork = remainingExpirationTime;
                highestPriorityRoot = root;
              }

              if (root === lastScheduledRoot) {
                break;
              }

              if (highestPriorityWork === Sync) {
                // Sync is highest priority by definition so
                // we can stop searching.
                break;
              }

              previousScheduledRoot = root;
              root = root.nextScheduledRoot;
            }
          }
        }

        nextFlushedRoot = highestPriorityRoot;
        nextFlushedExpirationTime = highestPriorityWork;
      }
      ```

      - 一般情况下我们的 React 应用只会有一个 root，所以这里的大部分逻辑其实都不是常见情况
      - 循环 firstScheduledRoot => lastScheduledRoot，remainingExpirationTime 是 root.expirationTime，也就是最早的过期时间
      - 如果他是 NoWork 说明他已经没有任务了，从链表中删除。
      - 从剩下的中找到 expirationTime 最小的也就是优先级最高的 root 然后把他赋值给 nextFlushedRoot 并把他的 expirationTime 赋值给 nextFlushedExpirationTime 这两个公共变量。

    - 通过判断是否有 deadline 来分成两种渲染方式，但最大的差距其实是 while 循环的判断条件，有 deadline 的多了一个条件(!deadlineDidExpire || currentRendererTime >= nextFlushedExpirationTime)
    - performWorkOnRoot

      ```js
      function performWorkOnRoot(root, expirationTime, isExpired) {
        !!isRendering
          ? invariant(
              false,
              "performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue."
            )
          : void 0;
        isRendering = true; // Check if this is async work or sync/expired work.

        if (deadline === null || isExpired) {
          // Flush work without yielding.
          // TODO: Non-yieldy work does not necessarily imply expired work. A renderer
          // may want to perform some work without yielding, but also without
          // requiring the root to complete (by triggering placeholders).
          var finishedWork = root.finishedWork;

          if (finishedWork !== null) {
            // This root is already complete. We can commit it.
            completeRoot(root, finishedWork, expirationTime);
          } else {
            root.finishedWork = null; // If this root previously suspended, clear its existing timeout, since
            // we're about to try rendering again.

            var timeoutHandle = root.timeoutHandle;

            if (timeoutHandle !== noTimeout) {
              root.timeoutHandle = noTimeout; // $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above

              cancelTimeout(timeoutHandle);
            }

            var isYieldy = false;
            renderRoot(root, isYieldy, isExpired);
            finishedWork = root.finishedWork;

            if (finishedWork !== null) {
              // We've completed the root. Commit it.
              completeRoot(root, finishedWork, expirationTime);
            }
          }
        } else {
          // Flush async work.
          var _finishedWork = root.finishedWork;

          if (_finishedWork !== null) {
            // This root is already complete. We can commit it.
            completeRoot(root, _finishedWork, expirationTime);
          } else {
            root.finishedWork = null; // If this root previously suspended, clear its existing timeout, since
            // we're about to try rendering again.

            var _timeoutHandle = root.timeoutHandle;

            if (_timeoutHandle !== noTimeout) {
              root.timeoutHandle = noTimeout; // $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above

              cancelTimeout(_timeoutHandle);
            }

            var _isYieldy = true;
            renderRoot(root, _isYieldy, isExpired);
            _finishedWork = root.finishedWork;

            if (_finishedWork !== null) {
              // We've completed the root. Check the deadline one more time
              // before committing.
              if (!shouldYield()) {
                // Still time left. Commit the root.
                completeRoot(root, _finishedWork, expirationTime);
              } else {
                // There's no time left. Mark this root as complete. We'll come
                // back and commit it later.
                root.finishedWork = _finishedWork;
              }
            }
          }
        }

        isRendering = false;
      }
      ```

      - 这里也分为同步和异步两种情况，但是这两种情况的区别其实非常小。isYieldy 在同步的情况下是 false，而在异步情况下是 true
      - renderRoot 之后判断一下 shouldYeild，如果时间片已经用完，则不直接 completeRoot，而是等到一下次 requestIdleCallback 之后再执行。
      - renderRoot 渲染阶段和 completeRoot 提交阶段,渲染阶段可以被打断，而提交阶段不能
