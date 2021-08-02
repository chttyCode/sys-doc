const nav = require("./nav");
const sidebar = require("./sidebar");
module.exports = {
  base: "/sys-doc/",
  title: "sys-doc",
  themeConfig: {
    nav,
    logo: "/imgs/logo.jpeg",
    sidebar,
    lastUpdated: "上次更新", // string | boolean

    // github 访问
    repo: "chttyCode/sys-doc",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "编辑此内容",
  },
  plugins: [
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          const moment = require("moment");
          moment.locale(lang);
          return moment(timestamp).format("YYYY/MM/DD");
        },
      },
    ],
  ],
};
