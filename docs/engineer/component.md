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

- 组件开发流程
- 组件文档生成
- 组件发布
- CI/CD
- 脚手架搭建
