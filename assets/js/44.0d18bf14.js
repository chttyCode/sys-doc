(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{402:function(s,t,a){"use strict";a.r(t);var e=a(44),r=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"git-操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-操作"}},[s._v("#")]),s._v(" git 操作")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("配置查看")]),s._v(" "),a("ul",[a("li",[s._v("config 配置指令")])]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("git config\n")])])]),a("ul",[a("li",[s._v("查看系统 config")])]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("git config "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("system "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("list\n")])])]),a("ul",[a("li",[s._v("查看当前用户（global）配置")])]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("git config "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("global  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("list\n")])])]),a("ul",[a("li",[s._v("查看当前仓库配置信息")])]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("git config "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("local  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("list\n")])])])]),s._v(" "),a("li",[a("p",[s._v("SSH 免密与 Token 登录配置")]),s._v(" "),a("ul",[a("li",[s._v("ssh\n"),a("ul",[a("li",[s._v("查看 ssh 目录\n"),a("ul",[a("li",[s._v("ls -al ~/.ssh")])])]),s._v(" "),a("li",[s._v("新建一个新的 SSH KEY"),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("  ssh"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("keygen "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("t rsa "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("b "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4096")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("C")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"631486004@qq.com"')]),s._v("\n")])])]),a("ul",[a("li",[s._v("接着会提示这个公钥私钥的保存路径-建议直接回车就好（默认目录里)")]),s._v(" "),a("li",[s._v("接着提示输入私钥密码 passphrase")]),s._v(" "),a("li",[s._v("如果不想使用私钥登录的话，私钥密码为空，直接回车")])])]),s._v(" "),a("li",[s._v("add github id_rsa.pub\n"),a("ul",[a("li",[s._v("Github --\x3e Settings --\x3e SSH and GPG keys--\x3e New SSH key")]),s._v(" "),a("li",[s._v("把 id_rsa.pub 拷贝到 github 新建的 SSH keys 中")])])]),s._v(" "),a("li",[s._v("git 修改远程仓库地址\n"),a("ul",[a("li",[s._v("git remote set-url origin 新仓库地址")])])])])]),s._v(" "),a("li",[s._v("Token\n"),a("ul",[a("li",[s._v("Token 申请\n"),a("ul",[a("li",[s._v("Github --\x3e Settings --\x3e Developer settings --\x3e Personal access tokens")])])]),s._v(" "),a("li",[s._v("git 修改远程仓库地址")])]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("  git remote set"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("url origin https"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("TOKEN")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("@github"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("com"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("user_name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("repo_name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("git\n")])])])])])]),s._v(" "),a("li",[a("p",[s._v("撤销某单一文件已 commit 并 push 操作")]),s._v(" "),a("ul",[a("li",[s._v("查看提交记录"),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("    git "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("或 git log "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("pretty"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("oneline"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])])]),s._v(" "),a("li",[s._v("回退提交点\n"),a("ul",[a("li",[s._v("--soft\n"),a("ul",[a("li",[s._v("不删除工作空间改动代码，撤销 commit，上次 commit 的内容以 git add 状态出现在工作区"),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("git reset "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("soft "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("HEAD")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),s._v("\n")])])]),a("ul",[a("li",[s._v("撤销 add 状态,回到未追踪状态")])]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("git restore "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("staged "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("package")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("lock"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("json\n")])])])])])]),s._v(" "),a("li",[s._v("--mixed\n"),a("ul",[a("li",[s._v("不删除工作空间改动代码，撤销 commit，上次 commit 的内容为未追踪状态(即 git add . 操作之前的状态)")]),s._v(" "),a("li",[s._v("这个为默认参数,git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。"),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("git reset "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("HEAD")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),s._v("\n")])])])])])]),s._v(" "),a("li",[s._v("--hard\n"),a("ul",[a("li",[s._v("删除工作空间改动代码，撤销 commit，撤销 git add .")]),s._v(" "),a("li",[s._v("注意完成这个操作后，就恢复到了上一次的 commit 状态"),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("git reset "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("hard "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("HEAD")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),s._v("\n")])])])])])])])]),s._v(" "),a("li",[s._v("强制提交"),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("git push origin master "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("force\n")])])])])])])])])}),[],!1,null,null,null);t.default=r.exports}}]);