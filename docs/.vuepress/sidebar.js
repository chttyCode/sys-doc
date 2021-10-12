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
        ["/programme/react-statue", "状态管理"],
        ["/programme/react-simple", "简版实现"],
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
    ["browser", "浏览器"],
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
  ],
  "/shell/": [["", "集锦"]],
};
