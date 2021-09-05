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
    console.log('Invoked at', Date.now());
  }
  window.addEventListener('scroll', () => {
    expensiveOperation();
  });
  ```

  - 把所有回调的执行集中在重绘钩子,但不会过滤掉每次重绘的多余调用

  ```js
  function expensiveOperation() {
    console.log('Invoked at', Date.now());
  }
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(expensiveOperation);
  });
  ```

  - 因为重绘是非常频繁的操作，所以这还算不上真正的节流

  ```js
  let enqueued = false;
  function expensiveOperation() {
    console.log('Invoked at', Date.now());
    enqueued = false;
  }
  window.addEventListener('scroll', () => {
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
    console.log('Invoked at', Date.now());
  }
  window.addEventListener('scroll', () => {
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

### 4. 绘制文本

- 绘制文本
  - Api
    - fillText
    - strokeText
  - 参数
    - font：以 CSS 语法指定的字体样式、大小、字体族等
    - textAlign ：指定文本的对齐方式
    - textBaseLine：指 定 文 本的 基线
    ```js
    context.font = 'bold 14px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('12', 100, 20);
    ```

### 5. 变换

- 原点设置
  - translate(x, y) ：把原点移动到 (x, y) 。执行这个操作后，坐标(0, 0)就会变成 (x, y)
- 暂存 Api,保存当前设置
  - save:调用这个方法后，所有这一时刻的设置会被放到一个暂存栈中
  - restore:可以系统地恢复
- Api
  - rotate(angle) ：围绕原点把图像旋转 angle 弧度。
  - scale(scaleX, scaleY) ：通过在 x 轴乘以 scaleX 、在 y 轴乘以 scaleY 来缩放图像

### 6. 绘制图像

- 2D 绘图上下文内置支持操作图像。
- 画布支持嵌套

- Api
  - drawImage
    - 参数: 第一个参数除了可以是 HTML 的 <img> 元素，还可以是另一个 <canvas> 元素
  - toDataURL
    - 获取操作结果
    - 存在跨域问题

### 7. 阴影

- 支持形状或路径生成阴影
- APi
  - shadowColor ：CSS 颜色值
  - shadowOffsetX ：阴影相对于形状或路径的 x 坐标的偏移量
  - shadowOffsetY ：阴影相对于形状或路径的 y 坐标的偏移量
  - shadowBlur ：像素，表示阴影的模糊量

### 8. 渐变

- 创建 gradient 对象

```js
let gradient = context.createLinearGradient(30, 30, 70, 70);
```

- 使用 addColorStop() 方法为渐变指定色标

```js
gradient.addColorStop(0, 'white');
gradient.addColorStop(1, 'black');
```

- 使用渐变

```js
// 绘制渐变矩形
context.fillStyle = gradient;
context.fillRect(30, 30, 50, 50);
```

### 9. 图案

- 图案是用于填充和描画图形的重复图像
- 调用 createPattern() 方法并传入两个参数：一个 HTML <img> 元素和一个表示该如何重复图像的字符串
  - 第一个参数也可以是 \<video> 元素或者另一个 \<canvas> 元素

```js
let image = document.images[0],
  pattern = context.createPattern(image, 'repeat');
// 绘制矩形
context.fillStyle = pattern;
context.fillRect(10, 10, 150, 150);
```

### 10. 图像数据

- 使用 getImageData() 方法获取原始图像数据
  - 第一个像素的左上角坐标和要取得的像素宽度及高度
- 返回的对象是一个 ImageData 的实例

  - 属性

    - width 、 height
    - data:像素信息数组,每个像素在 data 数组中都由 4 个值表示，分别代表红、绿、蓝和透明度值

      ```js
      let drawing = document.getElementById('drawing');
      // 确保浏览器支持<canvas>
      if (drawing.getContext) {
        let context = drawing.getContext('2d'),
          image = document.images[0],
          imageData,
          data,
          i,
          len,
          average,
          red,
          green,
          blue,
          alpha;
        // 绘制图像
        context.drawImage(image, 0, 0);
        // 取得图像数据
        imageData = context.getImageData(0, 0, image.width, image.height);
        data = imageData.data;
        for (i = 0, len = data.length; i < len; i += 4) {
          red = data[i];
          green = data[i + 1];
          blue = data[i + 2];
          alpha = data[i + 3];
          // 取得 RGB 平均值
          average = Math.floor((red + green + blue) / 3);
          // 设置颜色，不管透明度
          data[i] = average;
          data[i + 1] = average;
          data[i + 2] = average;
        }
        // 将修改后的数据写回 ImageData 并应用到画布上显示出来
        imageData.data = data;
        context.putImageData(imageData, 0, 0);
      }
      ```

      - 遍历每个像素，修改为平均值
      - 调用 putImageData() 方法，把图像数据再绘制到画布上
        > 存在跨域问题，无法获取跨域资源图像数据

### 11. 合成

- 透明度设置，全局属性，使用后需重置
  - 属性：globalAlpha
- globalCompositionOperation:上下文的层叠方式
