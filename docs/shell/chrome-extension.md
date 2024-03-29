# chrome 插件

## 需求规划

日常开发 chrome 打开使用的频率都比较高，想做个 tab 页面

页面功能：

1. 日历
2. 任务规划
3. 爬取感兴趣的咨询

这也算是给这篇文章定一个基调，本文主要用于记录开发过程以及遇到的坑

## 核心概念

### The manifest

manifest.json 它还必须位于扩展的根目录中。清单记录重要的元数据、定义资源、声明权限并标识要在后台和页面上运行的文件。

### The service worker

service_worker 可以处理和侦听浏览器事件。有许多类型的事件，例如导航到新页面、删除书签或关闭选项卡。可以使用[Chrome APIs](https://developer.chrome.com/docs/extensions/reference/)但不能直接与页面交互，只能采用通信的方式与 Content scripts 关联

```json
 "background": {
    "service_worker": "background.js"
  },
```

### Content scripts

就是通过 chrome 插件机制在当前页面注入的一段脚本，共享当前页面原始 DOM 但不共享 JS，同时无法获取使用 [Chrome APIs](https://developer.chrome.com/docs/extensions/reference/),但有 4 个 api 除外

1. chrome.extension(getURL , inIncognitoContext , lastError , onRequest , sendRequest)
2. chrome.i18n
3. chrome.runtime(connect , getManifest , getURL , id , onConnect , onMessage , sendMessage)
4. chrome.storage

以上 API 基本够用，如果不够用可以通过通信的方式与 service worker 关联

### The popup and other pages

插件可以设置不同的页面，eg:popup 、options

这些页面可以访问所有的[Chrome APIs](https://developer.chrome.com/docs/extensions/reference/)

## 功能开发

### 通用配置

```json
{
  "name": "chtty",
  "version": "0.0.1",
  "description": "All schedule information",
  "manifest_version": 3,
  "permissions": [
    "storage",
    "activeTab",
    "scripting",
    "contextMenus",
    "notifications",
    "webRequest"
  ],

  "background": {
    "service_worker": "background.js"
  }
}
```

manifest_version 配置文件的版本，也是必填字段，v2 版本即将下线，当前版本 v3,不同的版本可以使用的插件能力也不同。v3 在 v2 版本上增强了安全性、隐私性和性能,同时新增了 service workers and promises[v3 新特性](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/);

permissions 权限设置,[权限列表](https://developer.chrome.com/docs/extensions/mv2/declare_permissions/)

background 后台服务脚本，v2 版本这个后台服务脚本是一个常驻脚本，生命周期就是浏览器打开到浏览器关闭，一直在后台运行，v3 版本改为了按需执行，这是一个改动比较大的地方

eg:

```js
let count = 0;

chrome.runtime.onMessage.addListener((message) => {
  count++;
  console.log(count);
});
```

这段代码在 v2 版本是 ok 的，可以正常读写 count,在 v3 就不能这使用了,需要借助 storage 的能力，不然无法读取 count

```js
chrome.runtime.onMessage.addListener((message) => {
  chrome.storage.local.get(["count"], (result) => {
    const count = result.count ? result.count++ : 1;
    chrome.storage.local.set({ count });
    console.log(count);
  });
});
```

### pop 页面开发

点击浏览器插件 icon 时的弹窗页面，v3 版本在 action 字段中进行设置。之所以强调是 v3 版本，是因为在 v2 版本中是以 browser_action & page_action 配置体现的。配置的 html 可以正常引入 JS、CSS 资源，JS 中涉及的 chrome APi 权限的要在 permissions 申请。

```json
  "action": {
    "default_popup": "popup.html",
    "default_icon": "img/icon.png",
    "default_title": "这是一个示例Chrome插件",
  },
```

配置项有 icon、title、pop，其中有个 badge，即图标上的文本，无法通过配置项设置生效，需要通过脚本手执行添加

```js
chrome.action.setBadgeText({ text: "kds" }); //TODO action 替代了 browserAction
chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
```

因为 browser_action & page_action 合并到 action ,所以 chrome 提供的 api 也由以前的 browserAction 改到了 action

```js
// v2版本 api 使用方式
chrome.browserAction.setBadgeText({ text: "new" });
chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
```

### 脚本注入

```json
{
  "host_permissions": ["https://*/*"],
  "content_scripts": [
    {
      // "<all_urls>" 表示匹配所有地址
      "matches": ["<all_urls>"],
      // 多个JS按顺序注入
      "js": ["content-script.js"],
      // JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式
      "css": ["content-css.css"],
      // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
      "run_at": "document_end"
    }
  ]
}
```

需要申请 host 权限，插件脚本想要插入当前页面必须申请当前页面 host 权限，该字段支持接收一个数组参数，还支持正则

配置注册的脚本是有缺陷的，无法共享 JS,解决方案就是手动在当前页面插入一段脚本

```js
function injectCustomJs(jsPath) {
  jsPath = jsPath || "inject-script.js";
  var temp = document.createElement("script");
  temp.setAttribute("type", "text/javascript");
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  temp.src = chrome.runtime.getURL(jsPath); // TODO  chrome.extension.getURL

  temp.onload = function() {
    // 放在页面不好看，执行完后移除掉
    this.parentNode.removeChild(this);
  };
  (document.head || document.documentElement).appendChild(temp); // TODO document.head
}
```

因为版本变迁 chrome api 有所改变，getURL 从 runtime 上获取，extension 对象已不存在，还有一个 document 的坑,无法获取 head
此时通过 content script 脚本向页面添加动态脚本，可是普通页面访问不了插件的资源，此刻还需要增加一项配置。

```json
{
  "web_accessible_resources": {
    "resources": ["inject-script.js"],
    "matches": ["<all_urls>"]
  }
}
```

这个字段在 v2 接受一个数组，在 v3 接受的是一个对象

### newTab

```json
{
  "chrome_url_overrides": {
    "newtab": "./build/index.html"
  }
}
```

newTab 采用的是 React cli 搭建的页面，对 build 生成的静态资源引用路径要改为相对路径

```json
{
  "homepage": "."
}
```

## 发布上线

## 参考

[Chrome 扩展 V3 中文文档](https://doc.yilijishu.info/chrome/)
[v2 迁移到 v3](https://blog.shahednasser.com/chrome-extension-tutorial-migrating-to-manifest-v3-from-v2/#from-background-scripts-to-service-workers)
[【干货】Chrome 插件(扩展)开发全攻略](https://cloud.tencent.com/developer/article/1667242)
