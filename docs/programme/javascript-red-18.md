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
  
  ### 2. 基本的画布功能

- 创建 canvas 元素时至少要设置其 width 和 height 属性，可以在 dom 上设置，也可以通过 css 样式添加
- 可以使用 toDataURL() 方法导出 canvas 元素上的图像
  - 浏览器默认将图像编码为 PNG 格式
  - 如果画布中的图像是其他域绘制过来的， toDataURL() 方法就会抛出错误?

### 3. 2D 绘图上下文

- 2D 上下文的坐标原点(0, 0)在 canvas 元素的左上角
- 填充和描边
  - fillStyle 和 strokeStyle
  - 这两个属性也可以是渐变或图案
- 绘制矩形
  - api
    - fillRect() 、 strokeRect() 和 clearRect()
    - 描边宽度由 lineWidth 属性控制
    - lineCap 属性控制线条端点的形状:［ "butt" （平头）、 "round" （出圆头）或 "square" （出方头）］
    - lineJoin 属性控制线条交点的形状:［ "round" （圆转）、 "bevel" （取平）或 "miter" （出尖）］
- 绘制路径
  - 必须首先调用 beginPath() 方法以表示要开始绘制新路径
  - api
    - arc 画圆
    - arcTo 画弧线
    - bezierCurveTo 三次贝塞尔曲线
    - lineTo 直线
    - moveTo(x, y) ：不绘制线条，只把绘制光标移动到 (x, y)
    - quadraticCurveTo 二次贝塞尔曲线
    - rect 矩形
- 与 strokeRect() 和 fillRect() 的区别在于，它创建的是一条路径，而不是独立的图形
