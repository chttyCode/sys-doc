# 组件库

- 模版工程搭建

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
      > Error: Error while loading rule '@typescript-eslint/await-thenable': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
      - 通过 overrides 添加覆盖解析规则
      - script 路径定义

    ```js
    //.eslintrc.js
    module.exports = {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/extensions': ['.ts', '.tsx'],
      },
      plugins: ['react', 'babel', 'jsx-a11y', '@typescript-eslint', 'react-hooks'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react-hooks/recommended',
      ],
      rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'babel/new-cap': 1,
        'babel/camelcase': 1,
        'babel/no-invalid-this': 1,
        'babel/object-curly-spacing': 1,
        'babel/semi': 1,
        'babel/no-unused-expressions': 1,
        'babel/valid-typeof': 1,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
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

- husky
  - npm set-script 命令在 v 7.x 之后支持
  - husky add 失效
    ```js
      Usage:
      husky install [dir] (default: .husky)
      husky uninstall
      husky set|add <file> [cmd]
    ```
    - 解决方式
      - 升级 npm 到 v7.x
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
    - lint 解析流程
      - 自动解析 git root，无需配置
      - 选择存在于项目目录中的暂存文件
      - 使用指定的 glob 模式过滤它们
      - 将绝对路径作为参数传递给 linter
    - with husky
      - husky hooks 执行 npx --no-install lint-staged
      - 配置 lint-staged

- 组件开发流程
- 组件文档生成
- 组件发布
- CI/CD
- 脚手架搭建
