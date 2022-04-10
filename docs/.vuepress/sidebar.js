module.exports = {
  "/programme/": [
    ["", "编程"],
    ["git", "git"],
    ["vscode", "vscode"],
    ["typescript", "Typescript"],
    {
      title: "JS",
      collapsable: true,
      children: [
        "/programme/javascript",
        "/programme/javascript-1",
        {
          title: "小红书",
          collapsable: true,
          children: [
            ["/programme/javascript-red-17", "第十七章"],
            ["/programme/javascript-red-18", "第十八章"],
          ],
        },
      ],
    },
    ["mini-program", "小程序"],
    {
      title: "nodejs",
      collapsable: true,
      children: [
        "/programme/nodejs",
        "/programme/nodejs-promise",
        "/programme/nodejs-stream",
        "/programme/nodejs-http",
        "/programme/nodejs-express",
        "/programme/nodejs-koa",
        "/programme/nodejs-redis",
        "/programme/nodejs-mysql",
        "/programme/nodejs-mongodb",
      ],
    },
    {
      title: "react",
      collapsable: true,
      children: [
        "/programme/react",
        ["/programme/react-statue", "redux"],
        ["/programme/react-toolkit", "toolkit"],
        ["/programme/react-recoil", "recoil"],
        ["/programme/react-hooks", "hooks"],
        ["/programme/react-context", "context"],
        ["/programme/react-simple", "react简码"],
        ["/programme/react-recommend", "react开发范式"],
        {
          title: "源码解读",
          collapsable: true,
          children: [
            "/programme/react-source",
            "/programme/react-source-1",
            "/programme/react-source-2",
            "/programme/react-source-3",
          ],
        },
      ],
    },
    {
      title: "浏览器",
      collapsable: true,
      children: [
        "/programme/browser",
        {
          title: "工作原理&实践",
          collapsable: true,
          children: [
            "/programme/browser-1",
            "/programme/browser-2",
            "/programme/browser-3",
            "/programme/browser-4",
            "/programme/browser-5",
            "/programme/browser-6",
            "/programme/browser-7",
            "/programme/browser-8",
          ],
        },
        "/programme/v8.md",
      ],
    },
    {
      title: "设计模式",
      collapsable: true,
      children: [
        "/programme/design-uml",
        "/programme/design",
        "/programme/design-word",
      ],
    },
  ],
  "/engineer/": [
    ["", "工程"],
    {
      title: "webpack",
      collapsable: true,
      children: [
        "/engineer/webpack",
        "/engineer/webpack-basic",
        "/engineer/webpack-opt",
        "/engineer/webpack-source",
      ],
    },
    {
      title: "组件库开发",
      collapsable: true,
      children: [
        "/engineer/component",
        "/engineer/component-1",
        "/engineer/component-2",
        "/engineer/component-3",
        "/engineer/component-4",
        "/engineer/component-5",
        "/engineer/component-6",
      ],
    },
  ],
  "/framework/": [
    ["", "framework"],
    "monitor",
    {
      title: "运维",
      collapsable: true,
      children: [
        "/framework/ops-linux",
        "/framework/ops-shell",
        "/framework/ops-nginx",
        "/framework/ops-docker",
        "/framework/ops-jenkins",
        "/framework/ops-k8s",
      ],
    },
  ],
  "/leetCode/": [
    ["", "leetCode"],
    ["array", "数组、链表"],
    ["stack", "队列、栈、双端队列"],
    ["hash", "hash 表、映射、集合"],
  ],
  "/shell/": [
    ["", "目录"],
    ["collection", "集锦"],
    ["202204", "4月"],
  ],
};
