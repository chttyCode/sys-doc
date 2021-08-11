module.exports = {
  "/programme/": [
    ["", "编程"],
    ["git", "git操作"],
    ["typescript", "Typescript"],
    {
      title: "Javascript",
      collapsable: true,
      children: ["/programme/javascript", "/programme/javascript-red"],
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
        "/programme/react-simple",
        "/programme/react-source",
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
