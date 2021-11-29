# react 编程范式

## 状态管理方式

- redux

  ```js
  import React from 'react';
  import { createStore } from 'redux';
  import { useSelector, useDispatch } from 'react-redux';
  const INCREMENT = 'ADD';
  const DECREMENT = 'MINUS';
  const reducer = (state = initState, action) => {
    switch (action.type) {
      case INCREMENT:
        return { number: state.number + 1 };
      case DECREMENT:
        return { number: state.number - 1 };
      default:
        return state;
    }
  };
  let initState = { number: 0 };
  const store = createStore(reducer, initState);
  function App() {
    return (
      <Provider store={store}>
        <Counter />
        <Num />
      </Provider>
    );
  }
  function Num() {
    const num = useSelector((state) => state.number);
    return <p>{num}</p>;
  }

  function Counter() {
    const dispatch = useDispatch();
    return (
      <div>
        <button onClick={() => dispatch({ type: INCREMENT })}></button>
        <button onClick={() => dispatch({ type: DECREMENT })}>-</button>
      </div>
    );
  }
  ```

- toolkit

  ```js
  <!-- 定义 -->
  const counterSlice = createSlice({
    name: 'counter',
    initialState: { number: 0 },
    reducers: {
      add: (state) => ({ number: state.number + 1 }), //派发的时候动作类型是 counter/add
      minus: (state, action) => ({ number: state.number - action.payload }),
    },
  });
  const { actions, reducer } = counterSlice;
  const { add, minus } = actions;

  const store = configureStore({
    reducer: reducer,
    middleware: [thunk, logger],
  });

  class Counter extends Component {
    unsubscribe;
    constructor(props) {
      super(props);
      this.state = { number: 0 };
    }

    render() {
      const { number, add, minus } = this.props
      return(
        <div>
          <p>{number}</p>
          <button onClick={add}></button>
          <button onClick={minus}>-</button>
        </div>
      );
    }
  }
  export default connect(() => state, { add, minus })(Counter);
  ```

  - 优势
    - 简化配置
    - 自带 immer，Redux-Thunk 和 Reselect 配置

- recoil

  ```js
  import React from 'react';
  import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
  const counterState = atom({
    key: 'counter', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
  });

  function Counter() {
    const [num, setNum] = useRecoilState(counterState);

    const add = (event) => {
      setText(num + 1);
    };
    const minus = (event) => {
      setText(num - 1);
    };

    return (
      <div>
        <button onClick={add}></button>
        <button onClick={minus}>-</button>
      </div>
    );
  }

  const charCountState = selector({
    key: 'charCountState', // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
      const num = get(counterState);

      return num;
    },
  });

  function Num() {
    const num = useRecoilValue(charCountState);

    return <> {num}</>;
  }

  function CharacterCounter() {
    return (
      <>
        <Counter />
        <Num />
      </>
    );
  }

  function App() {
    return (
      <RecoilRoot>
        <CharacterCounter />
      </RecoilRoot>
    );
  }
  ```

  - 单独订阅、状态提升只影响订阅、不影响整个组件数

- context

  ```js
  const contextCounter = React.createContext();
  function App() {
    const [num, setNum] = useState(0);
    return (
      <contextCounter.Provider store={{ num, setNum }}>
        <Counter />
        <Num />
      </contextCounter.Provider>
    );
  }
  function Num() {
    const { num } = useContext(contextCounter);
    return <p>{{ num }}</p>;
  }

  function Counter() {
    const { num, setNum } = useContext(contextCounter);
    return (
      <div>
        <button onClick={() => setNum(num + 1)}></button>
        <button onClick={() => setNum(num - 1)}>-</button>
      </div>
    );
  }
  ```

## 方案对比

- 目的
  - 实现代码可维护可扩展
- 目录结构即程序结构满足 LIFT 准则
  - 轻松定位代码(Locate)
  - 一眼识别代码(Identify)
  - 层次不要太多(Flattest)
  - 无重复冗余(Try)
- 管理方案对比，toolkit、recoil 都属于暂不可用，不做对比

| Context API                                                 | Redux                                             |
| ----------------------------------------------------------- | ------------------------------------------------- |
| React 附带的内置工具                                        | 需要额外安装，增加最终包的大小                    |
| 需要最少的设置                                              | 需要大量设置才能将其与 React 应用程序集成         |
| 专为不经常刷新或更新的静态数据而设计                        | 可以处理静态&动态数据                             |
| 添加新上下文需要从头开始创建                                | 由于在初始设置后易于添加新数据/操作，因此易于扩展 |
| 即使使用开发工具，在高度嵌套的 React 组件结构中调试也很困难 | Redux 开发工具，可简化调试                        |
| UI 逻辑和状态管理逻辑在同一个组件中                         | 使用单独的 UI 逻辑和状态管理逻辑更好的代码组织    |

- redux
  - 可以在根据业务创建领域 reducer、集中业务处理逻辑
  - 可以封装一些轮子简化 redux 定义
- context + hooks
  - 共享跨层级低刷新频率的状态
  - react 对 context 的刷新没有优化
- 编程方式
  - 推荐函数式
    > 代码重用：在 hooks 出来之前，常见的代码重用方式是 HOC 和 render props，这两种方式带来的问题是：你需要解构自己的组件，同时会带来很深的组件嵌套
    > 复杂的组件逻辑：在 class 组件中，有许多的 lifecycle 函数，你需要在各个函数的里面去做对应的事情。这种方式带来的痛点是：逻辑分散在各处，开发者去维护这些代码会分散自己的精力，理解代码逻辑也很吃力
  - 自定义 hooks 处理逻辑复用
- 目前看比较理想的是 recoil,recoil 依然是处在试验阶段

## 参考文档

- [toolkit](https://redux-toolkit.js.org/)
- [recoilJs](https://recoiljs.org/)
- [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
- [前端架构之 React 领域驱动设计](https://mp.weixin.qq.com/s?__biz=MzIyNDU2NTc5Mw==&mid=2247497927&idx=1&sn=d55f61d2246a97c0ef3a7a6137f793e1&chksm=e80fb789df783e9f02e29dae87f887ea1a8853577cd16bf37879410aa6da9799a24f3baf510b&scene=132#wechat_redirect)
