# Design

> 如何写出可扩展、易维护的代码?

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
         const fruit = new Factory('origin');
      ```

    - 迭代出其他产品时，Factory 需要不断的新增 if...else 分支
    - 错误
      - 1: Factory 不应该依赖于底层的 Orange 或者 Apple class,应该依赖于接口 fruitModal

    ```js
     class Factory {
        constructor(public type: fruitModal) {}
     }
     const fruit = new Factory('origin');
    ```

    - 即高低层次模块都依赖于接口
    - 实现依赖接口
      > 先声明定义依赖，在使用的时候传入具体依赖类，即理解为依赖反转或者倒置

  - 接口隔离(Interface Segregation Principle)

    - 可以理解为接口级的单一原则，类间的依赖关系应该建立在最小的接口上

  - 单一原则(Single responsibility principle)

    - 单一原则可以理解为只做一件事，提高代码的可读性、可维护性
    - 只做一件事可能有多个操作，拆分不能过渡，需要达到一个平衡点

  - 迪米特法则(Law of Demeter，LOD)

    - 减少实体之间的相互作用，降低耦合提高内聚

  - 合成复用原则

    - 单一、隔离、迪米特从类、接口、实体强调拆分、合成复用可视为平衡手段，在拆分的时候需要关注拆出能否复用，拆分不能过渡，否则会破坏高内聚

- 设计模式

  - 创建

    - 工厂模式

      - 简单工厂模式

        ```js

        class factory(){
           static create(type){
              switch(type){
                 case ModelA:new  ModelA()
              }
           }
        }
        ```

        - 根据 type 创建不同的实例
        - 如果产品的种类非常多 switch case 的判断会变得非常多
        - 不符合开放—封闭原则,如果要增加或删除一个产品种类，就要修改 switch case 的判断代码

      - 工厂方法模式

        - 工厂方法模式 Factory Method,又称多态性工厂模式。
        - 在工厂方法模式中,核心的工厂类不再负责所有的产品的创建，而是将具体创建的工作交给工厂子类去

        ```js
        class ModelA{
           static create(){}
        }

           class factory(){
              static create(type){
                 switch(type){
                    case 'A':new  ModelA.create()
                 }
              }
           }
        ```

        - 依然存在简单工厂模式的问题
        - 优点是：可以自定义创建子类逻辑

      - 抽象工厂模式

        - 依然没解决简单工厂模式的缺点

    - 单利模式

      ```js
         class Window {
            private static instance: Window;
            private constructor() { }
            static getInstance() {
               if (!Window.instance) {
                     Window.instance = new Window();
               }
               return Window.instance;
            }
         }
         //new Window();
         var w1 = Window.getInstance();
         var w2 = Window.getInstance();
         console.log(w1 === w2);
      ```

      - 内部创建单利

      ```js
         let Window = (function () {
            let window: Window;
            let Window = function (this: Window) {
               if (window) {
                     return window;
               } else {
                     return (window = this);
               }
            }
            Window.prototype.hello = function () {
               console.log('hello');
            }
            return Window;
         })();

         let window1 = new (Window as any)();
         let window2 = new (Window as any)();
         window1.hello();
         console.log(window1 === window2)

      ```

      - 显示创建单利，即 new 产生的是单利

      ```js
         class Window{
            hello(){}
         }

         let createInstance = (function () {
            let instance: Window;
            return function () {
               if (!instance) {
                     instance = new (Window as any)();
               }
               return instance;
            }
         })();

         let window1 = createInstance();
         let window2 = createInstance();
         window1.hello();
         console.log(window1 === window2)
      ```

      - 构建单利与实现分离
      - 可以扩展构建逻辑
      - 缺点：不能使用 new 的方式创建单利

      ```js
      export {};
      function Window() {}
      Window.prototype.hello = function () {
        console.log('hello');
      };

      let createInstance = function (Constructor: any) {
        let instance: any;
        return function (this: any) {
          if (!instance) {
            Constructor.apply(this, arguments);
            Object.setPrototypeOf(this, Constructor.prototype);
            instance = this;
          }
          return instance;
        };
      };
      let CreateWindow: any = createInstance(Window);
      let window1 = new CreateWindow();
      let window2 = new CreateWindow();
      window1.hello();
      console.log(window1 === window2);
      ```

      - 构建与实现分离
      - 可以扩展构建逻辑
      - 可以使用 new 的方式创建

  - 结构

    - 代理

      - 由于一个对象不能直接引用另外一个对象，所以需要通过代理对象在这两个对象之间起到中介作用
      - 代理模式就是为目标对象创造一个代理对象，以实现对目标对象的访问
      - 这样就可以在代理对象里增加一些逻辑判断、调用前或调用后执行一些操作，从而实现了扩展目标的功能
      - code style

        ```js
        <!-- 事件代理 -->
        <body>
           <ul id="list">
              <li>1</li>
              <li>2</li>
              <li>3</li>
           </ul>
        <script>
        let list = document.querySelector('#list');
        list.addEventListener('click',event=>{
              alert(event.target.innerHTML);
        });
        </script>
        </body>
        ```

            - 事件代理

        ```html
        <body>
          <div id="background">
            <button data-src="/images/bg1.jpg">背景1</button>
            <button data-src="/images/bg2.jpg">背景2</button>
          </div>
          <div class="bg-container">
            <img id="bg-image" src="/images/bg1.jpg" />
          </div>
          <script>
            let container = document.querySelector('#background');

            class BackgroundImage {
              constructor() {
                this.bgImage = document.querySelector('#bg-image');
              }
              setSrc(src) {
                this.bgImage.src = src;
              }
            }
            class LoadingBackgroundImage {
              static LOADING_URL = `/images/loading.gif`;
              constructor() {
                this.backgroundImage = new BackgroundImage();
              }
              setSrc(src) {
                this.backgroundImage.setSrc(LoadingBackgroundImage.LOADING_URL);
                let img = new Image();
                img.onload = () => {
                  this.backgroundImage.setSrc(src);
                };
                img.src = src;
              }
            }
            let loadingBackgroundImage = new LoadingBackgroundImage();
            container.addEventListener('click', function (event) {
              let src = event.target.dataset.src;
              loadingBackgroundImage.setSrc(src + '?ts=' + Date.now());
            });
          </script>
        </body>
        ```

            - 可以先加载缩略图，待高清图 down load 完毕，会执行替换

        ```html
        <!-- 图片懒加载 -->
        <body>
          <div class="image-container">
            <div class="image">
              <img data-src="/images/bg1.jpg" />
            </div>
            <div class="image">
              <img data-src="/images/bg2.jpg" />
            </div>
            </div>
          </div>
        </body>
        <script>
          const imgs = document.getElementsByTagName('img');
          const clientHeight = window.innerHeight || document.documentElement.clientHeight;
          let loadedIndex = 0;
          function lazyload() {
            for (let i = loadedIndex; i < imgs.length; i++) {
              if (clientHeight - imgs[i].getBoundingClientRect().top > 0) {
                imgs[i].src = imgs[i].dataset.src;
                loadedIndex = i + 1;
              }
            }
          }
          lazyload();
          window.addEventListener('scroll', lazyload, false);
        </script>
        ```

            - 待进入可是区域，加载图片

        ```html
        <!-- 防抖 -->
        <body>
          <div id="container">
            <div class="content"></div>
          </div>
          <script>
            function throttle(callback, interval) {
              let last;
              return function () {
                let context = this;
                let args = arguments;
                let now = Date.now();
                if (last) {
                  if (now - last >= interval) {
                    last = now;
                    callback.apply(context, args);
                  }
                } else {
                  callback.apply(context, args);
                  last = now;
                }
              };
            }
            let lastTime = Date.now();
            const throttle_scroll = throttle(() => {
              console.log('触发了滚动事件', (Date.now() - lastTime) / 1000);
            }, 1000);
            document.getElementById('container').addEventListener('scroll', throttle_scroll);
          </script>
        </body>
        ```

            - 节流

        ```html
        <body>
          <div id="container">
            <div class="content"></div>
          </div>
          <script>
            function throttle(callback, delay) {
              let timer;
              return function () {
                let context = this;
                let args = arguments;
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                  callback.apply(context, args);
                }, delay);
              };
            }
            let lastTime = Date.now();
            const throttle_scroll = throttle(() => {
              console.log('触发了滚动事件', (Date.now() - lastTime) / 1000);
            }, 1000);
            document.getElementById('container').addEventListener('scroll', throttle_scroll);
          </script>
        </body>
        ```

            - 防抖

        ```js
        const http = require('http');
        const httpProxy = require('http-proxy');
        //创建一个代理服务
        const proxy = httpProxy.createProxyServer();
        //创建http服务器并监听8888端口
        let server = http.createServer(function (req, res) {
          //将用户的请求转发到本地9999端口上
          proxy.web(req, res, {
            target: 'http://127.0.0.1:9999',
          });
          //监听代理服务错误
          proxy.on('error', function (err) {
            console.log(err);
          });
        });
        server.listen(8888, '0.0.0.0');
         <!-- 真实请求 -->
         let server = http.createServer(function (req, res) {
            res.end('9999');
         });
         server.listen(9999, '0.0.0.0');
        ```

            - 代理请求

        ```js
           <!-- proxy -->

           let wang={
              name: 'wanglaoshi',
              age: 29,
              height:165
           }
           let wangMama=new Proxy(wang,{
              get(target,key) {
                 if (key == 'age') {
                       return wang.age-1;
                 } else if (key == 'height') {
                       return wang.height-5;
                 }
                 return target[key];
              },
              set(target,key,val) {
                 if (key == 'boyfriend') {
                       let boyfriend=val;
                       if (boyfriend.age>40) {
                          throw new Error('太老');
                       } else if (boyfriend.salary<20000) {
                          throw new Error('太穷');
                       } else {
                          target[key]=val;
                          return true;
                       }
                 }
              }
           });
           console.log(wangMama.age);
           console.log(wangMama.height);
           wangMama.boyfriend={
              age: 41,
              salary:3000
           }
        ```

      - 生活案例：明星经纪人

    - 装饰器

      - 在不改变其原有的结构和功能为对象添加新功能的模式其实就叫做装饰器模式
      - 装饰比继承更加灵活,可以实现装饰者和被装饰者之间松耦合
      - 被装饰者可以使用装饰者动态地增加和撤销功能
      - 类装饰器
      - 属性装饰器
      - AOP
        - 在软件业，AOP 为 Aspect Oriented Programming 的缩写,意为面向切面编程
        - 可以通过预编译方式和运行期动态代理实现在不修改源代码的情况下给程序动态统一添加功能的一种技术
      - code style

        ```js
        interface Animal {
          swings: string;
          fly: any;
        }
        function flyable(target: any) {
          console.log(target);

          target.prototype.swings = 2;
          target.prototype.fly = function () {
            console.log('I can fly');
          };
        }
        @flyable
        class Animal {
          constructor() {}
        }
        let animal: Animal = new Animal();
        console.log(animal.swings);
        animal.fly();
        ```

      - 生活案例: 房子的装修

    - 适配器

      - 针对已有功能的接口，不适用于新需求
      - 既要兼容又要适配新需求的场景
      - 生活案例：充电转化器
      - code style

        ```js
        function ajax(config) {
        const adapter= getAdapter();
        return adapter(config)
        }
        // browser
        function xhr(config) {}
        // node
        function http(config) {}
        // 适配browser / node
        function getAdapter(config) {
           let adapter;
           if(type process !== undefined){
              return http
           }else{
              return xhr
           }
        }
        ```

      - 对比
        - 代理模式 VS 适配器模式 适配器提供不同接口，代理模式提供一模一样的接口
        - 代理模式 VS 装饰器模式 装饰器模式原来的功能不变还可以使用，代理模式改变原来的功能

  - 行为
    - 观察者
    - 策略模式
    - 职责链
    - 迭代器
    - 状态模式
