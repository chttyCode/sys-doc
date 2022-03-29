# typescript

## 基础

### 安装

- npm install typescript -g
- tsc --init 创建配置文件
- 配置项

```js
"target": "es5", 编译成 es5 版本
"module": "commonjs", 模块规范
```

- 执行
  vscode Terminal->Run Task-> tsc:build 编译
  或 npm install ts-node -g(run code 插件)

### 类型

- 元组 tuple
  长度&类型已知的数组
- enum 枚举
  双向映射
  常量枚举
- null 和 undefined
  是其他类型的子类型
  strictNullChecks 严格校验模式
  不能 null 和 undefined 赋值给其他类型
- void vs never
  void 可以被赋值为 null 和 undefined
- never 不包含任何值
- Symbol
  es6 模块需要 es2015 的编译库，配置 config 中的 lib 参数
  BigInt
- 需要 ESNEXT 的 lib 参数配置
  number 和 bigint 不兼容
  Number、BigInt 是 js 类型
  number、bigint 是 ts 类型

### unknown 类型

unknown 类型可以被赋值为任意类型，但不能赋值给除 any、unknown 以外的类型
联合类型中会显示为 unknown 类型
在交叉类型中不影响其他类型组合

### 类型推导

### 包装类型

### 联合类型

- 联合类型未赋值之前只能访问公共方法

### 类型断言

### 字面量类型 vs 类型字面量

```js
//类型字面量
type Person = {
  name: string,
  age: number,
};
//可以实现枚举效果
const up: "up" = "up";
type Direction = "Up" | "Down" | "Left" | "Right";
function move(direction: Direction) {}
```

### 函数

- 声明方式

```js
function hello(name: string): void {
  console.log("hello", name);
}
```

- 表达式赋值

```js
type GetUsernameFunction = (x: string, y: string) => string;
let getUsername: GetUsernameFunction = function (firstName, lastName) {
  return firstName + lastName;
};
```

- 可选
- 默认
- 参数后置
- 剩余参数
- 参数后置

```js
function sum(...numbers: number[]) {
  return numbers.reduce((val, item) => (val += item), 0);
}
```

- 重载
  > 连续定义

```js
let obj: any={};
function attr(val: string): void;
function attr(val: number): void;
function attr(val:any):void {
    if (typeof val === 'string') {
        obj.name=val;
    } else {
        obj.age=val;
    }
}
```

### 类

- .ts=>模块

```js
export {} =>将单文件变为模块
```

- 静态属性
- 静态方法
- 实例属性
- 实例方法
- 原型属性
- 原型方法
- 修饰符使用方式都是一样的
- 装饰器
- 业务开发范畴之内这些技术很难用到，需要设计库或者开源代码学习

### 接口

- 对象接口：描述对象行为，属性
- 函数接口
- 类接口
- 接口 vs 别名
  继承-接口可继承，别名-不能继承
- 接口 vs 抽象类
  接口可以多继承，抽象类只能 extends 一个

### 泛型

- 泛型数组
- 泛型函数
- 泛型类

### 结构类型系统

- 联合类型
  多类型联合，变量只能赋值为其中某一种具体的类型
  联合类型的变量在为赋值前，只能访问联合类型的公共属性和方法
- 交叉类型
  多种类型组合而成的一个大类型
  变量为组合而成的新的大类型

### 类型转化

- 交叉类型
  联合类型的交叉问题
- typeof
- keyof

```js
interface Person{
  name:string;
  age:number;
  gender:'male'|'female';
}
//type PersonKey = 'name'|'age'|'gender';
type PersonKey = keyof Person;
```

- 索引访问
- 映射类型

```js
type PartPerson = {
  [Key in keyof Person]?:Person[Key]
}
```

- 条件类型
  Exclude
  Extract
  NonNullable

```js
interface Fish {
    name: string
}
interface Water {
    name: string
}
interface Bird {
    name: string
}
interface Sky {
    name: string
}
//若 T 能够赋值给 Fish，那么类型是 Water,否则为 Sky
type Condition<T> = T extends Fish ? Water : Sky;
let condition: Condition<Fish> = { name: '水' };
```

### 内置工具

- Exclude

```js
//针对类型
type Exclude<T,U>=T extends U ? never :T;
```

- Extract

```js
// 针对类型 never 不影响联合类型
type Extract<T,U>=T extends U ? T :never;
```

- pick

```js
// 针对类的属性
type Pick<T,k extends keyof T>={
[p in k]:T[p]
}
```

- Omit

```js
// 针对类的属性
type Omit<T,k extends keyof T>=Pick<T,Exclude<keyof T,k>>
```

- ReturnType

```js
// 针对函数
type ReturnType<T extends (...args:any)=>any>=T extends (...args:any)=>infer R?R:any
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;
```

- Parameter

```js
// 针对函数
 type Parameters<T> = T extends (...args: infer R) => any ? R : any;
```

### 代码检测

- ts 无法检测代码风格
- 无法检测编码习惯 let var const === vs==
- 使用 eslint 作为代码检测工具
  提供文件解析器@typescript-eslint/parse 和相关配置选项@typescript-eslint/eslint-plugin(停止维护 ts 自己的检测工具)
- Eslint
  安装项目 eslint
  由于 eslint 默认使用 Espree 进行语法解析，无法识别 typesript，需要使用@typescript-eslint/parse 替换默认解析器，该解析器需要安装 typescript
  安装内容

```js
npm i -D eslint //提供检测
npm i -D typescript @typescript-eslint/parse // 提供解析器
npm i -D @typescript-eslint/eslint-plugin // 作为eslint默认规则的补充
```

- 配置文件

```js
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    // 禁止使用 var
    "no-var": "error",
    // 优先使用 interface 而不是 type
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
  },
};
```

- vscode 集成

```js
{
    "files.eol": "\n",
    "editor.tabSize": 4,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ],
    "typescript.tsdk": "node_modules/typescript/lib"
}
```

- 结合 prettier

### 编译选项

- 未使用变量:noUnusedParameters

```js
{
    "compilerOptions": {
        "noUnusedLocals": true,
        "noUnusedParameters": true
    }
}
```

- 是否编译 js:allowJs

```js
allowJs	boolean	false
```

- 是否支持模块转化;allowSyntheticDefaultImports vs ensureModule

```js
allowSyntheticDefaultImports	boolean	false	允许对不包含默认导出的模块使用默认导入。这个选项不会影响生成的代码，只会影响类型检查。
```

### 模块 vs 命名空间

- 组织代码的形式不同
- 模块外部模块
- 命名空间内部模块

### 类型声明

- 声明变量
- 外部枚举
- namespace
- 声明文件
  - \_.d.ts 命名规范
  - config 设置
  - 编写声明文件
    package.json 中的 types 字段指定的文件
    根目录下 index.d.ts
    package.json 中 main 的同名.d.ts 文件
    nodemodule/@types/\*\*/_
    types/\*_/\_（根据 config.json 配置的 paths 去找）
  - 声明合并和扩展
    同名命名空间会合并
    namespace 和 交叉类型进行扩展

```js
//如果配置了paths,那么在引入包的的时候会自动去paths目录里找类型声明文件
//在 tsconfig.json 中，我们通过 compilerOptions 里的 paths 属性来配置路径映射
//paths是模块名到基于baseUrl的路径映射的列表
{
  "compilerOptions": {
    "baseUrl": "./",// 使用 paths 属性的话必须要指定 baseUrl 的值
    "paths": {
      "*":["types/*"]
    }
}
```

### webpack 编译

> https://juejin.cn/post/6844904052094926855

- ts-loader+babel-loader+for-ts-checker-webpack-plugin
  ts-loader 会进行转译和类型检测，每当文件改动时都会重新编译，文件数量会影响编译速度，需要 fork 一个新的进程去跑检测
- babel-loader + @bable/preset-typescript +eslint
  babel 只负责转译不负责校验
  需要配置 eslint-loader 进行前置校验

## FQA

### lib=>compilerOpations（指定编译时采用的库）

> https://segmentfaul t.com/a/1190000015747038

- Property 'MAX_SAFE_INTEGER' does not exist on type 'NumberConstructor'
  需要使用 ES2015 的库来编译
  默认是[]

```js
  ► For --target ES5: DOM,ES5,ScriptHost
  ► For --target ES6: DOM,ES6,DOM.Iterable,ScriptHost
```

### 非空断言

断言 element 存在
通过类装饰器添加属性时，也需非断言

```js
element!.style.color='green'
```

### tsc 单文件编译

无法指定 tsconfig.json 的配置文件
使用 -t 指定 target 进行编译
或者使用 tsconfig.json 中的 include 进行单文件编译

### in vs extends

in 用在定义类属性名
extends 定义逻辑分支、定义属性类型

### vscode 集成 tslint 插件

- VScode 的 tslint 扩展有两个，分别是：TSLint (deprecated) 和后来微软官方出的 TSLint 具体用法参考文档

```js
"editor.codeActionsOnSave": {
    "source.fixAll.tslint": true
}
```

- vscode 依然无法检测 tslint 的报错

```js
Not using the local TSLint version found for '/Users/myname/myproject/client/src/app/likes/likee/likee.component.ts'. To enable code execution from the current workspace you must enable workspace library execution.
// 解决方式

Go to Command Palette by pressing Ctrl + Shift + P,
In the input that pops up at the top of the VS Code, start typing
TSLint: Manage workspace library execution" and hit Enter.
From the menu that replaces the input, pick enable workspace library execution, and again hit Enter.
```

### 路径解析引用错误

```js
// tsconfig
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
}
// webpack
resolve: {
  extensions: [".ts", ".tsx", ".js", ".json"],
  alias: {
    "@": path.resolve("src"), // 这样配置后 @ 可以指向 src 目录
  },
},
```

### React 常用类型片段

```js
// css 类型
const todoItemStyle: React.CSSProperties = {
  color: "red",
  backgroundColor: "green",
};
// 函数式组件
const TodoItem: React.FC<Props> = (props: Props) => (
  <li style={todoItemStyle}>{props.todo.text}</li>
);
TodoItem.defaultProps;
// 类组件
React.Component<Props, State>
// 事件
React.ChangeEvent<HTMLInputElement>
React.FormEvent<HTMLFormElement>
// redux
let reducers = {
    counter,
    todos
};
type ReducersType = typeof reducers;
type CombinedState = {
    [key in keyof ReducersType]: ReturnType<ReducersType[key]>
}

```
