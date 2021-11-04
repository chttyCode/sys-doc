# toolkit

- Redux Toolkit 解决的问题
  配置 Redux store 过于复杂
  添加很多软件包才能开始使用 Redux 做事情
  Redux 有太多样板代码

- configureStore

  - 封装了 createStore 功能
  - 提供简化的配置选项、默认包 redux-thunk，并启用 Redux DevTools 扩展
  - 自动组合切片 slice 的 reducer

    ```js
    function configureStore(options = {}) {
      let { reducer, middleware, preloadedState } = options;
      let rootReducer;
      if (typeof reducer === 'function') {
        rootReducer = reducer;
      } else if (isPlainObject(reducer)) {
        rootReducer = combineReducers(reducer);
      }
      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || applyMiddleware; //
      return createStore(rootReducer, preloadedState, composeEnhancers(enhancer));
    }
    export default configureStore;
    ```

    - 使用

      ```js
      const store = configureStore({
        reducer: counter,
        middleware: [thunk, logger],
      });
      ```

- createAction

  - createAction 接受一个 action 类型字符串作为参数，并返回一个使用该类型字符串的 action creator 函数

    ```js
    function createAction(type, prepareAction) {
      function actionCreator(...args) {
        if (prepareAction) {
          var prepared = prepareAction.apply(null, args);
          return {
            type: type,
            payload: prepared.payload,
            error: prepared.error,
          };
        }
        return {
          type: type,
          payload: args[0],
        };
      }
      actionCreator.type = type;
      return actionCreator;
    }
    ```

    - 使用

    ```js
    const add = createAction('ADD');
    const minus = createAction('MINUS', (amount) => ({ payload: amount }));
    function counter(state = { number: 0 }, action) {
      switch (action.type) {
        case add.type:
          return { number: state.number + 1 };
        case minus.type:
          return { number: state.number - action.payload };
        default:
          return state;
      }
    }
    const store = configureStore({
      reducer: counter,
      middleware: [thunk, logger],
    });
    ```

    - vs old，不再定义单独的 type 类型，createAction 入参即为类型

    ```js
    const ADD = 'ADD';
    const MINUS = 'MINUS';

    function add() {
      return { type: ADD };
    }

    function minus() {
      return { type: MINUS };
    }
    function counter(state = { number: 0 }, action) {
      switch (action.type) {
        case ADD:
          return { number: state.number + 1 };
        case MINUS:
          return { number: state.number - 1 };
        default:
          return state;
      }
    }
    let store = createStore(counter);
    ```

- createReducer

  ```js
  const add = createAction('ADD');
  const minus = createAction('MINUS', (amount) => ({ payload: amount }));
  const counter = createReducer(
    { number: 0 },
    {
      [add]: (state) => ({ number: state.number + 1 }),
      [minus]: (state) => ({ number: state.number - 1 }),
    }
  );
  ```

  - vs old,不在使用 switch case 模式定义

  ```js
  function counter(state = { number: 0 }, action) {
    switch (action.type) {
      case add.type:
        return { number: state.number + 1 };
      case minus.type:
        return { number: state.number - action.payload };
      default:
        return state;
    }
  }
  ```

  - 实现,还是返回 reducer 函数

    ```js
    function createReducer(initialState, reducers = {}) {
      return function (state = initialState, action) {
        let reducer = reducers[action.type];
        if (reducer) return reducer(state, action);
        return state;
      };
    }
    export default createReducer;
    ```

- createSlice

  - 创建分片

    ```js
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
    ```

    - createSlice

    ```js
    import { createReducer, createAction } from './';
    function createSlice(options) {
      let { name, initialState = {}, reducers = {} } = options;
      let actions = {};
      const prefixReducers = {};
      Object.keys(reducers).forEach(function (key) {
        var type = getType(name, key);
        actions[key] = createAction(type);
        prefixReducers[type] = reducers[key];
      });
      let reducer = createReducer(initialState, prefixReducers);
      return {
        name,
        reducer,
        actions,
      };
    }
    function getType(slice, actionKey) {
      return slice + '/' + actionKey;
    }
    ```

