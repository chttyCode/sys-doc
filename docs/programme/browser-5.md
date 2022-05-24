# 页面

### chrome 的网络面板

页面开发的核心利器-chrome 开发者工具，工具有众多的功能面板 Elements(页面结构)、Console(JS shell)、Sources(file 资源)、NetWork(网络)、Performance(性能)、Memory(内存堆栈)、Application(缓存数据)、Security(安全)、Audits(性能诊断) 和 Layers(页面分层)。

NetWork(网络)

控制

过滤

抓图

时间线

详情列表

    size:可以切换升将序排列，内容大小会展示实际传输、源文件大小

    单个资源加载指标

    Queuing

      网络进程发起请求时，会有很多原因的导致不能立即执行，即需要排队等待
      原因分析：
        资源优先级：核心文件css、html、js优先级高于图片、音频
        http1.1对同一个域名的链接不能超过6个
        网络进程为数据分配磁盘空间

      优化:
         域名分片
         升级到http2

    Stalled

       表示停滞，即在排队结束，到发起链接的间隔时间

    Initial connection/SSL

      建立TCP链接时间、https协商加密时间

    Request sent

      建立好链接之后发送缓存中的请求数据

    TTFB

      等待接收服务器第一个字节数据的时间

      原因:
        动态页面可能跟生成页面所需的数据有关
        网络原因，使用了低带宽的服务器
        请求头带了多余信息

      优化:
        提升服务器渲染能力、增加缓存
        采用CDN缓存静态文件
        减少cookie体大小

    Content Download

      接收到全部响应数据所用的时间

下载信息

### DOM 树

DOM 是由渲染引擎内的 HTML 解析器对文档流解析生成的一种数据结构，

作用有三:1、提供生成页面基础数据 2、提供 JS 操作的接口 3、拒绝不安全的操作，提供安全防护

DOM 的生成过程是流式的解析而不是等待整个文档 down load 才开始解析的

DOM 的生成会受 JS 的影响，HTML 解析器遇到 JS 会中断解析，等待 JS 下载解析执行，而 JS 在解析之前不知道是否操作了 CSSOM，所以 JS 引擎都会等待 CSS 文件的下载执行完成才开始解析 JS

渲染引擎有一个 XSSAuditor 模块用于检测词法安全，用于检测是否引用了外部脚本，是否符合 CSP 规范，是否存在跨站点请求等，如果出现不符合规范的内容，XSSAuditor 会对该脚本或者下载任务进行拦截

优化:

使用 CDN 来加速 JavaScript 文件的加载
压缩 JavaScript 文件的体积
如果 JavaScript 文件中没有操作 DOM 相关代码，就可以将该 JavaScript 脚本设置为异步加载，通过 async 或 defer 来标记代码

### 渲染流水线之 CSS

CSS 如何影响首屏加载时间？

DOM 树是构建页面的基础数据，那么还有一个重要的资源 CSSOM 也同等重要，其提供这页面基本的样式数据

CSSOM 的作用有二：1.提供 JS 操作样式的能力 2. 提供 DOM 树的样式位置信息

在整个渲染过程中，CSSOM 的构建阻塞情况分两种：1. 阻塞 DOM 树构建，2.阻塞布局树构建，所以说 CSSOM 的构建对首屏渲染来说十分重要

优化:

第一阶段: 发出请求到网络进程提交数据，影响主要为网络、服务器等因素，可关注 TTFB 时长优化

第二阶段: 渲染进程收到提交数据，创建空白页，等待流水线渲染，即解析白屏。通常瓶颈表现为文件下载、JS 解释执行，优化手段：1.减少关键资源，即内联 css、js 2.减少文件大小，通常一个 http 包大小为 14kb，减少 RTT(收受包的延迟时间) 3.对非关键 JS 做异步处理 4.css 做媒体查询拆分

第三阶段: 首次渲染完成之后，页面被一点点渲染出来，通常的优化手段减少 JS 执行时长、减少重排重绘

### CSS 动画 vs JS 动画

说到动画就要清楚来两个概念：1、桢 2、桢率，所谓的桢就是显示时的一张张图片，为桢率就是 1s 内显示取读取多少张图片

清楚这两个概念之后我们在看一下一个页面是如果被呈现在屏幕上的，显示器负责到显卡去取没一张需要展示的位图，其中取的频率一般会在人眼可识别的 60 次 / 秒之上，即每秒到显卡取 60 张位图用于显示

那么显卡的位图又是怎么获取的呢？

显卡的位图来自于渲染流水线，渲染流水线通过分层合成机制向显卡的后缓冲区输入位图信息，输入频率于显示器的频率一般一致

那么我们就来看看每一帧的位图信息是如何生成的

渲染进程生成一帧的方式主要有三种：重排、重绘、合成，三种方式的渲染路径不同，所需要的时间也不同，而其中的合成机制路径最短、用时最少

chrome 的合成又是怎么做的呢？

为了避免牵一发而动全是的渲染方式，chrome 提出了分层的概念，类 ps,将一个页面分成若干了层，每一层的变化单独处理互不影响，在分层处理完之后再进行合成，形成一个完整的桢位图信息

分层即在渲染过程中，在生成布局树之后，对布局树进行分层，将布局树转花为层树，层树就是后续流程的基础数据结构了

### 页面性能

想要系统的优化页面的性能，就要从页面的生命周期去思考，看看每一个阶段那些会造成性能的浪费

页面的生命周期主要分三个阶段

#### 加载阶段

这个阶段主要就是结合渲染流水线分析，分析关键资源，即 css、html、js，像图片、视频、音频都是非关键资源不会阻塞页面的渲染，也不会影响关键资源的加载所以可以不用关注

![alt 加载阶段](/sys-doc/imgs/loading.png)

##### 关键资源影响因素分析

关键资源的个数
关键资源的大小
请求往返的延时，表示从发送端发送数据开始，到发送端收到来自接收端的确认，总共经历的时延。通常一个 http 数据包 14kb

##### 关键资源优化

减少关键资源个数：合并资源，可以采用内联，压缩，对于 CSSOM、DOM 操作的 JS 可以设置 async 或者 defer 属性，同样对于 css 也可以采用媒体查询

```html
<link
  rel="stylesheet"
  href="./index.css"
  media="none"
  onload="this.media='all'"
/>
```

这样浏览器将会异步加载这个 CSS 文件（优先度比较低），在加载完毕之后，使用 onload 属性将 link 的媒体类型设置为 all，然后便开始渲染。

```html
<link
  rel="stylesheet"
  href="./index1.css"
  media="screen and (max-width: 800px)"
/>
<link
  rel="stylesheet"
  href="./index2.css"
  media="screen and (min-width: 800px)"
/>
```

刷新页面时，如果视窗宽度小于 800px，那么优先加载 index1.css，如果大于 800px，则相反：

提前加载资源

```html
<link
  rel="preload"
  href="./index.css"
  as="style"
  onload="this.rel='stylesheet'"
/>
```

这个跟上述类似，但是优先级是最高的，不过还是异步加载，不会阻塞 DOM 的渲染

##### 减小关键资源大小

可以压缩 CSS 和 JavaScript 资源，移除 HTML、CSS、JavaScript 文件中一些注释内容

##### 减少关键资源 RTT 的次数

以通过减少关键资源的个数和减少关键资源，还可以使用 CDN

#### 交互执行阶段

交互阶段桢的生成主要由重排、重绘、合成三中方式

##### 减少 JS 大函数，减少长时间霸占主线程

##### 避免出现强制布局，可以通过 performance,观察布局是否在函数执行过程中发生

###### 正常布局

![alt 正常布局](/sys-doc/imgs/normal.png)

###### 强制布局

```js
function foo() {
  let main_div = document.getElementById("mian_div");
  let new_node = document.createElement("li");
  let textnode = document.createTextNode("time.geekbang");
  new_node.appendChild(textnode);
  document.getElementById("mian_div").appendChild(new_node);
  //由于要获取到offsetHeight，
  //但是此时的offsetHeight还是老的数据，
  //所以需要立即执行布局操作
  console.log(main_div.offsetHeight);
}
```

![alt 强制布局](/sys-doc/imgs/force.png)

###### 抖动布局

```js
function foo() {
  let time_li = document.getElementById("time_li");
  for (let i = 0; i < 100; i++) {
    let main_div = document.getElementById("mian_div");
    let new_node = document.createElement("li");
    let textnode = document.createTextNode("time.geekbang");
    new_node.appendChild(textnode);
    new_node.offsetHeight = time_li.offsetHeight;
    document.getElementById("mian_div").appendChild(new_node);
  }
}
```

![alt 抖动布局](/sys-doc/imgs/debounce.png)

##### 利用 css 做合成动画

##### 避免频繁的垃圾回收

#### 卸载阶段

主要处理一些清理动作

### 虚拟 DOM

首先虚拟 DOM 是因为真是的 DOM 更新存在重排、重绘、合成等牵一发而动全身的渲染流程，很是浪费性能，这种渲染模式对一些大型单页应用网站来说局部的更新是非常糟糕的

虚拟 DOM 可以优化 DOM 的操作，对操作行为做过滤&合并

### 渐进式

#### 浏览器的三大演进路线

应用程序 web 化

web 应用移动化

web 操作系统化

google 一致致力于多端一统

#### web 应用 vs 本地应用

1. Web 应用缺少离线使用能力，在离线或者在弱网环境下基本上是无法使用
2. Web 应用还缺少了消息推送的能力
3. Web 应用缺少一级入口，也就是将 Web 应用安装到桌面，在需要的时候直接从桌面打开 Web 应用，而不是每次都需要通过浏览器来打开。

#### 解决方案 PWA（Progressive Web App）

通过技术手段缩小与本地应用的差距

通过引入 Service Worker 来试着解决离线存储和消息推送的问题

通过引入 manifest.json 来解决一级入口的问题

Google 没有类似微信或者 Facebook、apple 这种体量的用户群体,PWA 推行起来十分缓慢，即本文也不做深入探究

### webComponent

前面所有的知识点都是站在浏览器整个渲染、应用的角度，而这个 webComponent 却是站在了业务开发的角度去看问题

业务开发对组件化有着天然的渴求，因为组件化可以降低沟通、易于维护。众多的便能语言也都能提供组件化的封装能力，包括 JS

那什么是组件化，即一块高内聚、低耦合的代码。

但是 web 要天然支持组件化却是有难度的，从渲染流水线来看 DOM、CSSOM 都是全局的没办法去做私有化的隔离

#### 解决方案 webComponent

webComponent 是一套组合技术 Custom elements（自定义元素）、Shadow DOM（影子 DOM）和 HTML templates（HTML 模板）

通过影子 DOM 的方式实现了 DOM、CSSOM 的隔离，但是影子 DOM 内的 Js 是不会被隔离的

#### 栗子

```html
<!DOCTYPE html>
<html>
  <body>
    <!--
            一：定义模板
            二：定义内部CSS样式
            三：定义JavaScript行为
    -->
    <template id="geekbang-t">
      <style>
        p {
          background-color: brown;
          color: cornsilk;
        }

        div {
          width: 200px;
          background-color: bisque;
          border: 3px solid chocolate;
          border-radius: 10px;
        }
      </style>
      <div>
        <p>time.geekbang.org</p>
        <p>time1.geekbang.org</p>
      </div>
      <script>
        function foo() {
          console.log("inner log");
        }
      </script>
    </template>
    <script>
      class GeekBang extends HTMLElement {
        constructor() {
          super();
          //获取组件模板
          const content = document.querySelector("#geekbang-t").content;
          //创建影子DOM节点
          const shadowDOM = this.attachShadow({ mode: "open" });
          //将模板添加到影子DOM上
          shadowDOM.appendChild(content.cloneNode(true));
        }
      }
      customElements.define("geek-bang", GeekBang);
    </script>

    <geek-bang></geek-bang>
    <div>
      <p>time.geekbang.org</p>
      <p>time1.geekbang.org</p>
    </div>
    <geek-bang></geek-bang>
  </body>
</html>
```

#### 浏览器是如何实现的

影子 DOM 中的元素对于整个网页是不可见的；

影子 DOM 的 CSS 不会影响到整个网页的 CSSOM，影子 DOM 内部的 CSS 只对内部的元素起作

![alt 强制布局](/sys-doc/imgs/shadow-dom.png)

每个影子 DOM 都有一个 shadow root 的根节点,将要展示的样式或者元素添加到影子 DOM 的根节点上，每个影子 DOM 你都可以看成是一个独立的 DOM，它有自己的样式、自己的属性，内部样式不会影响到外部样式，外部样式也不会影响到内部样式

浏览器生成 DOM 树、CSSOM、布局树的时候都会去做大量的判断，跳过 shadow root 这样的影子 DOM
