## 第十八章

- 使用 requestAnimationFrame
- 理解 canvas
- 绘制简单 2D 图形
- 使用 webGL 绘制 3D 图形

### 1. 使用 requestAnimationFrame

> CSS 过渡和动画方便了 Web 开发者实现某些动画，但 JavaScript 动画领域多年来进展甚微
> 浏览器知道 CSS 过渡和动画应该什么时候开始，并据此计算出正确的时间间隔，但对于 javascript 动画，浏览器并不知道什么时候开始

- 早期定时动画
  - js 动画通过定时器来控制动画执行
  - 无法精确知晓循环之间的延时
- 时间间隔的问题
  - Chrome 的计时器精度为 4 毫秒。
  - Firefox 和 Safari 的计时器精度为约 10 毫秒；
- requestAnimationFrame
  - 浏览器在渲染每一帧之前调用，即浏览器知道动画何时执行动画
  - 需要向 settimeout 一样递归调用
  - 回调函数接受一个参数，该参数是浏览器下一次执行的时间点，即开发者也可以知道下个执行时间，可以进行动画优化
- cancelAnimationFrame
  - requestAnimationFrame() 也返回一个请求 ID，可以用于通过另一个方法 cancelAnimationFrame() 来取消重绘任务
- 通过 requestAnimationFrame 节流

  - 原生实现

  ```js
  function expensiveOperation() {
    console.log("Invoked at", Date.now());
  }
  window.addEventListener("scroll", () => {
    expensiveOperation();
  });
  ```

  - 把所有回调的执行集中在重绘钩子,但不会过滤掉每次重绘的多余调用

  ```js
  function expensiveOperation() {
    console.log("Invoked at", Date.now());
  }
  window.addEventListener("scroll", () => {
    window.requestAnimationFrame(expensiveOperation);
  });
  ```

  - 因为重绘是非常频繁的操作，所以这还算不上真正的节流

  ```js
  let enqueued = false;
  function expensiveOperation() {
    console.log("Invoked at", Date.now());
    enqueued = false;
  }
  window.addEventListener("scroll", () => {
    if (!enqueued) {
      enqueued = true;
      window.requestAnimationFrame(expensiveOperation);
    }
  });
  ```

  - 配合使用一个计时器来限制操作执行的频率

  ```js
  let enabled = true;
  function expensiveOperation() {
    console.log("Invoked at", Date.now());
  }
  window.addEventListener("scroll", () => {
    if (enabled) {
      enabled = false;
      window.requestAnimationFrame(expensiveOperation);
      window.setTimeout(() => (enabled = true), 50);
    }
  });
  ```
