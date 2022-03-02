> 定一个基调，即探索一个清晰的 React 项目开发范式

- 目前项目的业务代码，主要的痛点

  - redux 概念比较多
  - action type 模板定义冗余
  - 组件状态耦合
  - redux 的 connect 增加组件嵌套

- 希望达到的效果
  - 调高组件的可读性、可维护性
  - 使用自定义 hooks 提取可复用逻辑

## 方案对比

- context vs redux 方案对比

| Context API                                                 | Redux                                          |
| ----------------------------------------------------------- | ---------------------------------------------- |
| React 附带的内置工具                                        | 需要额外安装，增加最终包的大小                 |
| 需要最少的设置                                              | 需要大量设置才能将其与 React 应用程序集成      |
| 适用不经常刷新或更新的静态数据而设计                        | 可以处理静态&动态数据                          |
| 添加新上下文需要从头开始创建                                | 易于添加新数据/操作，因此易于扩展              |
| 即使使用开发工具，在高度嵌套的 React 组件结构中调试也很困难 | Redux 开发工具，可简化调试                     |
| UI 逻辑和状态管理逻辑在同一个组件中                         | 使用单独的 UI 逻辑和状态管理逻辑更好的代码组织 |

- context

  - 方案 1

    - 采用顶层注入服务的方式提供共享数据、IOC 操作
    - 采用 DDD 设计思想、按领域切分组件、采用自定义 hook 的方式进行封装提供服务
    - 有点
      - 结构目录划分清晰
      - 提供完备的类型推断
      - 减少组件嵌套层次
    - 缺点
      - 顶层数据改变会造成全组件更新
      - 如果该服务在整个应用中是单例的，则需将该服务注册在顶层服务，因此该服务并不能达到理想的状态，哪里需要就在哪里调用
      - IOC 操作数据流需要借助 props,在已使用 context 的情况下依然无法使用 useContext 直接获取 value
    - 总上所述该方案适用于静态数据页面

  - 方案 2

    - 采用 reduce 的方式在顶层共享数据、接受 action 操作
    - 方案类似 redux 思想，建立中心仓库，但是又没有 redux 成熟的 api、性能优化

- redux

  - 针对已存在的模板代码冗余
    - 封装 createSlice、对 reduce 提供 Immutable data 操作
  - 针对组件嵌套、性能优化
    - 使用 react-redux 提供的 useSelector、useDispatch
  - 采用 DDD 设计思想、按领域切分组件提供 reduce
  - 优化

    - 封装 action type 冗余的代码的定义
    - 提供 immer 操作不可变数据

    ```js
      function createReducer<T, R extends { [k in keyof R]: R[k] }>(
        initialState: T,
        reducers: R
      ): (state: T, action: actionType<keyof R, R>) => T {
        return function (state = initialState, action): T {
          const reducer = reducers[action.type];
          if (reducer) {
            return produce(state, (draft) => {
              reducer(draft, action);
            });
          }
          return state;
        };
      }
      export default createReducer;

    ```

    ```js
    export function createAction<P>(type: string) {
      function actionCreator(payload: P) {
        return {
          type,
          payload,
        };
      }
      actionCreator.type = type;
      return actionCreator;
    }
    ```

    ```js
      export type actionType<K extends keyof R, R> = {
        type: K;
        payload?: R[K] extends (...args: infer P) => any ? P : any;
      };

      export type ActionsType<S, A> = {
        [k in keyof A]: (
          payload: A[k] extends (
            state: S,
            action: { type: string; payload: infer P }
          ) => any
            ? P
            : any
        ) => actionType<keyof A, A>;
      };
    ```

    ```js

      function createSlice<T, R>(options: {
        name: string;
        initialState: T;
        reducers: R;
        }): {
        name: string;
        reducer: (state: T, action: actionType<keyof R, R>) => T;
        actions: ActionsType<T, R>;
      } {
        const { name, initialState, reducers } = options;
        const actions = {} as ActionsType<T, R>;
        const prefixReducers: R = {} as R;
        Object.keys(reducers).forEach((key) => {
          const type = `${name}/${key}`;
          actions[key] = createAction(type);
          prefixReducers[type] = reducers[key];
        });
        const reducer = createReducer<T, R>(initialState, prefixReducers);
        return {
          name,
          reducer,
          actions,
        };
      }
      export default createSlice;
    ```

> 有兴趣可以了解一下 [recoil](https://recoiljs.org/)官方出品

## 推荐范式

> 开发范式推荐 MVC 模式、视图归视图、逻辑归逻辑

- 目录定义、采用集中定义满足
  - 轻松定位代码(Locate)
  - 一眼识别代码(Identify)
  - 层次不要太多(Flattest)
  - 无重复冗余(Try)
- redux
  - 可以在根据业务创建领域 reducer、集中业务处理逻辑
  - 分离视图逻辑
- context
  - 共享跨层级低刷新频率的状态
- hooks
  - 公共组件、复杂逻辑自定 hooks
- 推荐函数式取代 class
  - 避免 this
  - 逻辑逻辑清晰、聚合
    > 代码重用：在 hooks 出来之前，常见的代码重用方式是 HOC 和 render props，这两种方式带来的问题是：你需要解构自己的组件，同时会带来很深的组件嵌套
    > 复杂的组件逻辑：在 class 组件中，有许多的 lifecycle 函数，你需要在各个函数的里面去做对应的事情。这种方式带来的痛点是：逻辑分散在各处，开发者去维护这些代码会分散自己的精力，理解代码逻辑也很吃力

## 参考文档

- [Hooks](https://chttycode.github.io/sys-doc/programme/react-hooks.html)
- [Context](https://chttycode.github.io/sys-doc/programme/react-context.html)
- [Recoil](https://chttycode.github.io/sys-doc/programme/react-recoil.html)
- [Redux](https://chttycode.github.io/sys-doc/programme/react-statue.html)
