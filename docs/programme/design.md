# Design

> 指在软件设计中，被反复使用的一种代码设计经验。使用设计模式的目的是为了可重用代码，提高代码的可扩展性和可维护性

- 面向对象(OOP)四大特性

  - 抽象

    - 抽象就是将一类实体的共同特性抽象出来，抽象出你关心的行为属性,隐藏抽象的行为属性的实现，让调用者只关心有哪些功能而不是关心功能的实现
    - 抽象可以提高代码的可扩展性和维护性，修改实现不需要改变定义，可以减少代码的改动范围

    ```js
      <!-- 抽象即抽象啄木鸟和喜鹊的行为属性 -->
      class bird{
          constructor(public name: string ) {
         }
         fly(){}
      }
      <!-- 啄木鸟 -->
      class  woodpecker{
         <!-- 啄木 -->
         peckWood(){}
      }
      <!-- 喜鹊 -->
      class magpie{
         <!-- 建巢 -->
         nest(){}
      }
    ```

  - 封装
    - 将事物的属性变成对象的属性，事物的行为变成对象的方法
    - 减少耦合、仅暴露有限的必要接口，提高类的易用性
    ```js
      <!-- 喜鹊 属性 名称 行为 飞行、建巢-->
      class magpie{
         constructor(public name: string ) {
         }
         <!-- 飞 -->
         fly(){}
         <!-- 建巢 -->
         nest(){}
      }
    ```
  - 继承
    > 过度使用继承或者说继承层次过深会导致代码可读性、可维护性变差 子类和父类高度耦合，修改父类的代码，会直接影响到子类
    - 实现代码复用，减少内存
      ```js
         <!-- 抽象即抽象啄木鸟和喜鹊的行为属性 -->
         class bird{
            constructor(public name: string ) {
            }
            fly(){}
         }
         <!-- 喜鹊 -->
         class magpie extends bird{
            <!-- 建巢 -->
            nest(){}
         }
      ```
  - 多太
    - 多态是指，子类自有属性和方法可以替换父类
    - 保持子类的开放性和灵活性，可以重写父类中的方法

- 设计原则

  | 首字母 | 指代         | 概念                                                                                          |
  | ------ | ------------ | --------------------------------------------------------------------------------------------- |
  | S      | 单一职责原则 | 单一功能原则认为对象应该仅具有一种单一功能的概念                                              |
  | O      | 开放封闭原则 | 开闭原则认为软件体应该是对于扩展开放的，但是对于修改封闭的的概念                              |
  | L      | 里氏替换原则 | 里氏替换原则认为程序中的对象应该是可以在不改变程序正确性的前提下被它的子类所替换的的概念      |
  | I      | 接口隔离原则 | 接口隔离原则认为多个特定客户端接口要好于一个宽泛用途的接口的概念                              |
  | D      | 依赖反转原则 | 依赖反转原则认为一个方法应该遵从依赖于抽象而不是一个实例的概念,依赖注入是该原则的一种实现方式 |

  - 依赖反转原则(依赖倒置)

    - 高层次的模块不应该依赖于低层次的模块，两者都应该依赖于抽象接口。
    - 抽象接口不应该依赖于具体实现。而具体实现则应该依赖于抽象接口。

      ```js
         interface fruitModal {
            taste: string;
            grow: () => string;
         }
         class Orange implements fruitModal {
            constructor(public taste: string) {}
            grow() {
               return '淮南';
            }
         }
         class Apple implements fruitModal {
            constructor(public taste: string) {}
            grow() {
               return '热带';
            }
         }
         class Factory {
            constructor(type) {
               if (type === 'orange') {
                  return new Orange('甜');
               } else if (type === 'Banana') {
                  return new Apple('酸');
               }
            }
         }
         const fruit = new Factory('orange');
      ```

    - 迭代出其他产品时，Factory 需要不断的新增 if...else 分支
    - 缺点
      - 1: Factory 不应该依赖于底层的 Orange 或者 Apple class,应该依赖于接口 fruitModal

    ```js
     class Factory {
        constructor(public type: fruitModal) {}
     }
     const fruit = new Factory(new Orange('sweet'));
    ```

    - 总结
      - 即高低层次模块都依赖于接口
      - 实现依赖接口
        > 先声明定义依赖，在使用的时候传入具体依赖类，即理解为依赖反转或者倒置

- 设计模式
  - 创建型
    - 工厂模式
      > 一个类创造一种实例
      ```js
      var uninitializedFiber = createHostRootFiber(isConcurrent);
      function createHostRootFiber() {
        return new Fiber();
      }
      // 创造fiber 实例
      function Fiber() {
        return {
          current: null,
        };
      }
      ```
    - 工厂方法模式
  - 结构型
  - 行为型
