# 代码风格统一

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
    ```js
        Error: Error while loading rule '@typescript-eslint/await-thenable': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
    ```
        - 指定parserOptions配置
    ```js
     checker.getTypeArguments is not a function
    ```
        - 升级 typescript>4

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

- .eslintrc.js

  ```js
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
  rules: {
  //------------------------前端规范-排版格式-------------------------------
  /\*\*
  _ 规则 15 采取一致的空格缩进,只允许使用空格(space)进行缩进。
  _/
  indent: ['warn', 4],

      /**
       * 前端规范规则16	超长代码需要被换行
       * 规则22	每行代码应该少于120个字符（以此为准）
       */
      'max-len': ['warn', { code: 120 }],

      /**
       * 建议5	方法的参数尽量在一行显示
       */
      'function-paren-newline': ['warn', 'multiline'],

      /**
       * 建议6	对象字面量属性超过4个, 需要都换行
       */
      'object-property-newline': [
        'warn',
        { allowAllPropertiesOnSameLine: false },
      ],

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

  },
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

  ```JS
  npm i typescript@4.5.4   eslint@7.32.0 prettier@2.4.1 husky@7.0.4 lint-staged@11.2.6 @commitlint/cli@13.2.1 @commitlint/config-conventional@13.2.0   @typescript-eslint/parser@5.8.0 eslint-plugin-react@7.27.1 eslint-plugin-babel@5.3.1 eslint-plugin-import@2.25.3 eslint-plugin-jsx-a11y@6.5.1 eslint-plugin-react-hooks@4.3.0 @typescript-eslint/eslint-plugin@5.8.0 -D
  ```
