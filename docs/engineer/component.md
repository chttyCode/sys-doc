# reactTmp

React 模板工程

-   webpack
-   react
-   babel
-   scss
-   prettier
-   eslint

    -   自带解释器支持支 ECMAScript 语法
        -   plugin 推荐
            -   eslint-plugin-react react 规则
            -   eslint-plugin-babel 允许 ESLint 在由 Babel 转换的源代码上运行
            -   eslint-plugin-import 支持 ECMAScript 2015(ES6) 和更高版本的导入/导出的路径&导出名称校验
            -   eslint-plugin-jsx-a11y 用于 JSX 元素可访问性规则的静态 AST 检查器
            -   eslint-plugin-react-hooks 强制执行 Hooks 规则
            -   @typescript-eslint/eslint-plugin
    -   问题
        > Error: Error while loading rule '@typescript-eslint/await-thenable': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
        > Definition for rule '@typescript-eslint/rule-name' was not found @typescript-eslint/rule-name

-   husky
    -   "prepare": "husky install" 在 npm i 时会自动执行该命令，初始化 husky
    -   npm set-script 命令在 v 7.x 之后支持
    -   husky add 失效
        ```js
          Usage:
          husky install [dir] (default: .husky)
          husky uninstall
          husky set|add <file> [cmd]
        ```
        -   解决方式
            -   升级 npm 到 v7.x
-   lint-staged
    -   增量校验、避免全量校验
    -   使用方式
        -   命令行方式
        ```js
          npx mrm@2 lint-staged
        ```
        -   手动配置
            -   支持多种定义方式
                -   package.json
        -   lint 解析流程
            -   自动解析 git root，无需配置
            -   选择存在于项目目录中的暂存文件
            -   使用指定的 glob 模式过滤它们
            -   将绝对路径作为参数传递给 linter
        -   with husky
            -   husky hooks 执行 npx --no-install lint-staged
            -   配置 lint-staged
-   commit msg

    -   @commitlint/cli：检测提交消息
        -   问题
            ```js
             SyntaxError: Invalid or unexpected token
            ```
            -   原因是编码格式问题，通过命令行添加 rc 文件时的编码格式默认是 UTF-16
            -   解决方式，删除命令文件手动创建 rc 文件或者更改 rc 文件编码格式
    -   commitlint-config-gitmoji:提交消息模板
        -   需要手动添加 JSON 数据
            -   Failed to fetch gitmoji JSON, please refer to https://github.com/arvinxx/gitmoji-commit-workflow/tree/master/packages/plugin#fetch-error for help.
    -   @commitlint/config-angular：才用 angular 的提交模板‘
    -   @commitlint/config-conventional
    -   校验失败给出 msg 消息模板

        -   husky 的 commit-msg 钩子进行配置修改
            -   shell 脚本执行失败没有退出会继续执行后续 shell
            -   以非 0 代码结束，打断提交
        -   添加失败执行脚本
            -   通过 npm 执行脚本，输出文案提示，不熟悉 shell 脚本
                -   $? 可以获取执行的状态，但是当 npx 执行失败就直接退出脚本执行了，无发给而出提示文案

        ```js
         #!/bin/sh
        . "$(dirname "$0")/_/husky.sh"

        if ! npx --no-install commitlint --edit $1 ; then
        echo -e "
        \033[31m commit 格式错误，正确示例: git commit -m 'fix: 修复bug' \033[0m
            \033[33m  type(类型如下) \033[0m\r
            \033[33m  feat:新功能 \033[0m\r
            \033[33m  fix:修复bug \033[0m\r
            \033[33m  refactor:重构 \033[0m\r
            \033[33m  style:格式 \033[0m\r
            \033[33m  chore:构建过程或辅助工具变动 \033[0m\r
            \033[33m  docs:文档 \033[0m\r
            \033[33m  test:测试 \033[0m\r
            \033[33m  revert:回滚 \033[0m\r
            "; exit 1;
        fi
        ```

-   release
