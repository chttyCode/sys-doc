# 代码风格统一

- webpack babel-loader

  - webpack 编译采用的是 ts-load、统一编译&校验

    - babel-loader@8.2.3 调用 babel 进行编辑
    - @babel/core@7.16.5 babel 核心包 只能转语法
    - @babel/preset-env@7.16.5 预设集合
    - @babel/plugin-transform-runtime@7.16.5 用于提取公共 helpers
    - core-js@3.19.3 提供 api 转译
    - @babel/plugin-proposal-decorators@7.16.5 提供装饰器
    - @babel/plugin-proposal-class-properties@7.16.5 编译为宽松类型属性定义

    ```js
        npm i babel-loader@8.2.3 @babel/core@7.16.5   @babel/preset-env@7.16.5 @babel/plugin-transform-runtime@7.16.5 core-js@3.19.3  @babel/plugin-proposal-decorators@7.16.5   @babel/plugin-proposal-class-properties@7.16.5  @babel/preset-react@7.16.5 @babel/preset-typescript@7.16.5 -D
    ```

    - 问题

      - @types/react 存在循环引用

      ```js
      node_modules/@types/react/index.d.ts(239,10): error TS2456: Type alias 'ReactFragment' circularly references itself.
       <!--  @types/react-->
      interface ReactNodeArray extends ReadonlyArray<ReactNode> {}
      type ReactFragment = {} | Iterable<ReactNode>;
      type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
      ```

          - 查看package.json发现其依赖的typescript版本为next即最新，尝试升级typescript解决问题

      - 第三方库@types/react-slick 依赖包中有依赖 @types/react:'\*',导致该依赖 node_modules 下安装了 不同版本的 @types/react

      ```js
      node_modules/@types/react-slick/node_modules/@types/react/index.d.ts(240,10): error TS2456: Type alias 'ReactNode' circularly references itself.
      node_modules/@types/react-slick/node_modules/@types/react/index.d.ts(3100,14): error TS2300: Duplicate identifier 'LibraryManagedAttributes'.
      ```

          - 将项目的依赖设置为'*'任意版本
          > npm3.x之后的版本中node_module采用扁平化方式安装依赖(较嵌套安装,存在代码冗余、访问路劲过长等问题)，不管直接依还是子依赖优先安装在根目录下，安装时如果已存相同版本则跳过，如果已存在不符合版本则安装在当前模块的node_modules下
          > npm install 时5.0.x,不管package.json直接根据lock下载,存在的问题[issues 16866](https://github.com/npm/npm/issues/16866)
          > 5.1.x版本，package.json有新版本时，会无视lock根据package.json下载最新的并更新lock，存在的问题[issue 17979](https://github.com/npm/npm/issues/17979)
          > 5.4.2版本之后，如果只有package.json则根据package.json安装并生成lock文件，
          > 5.4.2版本之后，如果package&lock同时存在,package有新版本，但是lock版本在package.json指定的版本范围内，会安装lock的版本
          > 5.4.2版本之后，如果package&lock同时存在,package有新版本，但是lock版本不在package.json指定的版本范围内，会根据package版本，更新lock文件

  - .babelrc 配置

  ```js
      {
          "presets": [
              [
              "@babel/preset-env",
              {
                  "useBuiltIns": "usage",
                  "corejs": 3
              }
              ],
              "@babel/preset-react", "@babel/preset-typescript"
          ],
          "plugins": [
              [
              "@babel/plugin-transform-runtime",
              {
                  "corejs": false
              }
              ],
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "legacy": true }],
              ["import", { "libraryName": "antd", "libraryDirectory": "lib" }, "antd"]
          ]
      }

  ```

- prettier
  ```js
      npm i prettier -D
  ```
- eslint

  - 自带解释器支持支 ECMAScript 语法
    - plugin 推荐
      - eslint-plugin-react react 规则
      - eslint-plugin-babel 允许 ESLint 在由 Babel 转换的源代码上运行
      - eslint-plugin-import 支持 ECMAScript 2015(ES6) 和更高版本的导入/导出的路径&导出名称校验
      - eslint-plugin-jsx-a11y 用于 JSX 元素可访问性规则的静态 AST 检查器
      - eslint-plugin-react-hooks 强制执行 Hooks 规则
      - @typescript-eslint/eslint-plugin
  - 问题

    - 添加 rules 校验时需增加指定 parserOptions 配置

    ```js
        Error: Error while loading rule '@typescript-eslint/await-thenable': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
    ```

    - typescript 3.7 版本问题，upgrade >3.9 即可

    ```js
     checker.getTypeArguments is not a function
    ```

    - v4.2 has some breaking changes - 无法捕获 yield 表达式的类型，会抛出错误

    ```js
        D:/work/iair-web/app/api/applyChangeIairOrderFront.ts
        TypeScript error in D:/work/iair-web/app/api/applyChangeIairOrderFront.ts(9,11):
        'yield' expression implicitly results in an 'any' type because its containing generator lacks a return-type annotation.  TS7057

            7 |   let res = null;
            8 |   try {
        >  9 |     res = yield axios.post('air-app', 'air/change/submit_demand', data, {
            |           ^
            10 |       version: '',
            11 |       apiType: 'service',
            12 |     });
    ```

        - 解决方案
            - 安装 < 4.2版本
            - 添加type
                - [eg](https://vhudyma-blog.eu/yield-expression-implicitly-results-in-an-any-type-because-its-containing-generator-lacks-a-return-type-annotation/)

- husky
  - "prepare": "husky install" 在 npm i 时会自动执行该命令，初始化 husky
    - 利用 git 可以通过 core.hooks 指定 hooks 文件的能力，在文件中显示的注册构造
    ```js
        npm set-script prepare "husky install"
    ```
  - 添加指定的 hooks
    ```js
        npx husky add .husky/pre-commit "npm test"
    ```
  - pre-commit 钩子
    - 执行 lint-staged ，对暂存区内容进行校验
  - commit-msg 钩子
    - 对提交 message 的格式进行校验
    - 统一团队提交规范
    - 对错误 msg 格式给出提示
  - 注意点
    - npm set-script 命令在 v 7.x 之后支持
      - 升级 npm 到 v7.x
    - 通过 husky add 添加的脚本会存在编码问题
      ```js
      SyntaxError: Invalid or unexpected token
      ```
      - 手动调整 pre-commit 脚本的编码格式
      - 手动创建 pre-commit 文件
    - 需添加 prepare script 命令，注册 husky 的 hooks
    - vs old config package.json 无需添加校验规则
- lint-staged
  - 增量校验、避免全量校验
  - 使用方式
    - 命令行方式
    ```js
      npx mrm@2 lint-staged
    ```
    - 手动配置
      - 支持多种定义方式
        - package.json
        - .lintstagedrc
    - lint 解析流程
      - 自动解析 git root，无需配置
      - 选择存在于项目目录中的暂存文件
      - 使用指定的 glob 模式过滤它们
      - 将绝对路径作为参数传递给 linter
    - with husky
      - 在 husky 的 pre-commit hooks 执行 npx --no-install lint-staged
      - 配置 lint-staged
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
    - 注意点
      - 方式 1：lint-staged 可以对过滤的文件执行 eslint 命令
      - 方式 2：不能 get 到暂存区的文件，是全量的 lint
      - v10 版本之后不再需要手动 git add 将修复的内容添加到暂存区，会自动执行
- commit msg

  - @commitlint/cli：检测提交消息
  - msg 格式校验方案

    - commitlint-config-gitmoji：需要手动添加 JSON 数据
    - @commitlint/config-angular：为 angular 的提交模板
    - @commitlint/config-conventional 官方推荐

  - 校验失败给出 msg 消息模板

    - husky 的 commit-msg 钩子进行配置修改
      - shell 脚本执行失败没有退出会继续执行后续 shell
      - 以非 0 代码结束，打断提交
    - 添加失败提示模板

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

- eslint conflicts prettier

  - 避免这个问题的一个好方法是使用 Prettier 作为 ESLint 插件

  ```js
      npm install --save-dev eslint-plugin-prettier@4.0.0
  ```

  - 用 prettier 规则

  ```js
      npm install --save-dev eslint-config-prettier@8.3.0
  ```

      - prettier置于plugin最后，用于覆盖与eslint冲突的规则

  - 依然有一个问题 indent
    - eslint & prettier 有相互独立的缩进规则，疑问?eslint-config-prettier 竟然不能屏蔽 eslint 的 indent 规则
    - [Kai Cataldo's comment ](https://github.com/eslint/eslint/issues/10930)

- .eslintrc.js

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
      rules://------------------------前端规范-排版格式-------------------------------
      /**
       * 前端规范规则16	超长代码需要被换行
       * 规则22	每行代码应该少于120个字符（以此为准）
       */

      /**
       * 建议5	方法的参数尽量在一行显示
       */
      'function-paren-newline': ['warn', 'multiline'],

      /**
       * 建议6	对象字面量属性超过4个, 需要都换行
       */
      'object-property-newline': ['warn', { allowAllPropertiesOnSameLine: false }],

      /**
       * 建议7	链式调用对象方法时，一行最多调用4次，否则需要换行
       */
      'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 4 }],

      /**
       * 规则20	给if、for、do、while等语句的执行体加花括号 {}
       */
      curly: 'error',

      /**
       * 建议15	使用拖尾逗号
       */
      'comma-dangle': ['warn', 'always-multiline'],

      /**
       * 建议16	每句代码后加分号
       */
      'semi-style': ['warn', 'last'],

      /**
       * 建议19	控制文件的长度，最好不要超过2000行
       */
      'max-lines': ['error', 2000],

      /**
       * 原则6	方法设计应遵循单一职责原则（SRP），一个方法仅完成一个功能
       */
      'max-lines-per-function': ['error', 50],

      /**
       * 建议21	圈复杂度不超过20
       * 软件学院统一要求是：10
       */
      complexity: ['warn', 10],

      /**
       * 建议22	块语句的最大可嵌套深度不要超过4层
       */
      'max-depth': ['warn', 4],

      /**
       * 建议23	回调函数嵌套的层数不超过4层
       */
      'max-nested-callbacks': ['error', 4],

      /**
       * 规则25	禁止连续赋值
       */
      'no-multi-assign': 'error',

      /**
       * 规则26	变量不需要用undefined初始化
       */
      'no-undef-init': 'warn',

      /**
       * 规则67	块内变量不能与函数内的其他变量同名，块内函数应该使用函数表达式声明
       */
      'no-shadow': 'error',

      /**
       * 建议26	方法的参数个数不宜超过5个
       */
      'max-params': ['warn', 5],

      /**
       * 规则28	不要把方法的入参当作工作变量/临时变量
       */
      'no-param-reassign': 'error',

      /**
       * 规则29	不要使用 arguments，可以选择 rest 语法替代
       */
      'prefer-rest-params': 'error',

      /**
       * 建议31	function 声明或表达式的一致性
       */
      'func-style': ['warn', 'declaration', { allowArrowFunctions: true }],

      /**
       * 规则30	用到匿名函数时优先使用箭头函数（或 Function#bind），别保存 this 的引用
       */
      'prefer-arrow-callback': 'error',

      /**
       * 规则31	箭头函数的简写
       */
      'arrow-body-style': ['warn', 'as-needed'],

      /**
       * 规则32	要求使用一致的 return 语句
       */
      'consistent-return': 'error',

      /**
       * 规则35	在构造函数中禁止在调用super()之前使用this或super
       */
      'no-this-before-super': 'error',

      /**
       * 建议36	建议字符串使用单引号
       */
      quotes: ['warn', 'single'],

      /**
       * 规则36	使用模板字符串（`）实现字符串拼接
       */
      'prefer-template': 'error',

      /**
       * 建议37	不要使用字符串的行连续符号
       */
      'no-multi-str': 'warn',

      /**
       * 建议43	推荐在对象字面量中使用属性简写
       */
      'object-shorthand': 'warn',

      /**
       * 规则41	使用点号来访问对象的属性，只有属性是动态的时候使用 []
       */
      'dot-notation': 'error',

      /**
       * 规则42	getter和setter应该成对出现在对象中
       */
      'accessor-pairs': 'error',

      /**
       * 规则43	禁止在对象实例上直接使用 Object.prototypes 的内置属性
       */
      'no-prototype-builtins': 'error',

      /**
       * 规则44	需要约束 for-in
       */
      'guard-for-in': 'error',

      /**
       * 建议47	判断相等时使用 === 和 !== ，而不是 == 和 !=
       */
      eqeqeq: 'warn',

      /**
       * 建议50	不要使用否定表达式
       */
      'no-negated-condition': 'warn',

      /**
       * 规则47	每个switch语句都包含一个default语句，即使它不包含任何代码
       */
      'default-case': 'error',

      /**
       * 规则48	在switch语句的每一个有内容的case中都放置一条break语句
       */
      'no-fallthrough': 'error',

      /**
       * 规则49	case语句中需要声明词法时, 花括号{}不能省略
       */
      'no-case-declarations': 'error',

      /**
       * 规则59	禁止在 finally 语句块中出现控制流语句句块中出现控制流语句
       */
      'no-unsafe-finally': 'error',

      /**
       * 原则8	禁止使用eval()
       */
      'no-eval': 'error',

      /**
       * 规则61	禁止使用with() {}
       */
      'no-with': 'error',

      /**
       * 规则65	禁止使用较短的符号实现类型转换
       */
      'no-implicit-coercion': [
          'error',
          {
              allow: ['!!'],
          },
      ],
      'prettier/prettier': [
          'error',
          {
              endOfLine: 'auto',
              printWidth: 120,
              tabWidth: 4,
          },
      ],,
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

- 第三方库(可信库)

  ```js
   typescript@4.1.3
   @typescript-eslint/parser@5.8.0
   eslint-plugin-prettier@4.0.0
   eslint-config-prettier@8.3.0
   eslint-plugin-react@7.27.1
   eslint-plugin-import@2.25.3
   eslint-plugin-react-hooks@4.3.0
   eslint-plugin-jsx-a11y@6.5.1
   eslint@7.32.0
   prettier@2.4.1
   @typescript-eslint/eslint-plugin@5.8.0

   @commitlint/config-conventional@13.2.0
   @commitlint/cli@13.2.1
   lint-staged@11.2.6
   husky@7.0.4
  ```
