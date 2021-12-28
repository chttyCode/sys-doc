# 代码风格统一

-   prettier
    ```js
        npm i prettier -D
    ```
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
        ```js
            Error: Error while loading rule '@typescript-eslint/await-thenable': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
        ```
            - 指定parserOptions配置
        ```js
         checker.getTypeArguments is not a function
        ```
            - 升级 typescript>4

-   husky
    -   "prepare": "husky install" 在 npm i 时会自动执行该命令，初始化 husky
        -   利用 git 可以通过 core.hooks 指定 hooks 文件的能力，在文件中显示的注册构造
        ```js
            npm set-script prepare "husky install"
        ```
    -   添加指定的 hooks
        ```js
            npx husky add .husky/pre-commit "npm test"
        ```
    -   pre-commit 钩子
        -   执行 lint-staged ，对暂存区内容进行校验
    -   commit-msg 钩子
        -   对提交 message 的格式进行校验
        -   统一团队提交规范
        -   对错误 msg 格式给出提示
    -   注意点
        -   npm set-script 命令在 v 7.x 之后支持
            -   升级 npm 到 v7.x
        -   通过 husky add 添加的脚本会存在编码问题
            ```js
            SyntaxError: Invalid or unexpected token
            ```
            -   手动调整 pre-commit 脚本的编码格式
            -   手动创建 pre-commit 文件
        -   需添加 prepare script 命令，注册 husky 的 hooks
        -   vs old config package.json 无需添加校验规则
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
                -   .lintstagedrc
        -   lint 解析流程
            -   自动解析 git root，无需配置
            -   选择存在于项目目录中的暂存文件
            -   使用指定的 glob 模式过滤它们
            -   将绝对路径作为参数传递给 linter
        -   with husky
            -   在 husky 的 pre-commit hooks 执行 npx --no-install lint-staged
            -   配置 lint-staged
                ```js
                <!-- 方式1 -->
                "lint-staged": {
                    "app/**/*.{ts,tsx}": [
                        "eslint --quiet",
                        "prettier --write"
                    ],
                    "app/**/*.scss": [
                        "stylelint --syntax scss",
                        "stylelint --syntax scss --fix"
                    ]
                },
                ```
                vs
                ```js
                <!-- 方式2 -->
                "lint-staged": {
                    "app/**/*.{ts,tsx}": [
                        "npm run lint:ts",
                        "prettier --write"
                    ],
                    "app/**/*.scss": [
                        "stylelint --syntax scss",
                        "stylelint --syntax scss --fix"
                    ]
                },
                ```
        -   注意点
            -   方式 1：lint-staged 可以对过滤的文件执行 eslint 命令
            -   方式 2：不能 get 到暂存区的文件，是全量的 lint
            -   v10 版本之后不再需要手动 git add 将修复的内容添加到暂存区，会自动执行
-   commit msg

    -   @commitlint/cli：检测提交消息
    -   msg 格式校验方案

        -   commitlint-config-gitmoji：需要手动添加 JSON 数据
        -   @commitlint/config-angular：为 angular 的提交模板
        -   @commitlint/config-conventional 官方推荐

    -   校验失败给出 msg 消息模板

        -   husky 的 commit-msg 钩子进行配置修改
            -   shell 脚本执行失败没有退出会继续执行后续 shell
            -   以非 0 代码结束，打断提交
        -   添加失败提示模板

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

-   .eslintrc.js

    -   本规则，基于最新的华为前端开发规范，具体可见链接
        -   [华为 JavaScript 语言通用编程规范](http://w3.huawei.com/ipd/tsl/#!tsl_new/standard/standard.html?standardId=43549)
    -   rules
        [eslint rules 规则](https://git.huawei.com/h00508685/eslint-demo/blob/master/.eslintrc.js)

    ```js
    /**
     * 本规则，基于最新的华为前端开发规范，具体可见链接：
     * http://w3.huawei.com/ipd/tsl/#!tsl_new/standard/standard.html?standardId=43549
     */

    module.exports = {
        parser: '@typescript-eslint/parser', // 5.8.0
        parserOptions: {
            ecmaVersion: 2015,
            // ECMAScript modules 模式
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
        },
        env: {
            browser: true,
            node: true,
            commonjs: true,
            es6: true,
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/extensions': ['.ts', '.tsx'],
        },
        plugins: ['react', 'jsx-a11y', '@typescript-eslint', 'react-hooks'],
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/recommended-requiring-type-checking',
            'plugin:react-hooks/recommended',
        ],
        rules: {},
        overrides: [
            {
                files: ['*.ts', '*.tsx'], // Your TypeScript files extension
                parserOptions: {
                    project: ['./tsconfig.json'], // Specify it only for TypeScript files
                },
            },
        ],
    };
    ```

-   第三方库(可信库)

    ```JS
    npm i typescript@4.5.4   eslint@7.32.0 prettier@2.4.1 husky@7.0.4 lint-staged@11.2.6 @commitlint/cli@13.2.1 @commitlint/config-conventional@13.2.0   @typescript-eslint/parser@5.8.0 eslint-plugin-react@7.27.1 eslint-plugin-babel@5.3.1 eslint-plugin-import@2.25.3 eslint-plugin-jsx-a11y@6.5.1 eslint-plugin-react-hooks@4.3.0 @typescript-eslint/eslint-plugin@5.8.0 -D
    ```
