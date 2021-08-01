const nav = require("./nav");
const sidebar = require("./sidebar");
module.exports = {
  base: "/sys-doc/",
  title: "sys-doc",
  themeConfig: {
    nav,
    logo: "/imgs/logo.jpeg",
    sidebar,
    lastUpdated: "Last Updated", // string | boolean

    // github 访问
    repo: "chttyCode/sys-doc",
    editLinks: true,
    editLinkText: "编辑此内容",
  },
};
