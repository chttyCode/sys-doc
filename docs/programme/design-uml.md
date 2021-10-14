# UML

> Unified Modeling Language (UML)又称统一建模语言或标准建模语言

- 前置知识
  - 软件的生命周期
    - 可行性分析报告和软件开发计划
      > 分析风险&挑战
      - 产出
        - 可行性分析报告
    - 需求分析阶段
      > 分析现状&痛点
      - 业务架构进行分析
      - 分析软件需要完成什么功能
      - 产出
        - 分析说明书
    - 软件设计
      - 确定技术栈、数据库 、数据模型设计表结构
      - 产出设计文档
    - 编码
    - 测试
    - 实施维护
  - 软件的开发模型
    - 瀑布模型
      > 设计一系列阶段顺序展开
    - 增量模型
      > 把待开发系统模块化， 将每个模块作为一个增量组件，从而分批次地分析、设计、编码和测试这些增量组件
      - 适用于存在风险变更项目开发
    - 原型开发模式
      - 执行实际软件的开发之前，应当建立系统的一个工作原型
- 模型图

  - 用例图
    - 主要用于表达系统的功能性需求或行为
    - 用例之间的关系
      - extends
        - 不影响主流程，eg: 登陆功能 vs 找回密码
      - include
        - 影响主流程，eg: 注册功能 vs 检测用户是否可用
    - ![用例图](/sys-doc/imgs/use-case.svg)
    - 用例描述，以登陆为例
      | 项目 | 内容 |
      | ---- | ---- |
      | 用例名称 | 登陆 |
      | 用例 ID | login |
      | 角色 | 用户 |
      | 用例描述 | 描述用户的登录过程 |
      | 前置条件 | 打开网站页面 |
      | 基本事件流 | 1.点击登录 2. 输入用户名和秘密 3. 点击登录 4. 服务器会使用会话保存用户登录状态 |
      | 其它事件流 | 1. 用户名为空提示用户名不能为空 2。密码为空提示密码不能为空 |
      | 异常事件流 | 登录超时则返回登录页 |
      | 后置条件 | 登录成功，进入个人中心 |
  - 类图

    > 类图（Class Diagram）描述类的静态结构，定义类及描述类之间的联系，如关联、依赖、聚合等，还包括类的内部结构(类的属性和操作)

    - 7 元素
      - 类
      - 接口
      - 协作
      - 依赖
      - 泛化
      - 关联
      - 实现
    - 在 UML 中,类用矩形来表示,分为 3 个部分: 名称部分(Name)、属性部分(Attribute)和方法部分(function)

  - 类的关系
    - 关系可以从强到弱为 依赖< 关联 <聚合 <组合
    - 依赖
      - 只要在类中用到了对方，那么它们之间就存在依赖关系，如果没有对方，连编译都通过不了，通常表现为属性

- 活动图
- 时序图

- 参考文献
  - [创建模型和图](https://www.ibm.com/docs/zh/rational-soft-arch/9.6.1?topic=diagrams-class)