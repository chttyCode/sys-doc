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

### 渲染流水线

### 分层合成

### 页面性能

### 虚拟 DOM

### 渐进式

### webComponent
