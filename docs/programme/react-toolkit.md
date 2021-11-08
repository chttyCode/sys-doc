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
      - 就是创建分片、返回 reducer、action

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

- immer 优化
  - 就是不可变数据集
  - 使用优化
    ```js
    const counterSlice = createSlice({
      name: 'counter',
      initialState: { number: 0 },
      reducers: {
        add: (state) => (state.number += 1), //派发的时候动作类型是 counter/add
        minus: (state, action) => (state.number -= action.payload),
      },
    });
    ```
  - createReducer 优化
    ```js
    import produce from 'immer';
    function createReducer(initialState, reducers = {}) {
      return function (state = initialState, action) {
        let reducer = reducers[action.type];
        if (reducer)
          return produce(state, (draft) => {
            reducer(draft, action);
          });
        return state;
      };
    }
    export default createReducer;
    ```
    - 封装优化对使用无感知
- reselect 优化可以缓存运算结果，提升性能
  - createSelector
    - 用于复杂数据计算的缓存;数据为发生变化,不会重复计算,直接返回值.浅比较
  - createDraftSafeSelector
    - 值比较
- createAsyncThunk

  - 使用

    ```js
    export const getTodosList = createAsyncThunk(
      'todos/list',
      async () => await axios.get(`http://localhost:8080/todos/list`)
    );

    const initialState = {
      todos: [],
      loading: false,
      error: null,
    };

    const todoSlice = createSlice({
      name: 'todo',
      initialState,
      reducers: {},
      extraReducers: {
        [getTodosList.pending]: (state) => {
          state.loading = true;
        },
        [getTodosList.fulfilled]: (state, action) => {
          state.todos = action.payload.data;
          state.loading = false;
        },
        [getTodosList.rejected]: (state, action) => {
          state.todos = [];
          state.error = action.error.message;
          state.loading = false;
        },
      },
    });
    ```

    - 实现

    ```js
    function isPlainObject(value) {
      if (typeof value !== 'object' || value === null) return false;
      return Object.getPrototypeOf(value) === Object.prototype;
    }
    function configureStore(options = {}) {
      let { reducer, middleware = [thunk], preloadedState } = options;
      let rootReducer;
      if (typeof reducer === 'function') {
        rootReducer = reducer;
      } else if (isPlainObject(reducer)) {
        rootReducer = combineReducers(reducer);
      }
      const enhancer = applyMiddleware(...middleware);
      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      return createStore(rootReducer, preloadedState, composeEnhancers(enhancer));
    }
    ```

    ```js
    import produce from 'immer';
    function createReducer(initialState, reducers = {}, extraReducers = {}) {
      return function (state = initialState, action) {
        let reducer = reducers[action.type];
        if (reducer)
          return produce(state, (draft) => {
            reducer(draft, action);
          });
        let extraReducer = extraReducers[action.type];
        if (extraReducer) {
          return produce(state, (draft) => {
            extraReducer(draft, action);
          });
        }
        return state;
      };
    }
    ```

    ```js
    import { createReducer, createAction } from './';
    function createSlice(options) {
      let { name, initialState = {}, reducers = {}, extraReducers = {} } = options;
      let actions = {};
      const prefixReducers = {};
      Object.keys(reducers).forEach(function (key) {
        var type = getType(name, key);
        actions[key] = createAction(type);
        prefixReducers[type] = reducers[key];
      });
      let reducer = createReducer(initialState, prefixReducers, extraReducers);
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

    ```js
    import { createAction } from './';
    function createAsyncThunk(typePrefix, payloadCreator) {
      let pending = createAction(typePrefix + '/pending', function () {
        return { payload: void 0 };
      });
      let fulfilled = createAction(typePrefix + '/fulfilled', function (payload) {
        return { payload };
      });
      let rejected = createAction(typePrefix + '/rejected', function (error) {
        return { error };
      });

      function actionCreator(arg) {
        return function (dispatch) {
          dispatch(pending());
          const promise = payloadCreator(arg);
          let abort;
          const abortedPromise = new Promise((_, reject) => {
            abort = () => {
              reject({ name: 'AbortError', message: 'Aborted' });
            };
          });
          Promise.race([promise, abortedPromise]).then(
            (result) => {
              return dispatch(fulfilled(result));
            },
            (error) => {
              return dispatch(rejected(error));
            }
          );
          return Object.assign(promise, { abort });
        };
      }
      return Object.assign(actionCreator, { pending, rejected, fulfilled });
    }
    ```

- createApi
  ```js
  import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
  const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints: (builder) => {
      return {
        getTodos: builder.query({ query: (id) => `/todos/detail/${id}` }),
      };
    },
  });
  export default todosApi;
  ```
  ```js
  import { configureStore } from '@reduxjs/toolkit';
  import todosApi from './todos';
  const store = configureStore({
    reducer: {
      [todosApi.reducerPath]: todosApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware),
  });
  export default store;
  ```
  ```js
  import todosApi from './todos';
  function App() {
    const { data, error, isLoading } = todosApi.endpoints.getTodos.useQuery(1);
    console.log('isLoading=', isLoading, 'error=', error, 'data=', data);
    if (isLoading) {
      return <div>加载中....</div>;
    } else {
      if (error) {
        return <div>{error.error}</div>;
      } else if (data) {
        return <div>{data.text}</div>;
      } else {
        return null;
      }
    }
  }
  export default App;
  ```
  - createApi
    ```js
    function createApi({ reducerPath, baseQuery, endpoints }) {
      let builder = {
        query(options) {
          function useQuery(id) {
            const { store } = useContext(ReactReduxContext);
            const [, forceUpdate] = useReducer((x) => x + 1, 0);
            useEffect(() => {
              let url = options.query(id);
              store.dispatch({ type: FETCH_DATA, payload: { url } });
              return store.subscribe(forceUpdate);
            }, [id, store]);
            let state = store.getState();
            return state ? state[reducerPath] : {};
          }
          return { useQuery };
        },
      };
      let slice = createSlice({
        name: reducerPath,
        initialState: { data: null, error: null, isLoading: false },
        reducers: {
          setValue(state, { payload = {} }) {
            for (let key in payload) state[key] = payload[key];
          },
        },
      });
      const { actions, reducer } = slice;
      let api = {
        reducerPath,
        endpoints: endpoints(builder),
        reducer,
        middleware: function ({ dispatch }) {
          return function (next) {
            return function (action) {
              if (action.type === FETCH_DATA) {
                let { url } = action.payload;
                (async function () {
                  try {
                    dispatch(actions.setValue({ isLoading: true }));
                    let data = await baseQuery(url);
                    dispatch(actions.setValue({ data, isLoading: false }));
                  } catch (error) {
                    console.log(error);
                    console.log(typeof error);
                    dispatch(actions.setValue({ error: { error: error.toString() }, isLoading: false }));
                  }
                })();
              } else {
                next(action);
              }
            };
          };
        },
      };
      return api;
    }
    ```
