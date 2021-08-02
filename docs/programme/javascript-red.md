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
