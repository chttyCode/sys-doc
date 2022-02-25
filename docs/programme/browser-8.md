# share browser

#### 浏览器简历

- 初代浏览器 Netscape Navigator
- 浏览器大战 Netscape 倒下，微软 Internet Explorer 6 垄断了市场，但是不兼容标准，但是微软好景不长，Netscape 的那波人又搞了一个 Firefox、同时苹果搞了一个 Safari 还有 Opera 等与其竞争

#### 当下浏览器

- 三分天下，Mozilla 的 Gecko、Google 的 Blink、还有苹果的的 WebKit（Blink 的近亲）
- Gecko 从初代开始就以兼容标准为特色、延续至今
- WebKit 脱胎于 KHTML 及 KJS，即为其一个分支发展而来，初代由苹果开发，前期仅开源 WebCore 及 JavaScriptCore 开源，于 2005 年 6 月 7 日将 Webkit 开源
- Blink 由 Google 于 2013 年 4 月 3 日宣传自行开发，Blink 从 WebKit 的http://trac.webkit.org/changeset/147503/webkit节点checkout,自此chrome拥有了更多的自由度、精简优化了整个WebKit程序库

#### chrome 的架构演进

##### 单进程架构

- 所有的功能都运行在一个浏览器进程中，这些功能包括了网络、插件、javascript 引擎、渲染引擎等
- 存在的问题
  - 不稳定
    - 所有功能运行在同一个进程中，任意一个功能有问题都会引起浏览器的崩溃
  - 不流畅
    - 所有页面运行在同一个进程中、内存泄漏、占用主线程时间过长都是引起不流畅的原因
  - 不安全
    - 可以插件和脚本两个方面看，插件可以用 c/c++写，直接读取系统资源、脚本可以通过浏览器漏洞获取系统权限
- 多进程架构

##### 多进程架构

![alt 多进程架构图](/sys-doc/imgs/browser-arch.png)

- 进程描述
  |process|toTos|
  |--|--|
  |Browser| 主要负责地址栏，书签，后退和前进按钮、界面显示、用户交互、子进程管理，同时提供存储等功能 |
  |Renderer| 核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，Blink 引擎运行在其中，Blink 默认嵌入了 V8 javascript 引擎，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下|
  |Plugin |控制网站使用的任何插件，例如 flash。 |
  |GPU | Chrome 刚开始发布的时候是没有 GPU 进程的。而 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程|
- 解决了
- 稳定性
  - 多进程架构相互隔离，某一进程崩溃不会引起整个浏览器崩溃
- 安全问题
  - 多进程架构可以使用安全沙箱机制，chrome 的插件进程&渲染进程运行在安全沙箱中
- 流畅问题
  - chrome 默认为每个 tab 创建一个渲染进程，即时 javascript 阻塞了，也不会影响浏览器或其他 tab
- 存在的问题
  - 资源占用
    - 每个进程都会有公共的基础架构副本，这无疑增加了内存的占用

##### 服务架构

- 未来面向服务的架构
  - 即采用的是'面向服务架构'的思想，将原来的模块重构成独立的服务，每个服务定义好访问接口，从而构建一个高内聚、低偶尔、易维护、扩展的系统
  - 总的思想就是在强大性能设备上会以多进程的方式运行基础服务，但是如果在资源受限的设备上，Chrome 会将很多服务整合到一个进程中，从而节省内存占用
  - 资源受限
    ![alt 多进程架构图](/sys-doc/imgs/browser-arch2.png)
  - 资源丰富
    ![alt 多进程架构图](/sys-doc/imgs/servicfication.png)
  - 站点隔离(Site Isolation) 实现得益于多进程架构

#### 导航流程

##### 导航流程从浏览器进程开始

- 除了独立出来进程之外，其他功能都是由浏览器进行完成的
- 浏览器进程中的线程
  - UI 线程
  - network 网络线程(网络进程)
  - storage 线程

##### 用户输入

- UI 线程会判断是搜索还是 site
- 在执行导航之前还有执行当前页面的 beforeunload 事件，该事件可以取消导航流程
- 执行导航的时候并不是立即刷新当前的页面，而是要等待渲染进程提交文档后才会刷新页面
  ![alt 用户输入](/sys-doc/imgs/input.png)

##### 开始导航

1. UI 线程

   - UI 线程调用网络线程(网络进程)，获取网络资源
   - 同时 UI 线程就会找到或者启动一个渲染进程
   - 找到可能存在可复用的渲染进程、同站点
   - 发起网络请求和准备渲染进程并行，网络请求有一定的时延
     ![alt 开始导航](/sys-doc/imgs/navstart.png)

2. 网络线程(网络进程)(pc)
   1. 构建起始行
      - 查询缓存
   2. 发起请求
      - 准备 IP 地址和端口，查询域名系统获取对应的 IP，获取端口号，http 默认端口是 80，https 默认端口 443
   3. 等待 TCP 队列，目前 chrome 浏览器对 http/https 限制了同一个域名最多可以建立 6 个 TCP 链接，当然 HTTP2.0 是不受限的
   4. 建立 TCP 链接，通过三次握手建立链接，当然如果是 https 还有 TLS/SSL 加密协商
   5. 发送请求
   6. 接受响应,
   7. 网络线程(网络进程)接受数据判别 content-type，分发执行 html、css、js 交由渲染进程处理，file 交由 download manager
   8. 检测 html 内容是否符合安全规范，checks down
      - 阻止跨域
      - 资源混合警告(http/https)
        ![alt 安全检查](/sys-doc/imgs/sniff.png)
   9. 如果网络线程(网络进程)收到 301 这样的响应码，会通知 UI 线程发生重定向，否则通知 UI 线程，数据 ready
3. UI 找到之前创建的渲染进程
   ![alt 查找渲染进程](/sys-doc/imgs/findrenderer.png)
4. 浏览器进程通过 IPC 给渲染进程发提交导航消息，请求渲染页面
   ![alt 查找渲染进程](/sys-doc/imgs/commit.png)
5. 渲染进程建立与网络进程的数据通信，接受 html Stream
6. 渲染进程通过 IPC 向浏览器进程发送确认提交消息，浏览器进程开始更新导航栏等信息

#### 渲染流程

> 渲染过程的核心工作是将 HTML、CSS 和 JavaScript 转换成一个用户可以交互的网页,主要有主线程、工作线程、合成线程、光栅线程组成

![alt render](/sys-doc/imgs/renderer.png)

##### DOM 解析

- 接受到浏览器进程的提交文档通知后，建立与网络进程的数据连接、开始接受 html Data、但是 HTML 数据流，无法被浏览器识别，需根据 [HTML Standard](https://html.spec.whatwg.org/) 标准进行解析转为能够识别 DOM 树结构、DOM 结构可以被浏览器识别同时提供 javascript 操作的接口
  ![alt dom](/sys-doc/imgs/dom.png)

- DOM 解析过程中遇到 script 会中断等待 javascript 的下载执行
- DOM 解析过程可以对 css 设置预解析<link rel="preload">,对 js 可以设置 async or defer 避免中断 DOM 解析

##### 样式计算

- 同样需要主线程把 CSS 转换为浏览器能够理解的 styleSheets。因为 css 中的属性值有很多除了转换结构，还需转换样式表中的属性值，使其标准化，eg:2em 被解析成了 32px，red 被解析成了 rgb(255,0,0)，bold 被解析成了 700，根据 dom 的继承关系、层叠关系来计算合理的样式
- 计算出 DOM 树中每个节点的具体样式，涉及继承合层叠规则
- [chrome 默认样式](chrome https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/html/resources/html.css)
  ![alt dom](/sys-doc/imgs/computedstyle.png)

##### 布局阶段

- 有了 DOM 树和样式还不足以画出页面，因为不知道每个元素纪在页面中的几何位置
- 主线程根据 DOM 树和样式表计算出每个元素的几何位置，最后生成布局树，布局树较 DOM 树 有 2 个不同点：第一设置 display:none 属性的节点不会出现在布局树上，第二伪元素也会出现在布局树上
- 任务几何属性的变动都会引起重新布局，而重布局是及其消耗性能的工作

##### 分层

- 渲染引擎还需要为特定的节点生成专用的图层，并生成一棵对应的图层树，eg: ps 的图层
- 并不是布局树的每个节点都包含一个图层，如果一个节点没有对应的层，那么这个节点就从属于父节点的图层
  - 产生图层
    - 拥有独立上下文[层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
    - 发生内容裁减
      ![alt dom](/sys-doc/imgs/layer.png)

##### 绘制

- 会把一个图层的绘制拆分成很多小的绘制指令，eg:画图的步骤，先画什么再画什么
- 将绘制指令按绘制顺序组成待绘制列表
  ![alt dom](/sys-doc/imgs/paint.png)

##### 栅格化

- 主线程将待绘制列表提交给合成线程，合成线程负责将绘制指令转化为位图的过程即栅格化
- 过程
  1. 合成线程将图层划分为图块、然后优先对视口附件的图块进行栅格化
  2. 合成线程将图块提价给栅格化线程池
  3. 目前栅格化都会使用 GPU 来快速栅格化
  4. GPU 生成的位图都会保存在 GPU 中
     ![alt dom](/sys-doc/imgs/raster.png)

##### 合成显示

- 一旦所有图块都被光栅化，合成线程就会生成一个绘制图块的命令——“DrawQuad”，创建渲染框架

  | 命令             | 描述                                           |
  | ---------------- | ---------------------------------------------- |
  | Draw quads       | 用于合成的图块内存位置、页面绘制中的位置等信息 |
  | compositor frame | 代表页面框架的绘制图块信息                     |

- 合成线程将渲染框架通过 IPC 提交给浏览器进程,渲染进程将合成渲染的框架发送给 GPU 显示页面
  ![alt dom](/sys-doc/imgs/composit.png)

#### 参考

- [ modern web browser](https://developers.google.com/web/updates/2018/09/inside-browser-part1)
