# monitor

# monitor

## 指标分类

- 稳定性(stability)

  - JS 错误 JS 执行错误或者 promise 异常
  - 资源异常 script、link 等资源加载异常
  - 接口错误 ajax 或 fetch 请求接口异常
  - 白屏 页面空白

- 用户体验(experience)

  - 加载时间 各个阶段的加载时间
  - TTFB(time to first byte)(首字节时间) 是指浏览器发起第一个请求到数据返回第一个字节所消耗的时间，这个时间包含了网络请求时间、后端处理时间
  - FP(First Paint)(首次绘制) 首次绘制包括了任何用户自定义的背景绘制，它是将第一个像素点绘制到屏幕的时刻
  - FCP(First Content Paint)(首次内容绘制) 首次内容绘制是浏览器将第一个 DOM 渲染到屏幕的时间,可以是任何文本、图像、SVG 等的时间
  - FMP(First Meaningful paint)(首次有意义绘制) 首次有意义绘制是页面可用性的量度标准
  - FID(First Input Delay)(首次输入延迟) 用户首次和页面交互到页面响应交互的时间
  - 卡顿 超过 50ms 的长任务

- 业务(business)

  - PV page view 即页面浏览量或点击量
  - UV 指访问某个站点的不同 IP 地址的人数
  - 页面的停留时间 用户在每一个页面的停留时间

  ## 监控方案

  - 代码埋点：以嵌入代码方式进行监控
    - 优点:
      - 精细
    - 缺点：
      - 量大

- 无痕埋点：监控某一类全局事件
  - 优点
    - 全
    - 无侵入
  - 缺点
    - 数据量大

## 监控错误

- 封装请求方法
  - tracker
- 错误分类
  - js 错误
    - 监控 error 事件
    - 定义上报格式
    ```js
    {
          kind: 'stability', //监控指标的大类
          type: 'error', //小类型 这是一个错误
          errorType: 'jsError', //JS执行错误
          message: event.message, //报错信息
          filename: event.filename, //哪个文件报错了
          position: `${event.lineno}:${event.colno}`,
          stack: getLines(event.error.stack),
          selector: lastEvent ? getSelector(lastEvent.path) : '', //代表最后一个操作的元素
    }
    ```
    - 获取最后一个交互对象
      - 在捕获阶段记录
      - 阻止默认事件
    - 解析 stack
      - 格式化输出
      - ? 如何做好与源码的映射关系
    - 脚本错误
      - 脚本加载执行错误
        - 属于 js 执行错误
      - 脚本 404
        - 资源加载错误，必须在捕获阶段监听 error 事件
    - selector: 定位元素
      - 资源错误
      - 执行错误
  - promise 错误
- 资源异常
  - 监听 error
- 接口错误
- 白屏
  - 类型
    - 首页白屏
    - 代码崩溃白屏
  - 白屏监控方案
    - 监控时机
      - onerror
      - mutation observer api
      - 轮训
    - DOM 检测
      - elementsFromPoint
      - 图像识别
      - 基于 DOM 数据算法识别
  - 采用基于 elementsFromPoint 的方案
    - 注册监听
      - 其中 state 值包含下面三个值
        - loading: 表示文档正在加载中。
        - interactive: 表示文档已完成加载，文档已被解析，但图像、样式表和框架等子资源仍在加载。
        - complete: 表示文档和所有子资源已完成加载。如果状态变成这个，表明 load 事件即将触发
        - https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readystatechange_event
        - https://www.zhangxinxu.com/wordpress/2019/10/document-readystate/
    - 采点
      - document.elementsFromPoint()，该函数返还在特定坐标点下的 HTML 元素数组。
      - 采用十字交叉轴上的 18 个点

## 体验

- 性能指标
  - 指标
    |字段|描述|备注|  
     |----|----|----|
    |FP|First Paint(首次绘制) |包括了任何用户自定义的背景绘制，它是首先将像素绘制到屏幕的时刻|
    |FCP| First Content Paint(首次内容绘制)| 是浏览器将第一个 DOM 渲染到屏幕的时间,可能是文本、图像、SVG 等,这其实就是白屏时间|
    |FMP| First Meaningful Paint(首次有意义绘制)| 页面有意义的内容渲染的时间|
    |LCP| (Largest Contentful Paint)(最大内容渲染)| 代表在 viewport 中最大的页面元素加载的时间|
    |DCL| (DomContentLoaded)(DOM 加载完成)| 当 HTML 文档被完全加载和解析完成之后,DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载
    | | (onLoad) |当依赖的资源全部加载完毕之后才会触发|
    |TTI| (Time to Interactive) 可交互时间| 用于标记应用已进行视觉渲染并能可靠响应用户输入的时间点|
    |FID| First Input Delay(首次输入延迟)| 用户首次和页面交互(单击链接，点击按钮等)到页面响应交互的时间|
  - PerformanceObserver: 使用观察者模式进行性能指标统计
  - 指定检测 entry types 集合，当检测有变化时回调函数会被调用
    - element:FMP
      - 检测特性有属性 elementtiming 的元素
      - 可以自定义页面有意义的元素，进行统计
    - largest-contentful-paint [最大的内容绘制](https://segmentfault.com/a/1190000039842975)
    - first-input:
      - 浏览器收到 click 事件到主线程得空处理它之间存在延迟。[首次输入延迟](https://segmentfault.com/a/1190000039843026?utm_source=tag-newest)
- 加载时间

  - 加载时间统计

    | 字段                       | 含义                                                                                                                                                                                   |
    | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | navigationStart            | 初始化页面，在同一个浏览器上下文中前一个页面 unload 的时间戳，如果没有前一个页面的 unload,则与 fetchStart 值相等                                                                       |
    | redirectStart              | 第一个 HTTP 重定向发生的时间,有跳转且是同域的重定向,否则为 0                                                                                                                           |
    | redirectEnd                | 最后一个重定向完成时的时间,否则为 0                                                                                                                                                    |
    | fetchStart                 | 浏览器准备好使用 http 请求获取文档的时间,这发生在检查缓存之前                                                                                                                          |
    | domainLookupStart          | DNS 域名开始查询的时间,如果有本地的缓存或 keep-alive 则时间为 0                                                                                                                        |
    | domainLookupEnd            | DNS 域名结束查询的时间                                                                                                                                                                 |
    | connectStart               | TCP 开始建立连接的时间,如果是持久连接,则与 fetchStart 值相等                                                                                                                           |
    | secureConnectionStart      | https 连接开始的时间,如果不是安全连接则为 0                                                                                                                                            |
    | connectEnd                 | TCP 完成握手的时间，如果是持久连接则与 fetchStart 值相等                                                                                                                               |
    | requestStart               | HTTP 请求读取真实文档开始的时间,包括从本地缓存读取                                                                                                                                     |
    | requestEnd                 | HTTP 请求读取真实文档结束的时间,包括从本地缓存读取                                                                                                                                     |
    | responseStart              | 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的 Unix 毫秒时间戳                                                                                                               |
    | responseEnd                | 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时的 Unix 毫秒时间戳                                                                                           |
    | unloadEventStart           | 前一个页面的 unload 的时间戳 如果没有则为 0                                                                                                                                            |
    | unloadEventEnd             | 与 unloadEventStart 相对应，返回的是 unload 函数执行完成的时间戳                                                                                                                       |
    | domLoading                 | 返回当前网页 DOM 结构开始解析时的时间戳,此时 document.readyState 变成 loading,并将抛出 readyStateChange 事件                                                                           |
    | domInteractive             | 返回当前网页 DOM 结构结束解析、开始加载内嵌资源时时间戳,document.readyState 变成 interactive，并将抛出 readyStateChange 事件(注意只是 DOM 树解析完成,这时候并没有开始加载网页内的资源) |
    | domContentLoadedEventStart | 网页 domContentLoaded 事件发生的时间                                                                                                                                                   |
    | domContentLoadedEventEnd   | 网页 domContentLoaded 事件脚本执行完毕的时间,domReady 的时间                                                                                                                           |
    | domComplete                | DOM 树解析完成,且资源也准备就绪的时间,document.readyState 变成 complete.并将抛出 readystatechange 事件                                                                                 |
    | loadEventStart             | load 事件发送给文档，也即 load 回调函数开始执行的时间                                                                                                                                  |
    | loadEventEnd               | load 回调函数执行完成的时间                                                                                                                                                            |

  - 阶段计算

  | 字段             | 描述                                 | 计算方式                                              | 意义                                                                                                      |
  | ---------------- | ------------------------------------ | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
  | unload           | 前一个页面卸载耗时                   | unloadEventEnd – unloadEventStart                     | -                                                                                                         |
  | redirect         | 重定向耗时                           | redirectEnd – redirectStart 重定向的时间              |
  | appCache         | 缓存耗时                             | domainLookupStart – fetchStart                        | 读取缓存的时间                                                                                            |
  | dns              | DNS 解析耗时                         | domainLookupEnd – domainLookupStart                   | 可观察域名解析服务是否正常                                                                                |
  | tcp              | TCP 连接耗时                         | connectEnd – connectStart                             | 建立连接的耗时                                                                                            |
  | ssl              | SSL 安全连接耗时                     | connectEnd – secureConnectionStart                    | 反映数据安全连接建立耗时                                                                                  |
  | ttfb             | Time to First Byte(TTFB)网络请求耗时 | responseStart – requestStart                          | TTFB 是发出页面请求到接收到应答数据第一个字节所花费的毫秒数                                               |
  | response         | 响应数据传输耗时                     | responseEnd – responseStart                           | 观察网络是否正常                                                                                          |
  | dom              | DOM 解析耗时                         | domInteractive – responseEnd                          | 观察 DOM 结构是否合理，是否有 JS 阻塞页面解析                                                             |
  | dcl              | DOMContentLoaded 事件耗时            | domContentLoadedEventEnd – domContentLoadedEventStart | 当 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载 |
  | resources        | 资源加载耗时                         | domComplete – domContentLoadedEventEnd                | 可观察文档流是否过大                                                                                      |
  | domReady         | DOM 阶段渲染耗时                     | domContentLoadedEventEnd – fetchStart                 | DOM 树和页面资源加载完成时间，会触发 domContentLoaded 事件                                                |
  | 首次渲染耗时     | 首次渲染耗时                         | responseEnd-fetchStart                                | 加载文档到看到第一帧非空图像的时间，也叫白屏时间                                                          |
  | 首次可交互时间   | 首次可交互时间                       | domInteractive-fetchStart                             | DOM 树解析完成时间，此时 document.readyState 为 interactive                                               |
  | 首包时间耗时     | 首包时间                             | responseStart-domainLookupStart                       | DNS 解析到响应返回给浏览器第一个字节的时间                                                                |
  | 页面完全加载时间 | 页面完全加载时间                     | loadEventStart - fetchStart                           | -                                                                                                         |
  | onLoad           | onLoad 事件耗时                      | loadEventEnd – loadEventStart                         |

- 卡顿
  - PerformanceObserver entryTypes: ["longtask"]

## 参考

> [大前端时代前端监控的最佳实践](https://mp.weixin.qq.com/s/YiKRY_LDURY0uONtEhkUfg)

> [把前端监控做到极致](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651227494&idx=1&sn=444001447adef73ae8066ddfd1a01ddc&chksm=bd495ce28a3ed5f4f593dcacc315cbce554330230b8a56bcd5c980dcf4eb76cb5c4f3eaa8f12&scene=21#wechat_redirect)

> [如何设计一个前端监控系统](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651225487&idx=1&sn=060f827234606cd3e9a3771d67af4d0f&chksm=bd49a40b8a3e2d1dc9ed064543e236312e99a63e50987ae143012967366a1f691eff67a8ae1b&scene=21#wechat_redirect)
