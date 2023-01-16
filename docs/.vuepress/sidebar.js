module.exports = {
  "/programme/": [
    ["", "编程"],
    ["git", "git"],
    ["vscode", "vscode"],
    ["typescript", "Typescript"],
    {
      title: "Javascript",
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
    {
      title: "Java",
      collapsable: true,
      children: ["/programme/java-basic", "/programme/java-se.md"],
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
            "/programme/browser-9",
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
    ["1-Array&Link", "数组、链表"],
    ["2-stack&queue", "队列、栈、双端队列"],
    ["3-hash", "hash 表、映射、集合"],
    ["5-recursion", "泛型递归、树递归"],
    ["6-divide", "分治&回溯"],
    ["7-depth", "深度广度优先"],
    ["9-search", "二分查找"],
    ["10-dep", "动态规划"],
    ["11-sort", "排序"],
    ["12-string", "字符串"],
  ],
  "/shell/": [
    ["", "指导思想"],
    ["collection", "贝壳"],
    {
      title: "2022",
      collapsable: true,
      children: [
        "/shell/01",
        "/shell/02",
        "/shell/03",
        "/shell/04",
        "/shell/05",
        "/shell/06",
        "/shell/07",
        "/shell/08",
        "/shell/09",
        "/shell/10",
        "/shell/11",
        "/shell/12",
      ],
    },
    {
      title: "2023",
      collapsable: true,
      children: [
        "/shell/2023-01",
        "/shell/2023-02",
        "/shell/2023-03",
        "/shell/2023-04",
        "/shell/2023-05",
        "/shell/2023-06",
        "/shell/2023-07",
        "/shell/2023-08",
        "/shell/2023-09",
        "/shell/2023-10",
        "/shell/2023-11",
        "/shell/2023-12",
      ],
    },
    {
      title: "分享",
      collapsable: true,
      children: ["/shell/chrome-extension", "/shell/to-share", "/shell/regexp"],
    },
  ],
};
