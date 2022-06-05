# 专题

## 上下文组

我们知道 chrome 是多进程架构，同源站点会使用相同的渲染进程，从 A 打开 B，如果 AB 同源则使用相同的渲染进程，但是如果单独打开则不会共用同一个渲染进程

### 原因分析：

页面的跳转方式：

1. 通过标签来和新标签建立连接
2. 通过 JavaScript 中的 window.open

通过这两种方式两个页签之间都是有联系的，新页面可以通过 window.opener 引用父页面，通过这两种方式的两个页签之间不论是否同源， window.opener 同样适用，我们把这类具有相互关联的页签称为浏览器上下文组

### 浏览器上下文组

我们把一个标签页所包含的内容，诸如 window 对象，历史记录，滚动条位置等信息称为浏览上下文。这些通过脚本相互连接起来的浏览上下文就是浏览上下文组

即：

1. 如果两个标签页都位于同一个浏览上下文组，且属于同一站点，那么这两个标签页会被浏览器分配到同一个渲染进程中。
2. 如果这两个条件不能同时满足，那么这两个标签页会分别使用不同的渲染进程来渲染。

#### 解决的问题：

合并共用渲染进程

#### 存在的问题：

同一上下文组中页签可以相互访问

#### 解决方式：

1. a 链接的 rel 属性值可以使用了 noopener 和 noreferrer，新页签不与原页面保持关联，即独立创建独立上下文

## setTime vs RFC

setTime 构建高性能动画存在的问题，更新不及时，会导致掉桢

原因分析：

setTime 是通过延迟队列加入宏任务队列的，而宏任务队列的是按顺序挨个执行的，所以会导致改变动画的回调函数不能按时执行，这一现象称之为队头阻塞

原因分析：

通常情况显示器每秒从显卡的前缓存区读取 60 张位图信息图片，但是浏览器要显示的话，需要将页面的位图信息提交到显卡的后缓存区，GPU 会将前后缓存区对调，后缓存区变成前缓存区，待显示器读取显示

![alt 不同步的桢](/sys-doc/imgs/vsync.png)

这时候我们会发现，显示器从前缓冲区读取图片，和浏览器生成新的图像到后缓冲区的过程是不同步的

产生的问题：

1. 如果渲染桢比刷新频率慢，会造成屏幕多桢显示同一幅画，即页面会造成卡顿的现象
2. 如果渲染桢比刷新频率快，会造成渲染桢的浪费
3. 就算刷新频率相同，也很慢避免生成桢跟读取频率同步

总之就是会产生掉桢、漏桢、卡顿的现象

解决方案：requestAnimationFrame

当 GPU 接收到 VSync 信号后，会将 VSync 信号同步给浏览器进程，浏览器进程再将其同步到对应的渲染进程，渲染进程接收到 VSync 信号之后，就可以准备绘制新的一帧了，具体流程你可以参考下图：

![alt 同步的桢](/sys-doc/imgs/bind-vsync.png)

## Audits 性能优化

Web 性能描述了 Web 应用在浏览器上的加载和显示的速度。

即优化的角度：

1. 加载阶段
2. 交互阶段

### 性能检测工具：Performance vs Audits

Performance 非常强大，但只提供运行时的数据
Audits 隐藏了数据细节，只提供直观性能数据和优化建议

### 检测准备

1. 稳定版本的 chrome 即可
2. 在隐身模式下进行，避免插件、缓存、cookie 的影响

### 利用 Audits 配置

监控类型

1.  Web 性能 (Performance)
2.  PWA(Progressive Web App) 程序的性能
3.  最佳实践策略 (Best practices)
4.  无障碍功能 (Accessibility)
5.  SEO 搜素引擎优化 (SEO)

设备类型：Moblie、Desktop

### 解读性能报告

#### 性能指标 (Metrics)

对应加载阶段的 6 个指标，View Trace 按钮，点击该按钮可以跳转到 Performance 标签

##### 首次绘制 (First Paint)

在渲染进程确认要渲染当前的请求后，渲染进程会创建一个空白页面，我们把创建空白页面的这个时间点称为 First Paint，简称 FP

First Content Paint，简称 FCP，即等待页面关键资源加载完，到绘制出第一个像素的时间点

Largest Content Paint，简称 LCP，即页面首屏内容完全绘制出来的时间点

原因：

可能由于网络原因导致加载时间过久

解决方案：

(参考网络性能优化)[https://chttycode.github.io/sys-doc/programme/browser-5.html]

##### 首次有效绘制 (First Meaningfull Paint)

介于 FCP 和 LCP 中间，但计算比较复杂，而且容易出错，现在不推荐使用该指标，推荐使用 LCP 指标

原因：

可能是加载关键资源花的时间过久，也有可能是 JavaScript 执行过程中所花的时间过久

##### 首屏时间 (Speed Index)

首屏时间，即 LCP 首屏时间的值越大，那么加载速度越慢

##### 首次 CPU 空闲时间 (First CPU Idle)

也称为 First Interactive，即首次可交互时间

##### 完全可交互时间 (Time to Interactive)

也称 TTI，它表示页面中所有元素都达到了可交互的时长。

优化策略：

推迟执行一些和生成页面无关的 JavaScript 工作。

##### 最大估计输入延时 (Max Potential First Input Delay)

页面在最繁忙时，估算的窗口响应用户时间

优化策略：

可以使用 WebWorker 来执行一些计算，从而释放主线程

#### 可优化项 (Opportunities)

Audits 已给出优化策略

#### 手动诊断 (Diagnostics)

采集了一些可能存在性能问题的指标

#### 运行时设置 (Runtime Settings)

![alt 加载过程](/sys-doc/imgs/loading-opt.png)

## performance 性能优化
