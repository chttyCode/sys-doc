# 高级程序设计（小红书、红宝书）
## 第十七章 事件

- 理解事件流
- 使用事件处理程序
- 了解不同类型的事件

### 1. 事件流

 - 事件捕获
 - 事件冒泡
  - 兼容好
 - DOM事件流
   - 事件捕获->到达目标->事件冒泡
### 2. 事件处理程序

- HTML 事件处理程序
  - 在html中通过属性定义事件处理程序，需关注转译问题
- DOM0 事件处理程序
  - 在js中通过属性赋值定义事件处理程序
- DOM2 事件处理程序
  - 在js中通过addEventListener添加事件处理程序、removeEventListener去除事件处理程序

### 3. 事件对象

- DOM 事件对象
  -  this 和 currentTarget 指向注册事件处理程序的元素
  -  target指向事件真正的目标

### 4. 事件类型

- 用户界面事件
- 焦点事件
- 鼠标事件
- 滚轮事件
- 输入事件
- 键盘事件
- 合成事件
  - 合成事件是 DOM3 Events 中新增的，用于处理通常使用 IME 输入时的复杂输入序列。IME 可以让用户输入物理键盘上没有的字符。
- HTML5 事件
  - contextmenu 事件
    - 允许开发者取消默认的上下文菜单并提供自定义菜单
  - beforeunload 事件
    - 给开发者提供阻止页面被卸载的机会 
  - DOMContentLoaded 事件
    - 事件可以绑定在 document 或 window 添加事件处理程序（实际的事件目标是 document ，但会冒泡到 window ）
    - 在document.readyState ="complete"，之后绑定不会触发
  - readystatechange 事件
    - uninitialized ：对象存在并尚未初始化。
    - loading ：对象正在加载数据。
    - loaded ：对象已经加载完数据。
    - interactive ：对象可以交互，但尚未加载完成。
    - complete ：对象加载完成。
  - pageshow 与 pagehide 事件
    - 往返缓存（bfcache，back-forward cache）的功能
  - hashchange 事件
    - onhashchange 事件处理程序必须添加给 window 
 - 设备事件
  - orientationchange 事件：开发者判断用户的设备是处于垂直模式还是水平模式。
  - deviceorientation 事件：反映设备在空间中的朝向，而不涉及移动相关的信息
  - devicemotion 事件：这个事件用于提示设备实际上在移动
 - 触摸及手势事件
  - 触摸事件
    - touchstart：手指放到屏幕上时触发
    - touchmove：在这个事件中调用 preventDefault() 可以阻止滚动
    - touchend：手指从屏幕上移开时触发
    - touchcancel：系统停止跟踪触摸时触发。文档中并未明确什么情况下停止跟踪
  - 手势事件
    - gesturestart ：一个手指已经放在屏幕上，再把另一个手指放到屏幕上时触发
    - gesturechange ：任何一个手指在屏幕上的位置发生变化时触发
    - gestureend ：其中一个手指离开屏幕时触发

### 5. 内存与性能

> 页面中事件处理程序的数量与页面整体性能直接相关,原因有很多。首先，每个函数都是对象，都占用内存空间，对象越多，性能越差。其次，为指定事件处理程序所需访问 DOM 的次数会先期造成整个页面交互的延迟

- 事件委托
  - 优点
    - document 对象随时可用
    - 节省花在设置页面事件处理程序上的时间
    - 减少整个页面所需的内存，提升整体性能 
- 删除事件处理程序
  - 无用的事件处理程序长驻内存导致的web应用性能不佳
  - 第一个是删除带有事件处理程序的元素
  - 另一个可能导致内存中残留引用的问题是页面卸载 

### 6. 模拟事件
> 模拟事件会被当成浏览器事件，会有时间冒泡，web测试特别有用

- DOM 事件模拟
- 模拟键盘事件
- 模拟其他事件
```js
let btn = document.getElementById("myBtn");
// 创建 event 对象
let event = document.createEvent("MouseEvents");
// 初始化 event 对象
event.initMouseEvent("click", true, true, document.defaultView,
0, 0, 0, 0, 0, false, false, false, false, 0, null);
// 触发事件
btn.dispatchEvent(event);
```


## 第十八章
- 使用requestAnimationFrame
- 理解canvas
- 绘制简单2D图形
- 使用webGL绘制3D图形

### 1. 使用 requestAnimationFrame
>  CSS 过渡和动画方便了Web开发者实现某些动画，但 JavaScript动画领域多年来进展甚微
>  浏览器知道 CSS过渡和动画应该什么时候开始，并据此计算出正确的时间间隔，但对于javascript动画，浏览器并不知道什么时候开始

- 早期定时动画
 - js动画通过定时器来控制动画执行
  - 无法精确知晓循环之间的延时
- 时间间隔的问题
  - Chrome 的计时器精度为 4 毫秒。
  - Firefox 和 Safari 的计时器精度为约 10 毫秒；
- requestAnimationFrame
  - 浏览器在渲染每一帧之前调用，即浏览器知道动画何时执行动画
  - 需要向settimeout一样递归调用
  - 回调函数接受一个参数，该参数是浏览器下一次执行的时间点，即开发者也可以知道下个执行时间，可以进行动画优化
- cancelAnimationFrame
  -  requestAnimationFrame() 也返回一个请求 ID，可以用于通过另一个方法 cancelAnimationFrame() 来取消重绘任务
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
window.setTimeout(() => enabled = true, 50);
}
});
```
