- 重点
  - 理解事件流
  - 使用事件处理程序
  - 了解不同类型的事件

### 1. 事件流

- 事件捕获
- 事件冒泡
- 兼容好
- DOM 事件流
  - 事件捕获->到达目标->事件冒泡

### 2. 事件处理程序

- HTML 事件处理程序
  - 在 html 中通过属性定义事件处理程序，需关注转译问题
- DOM0 事件处理程序
  - 在 js 中通过属性赋值定义事件处理程序
- DOM2 事件处理程序
  - 在 js 中通过 addEventListener 添加事件处理程序、removeEventListener 去除事件处理程序

### 3. 事件对象

- DOM 事件对象
  - this 和 currentTarget 指向注册事件处理程序的元素
  - target 指向事件真正的目标

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
    - 在 document.readyState ="complete"，之后绑定不会触发
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
  - 无用的事件处理程序长驻内存导致的 web 应用性能不佳
  - 第一个是删除带有事件处理程序的元素
  - 另一个可能导致内存中残留引用的问题是页面卸载

### 6. 模拟事件

> 模拟事件会被当成浏览器事件，会有时间冒泡，web 测试特别有用

- DOM 事件模拟
- 模拟键盘事件
- 模拟其他事件

```js
let btn = document.getElementById("myBtn");
// 创建 event 对象
let event = document.createEvent("MouseEvents");
// 初始化 event 对象
event.initMouseEvent(
  "click",
  true,
  true,
  document.defaultView,
  0,
  0,
  0,
  0,
  0,
  false,
  false,
  false,
  false,
  0,
  null
);
// 触发事件
btn.dispatchEvent(event);
```


# 本章内容

- 理解表单基础
- 文本框校验与交互
- 使用其他表单控件

## 表单基础

- 属性

  - reset() ：把表单字段重置为各自的默认值。
  - method ：HTTP 请求的方法类型
  - enctype ：请求的编码类型
  - action ：请求的 URL
  - acceptCharset ：服务器可以接收的字符集
  - name ：表单的名字
  - submit() ：提交表单
  - target ：用于发送请求和接收响应的窗口的名字
    使用 document.forms 集合可以获取页面上所有的表单元素，可以通过索引或者表单 name 属性

- 提交表单
  - 提交方式
    - 通过创建元素的方式
      ```js
      <!-- 通用提交按钮 -->
      <input type="submit" value="Submit Form">
      <!-- 自定义提交按钮 -->
      <button type="submit">Submit Form</button>
      <!-- 图片按钮 -->
      <input type="image" src="graphic.gif">
      ```
    - 通过编程方式
      - 在 JavaScript 中调用 submit() 方法来提交表单
      - 不会触发表单 submit 事件
    - 防止重复提交
- 重置表单
  - 通过创建元素的方式
  - 通过编程的方式
    - 调用 reset() 方法
    - 一样触发 reset 事件(vs submit 方法)
- 表单字段
  - 访问表单字段
    - 使用 form[0]这种索引的方式
    - form["color"] 这种使用字段名字的方式
    - 访问 form.elements 集合
  - 公共属性
    - form ：指针，指向表单字段所属的表单
    - value ：要提交给服务器的字段值
  - 公共方法
    - focus() 方法把浏览器焦点设置到表单字段
    - blur() 焦点不会转移到任何特定元素，仅仅只是从调用这个方法的元素上移除了
  - 表单字段的公共事件
    - blur ：在字段失去焦点时触发
    - change ：在 <input> 和 <textarea> 元素的 value 发生变化且失去焦点时触发
    - focus ：在字段获得焦点时触发


