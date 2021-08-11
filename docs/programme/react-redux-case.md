# Redux Toolkit

## 项目准备

- npx create-react-app case
- npm install redux redux-logger redux-thunk @reduxjs/toolkit express cors axios --save

## 简单案例

- 1. 创建 actionType

```js
// 1. 定义动作类型
const ADD = "ADD";
const MINUS = "MINUS";
```

- 2. 定义 actionCreator

```js
function add() {
  return { type: ADD };
}
function minus() {
  return { type: MINUS };
}
```

- 3. 定义 reducer

```js
function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    case ADD:
      return { number: state.number + 1 };
    case MINUS:
      return { number: state.number - 1 };
    default:
      return state;
  }
}
```

- 4. 创建 store

```js
const store = createStore(reducer);
```

- 5. 订阅

```js
const valElement = document.getElementById("root");
function render() {
  valElement.innerHTML = store.getState().number;
}
render();
store.subscribe(render);
```

- 6. 派发

```js
// 绑定事件，派发action
document.getElementById("add").addEventListener("click", () => {
  store.dispatch(add());
});
document.getElementById("minus").addEventListener("click", () => {
  store.dispatch(minus());
});
```

- 存在的问题
  - action creator 增加代码量
  - const ADD = 'ADD'冗余
  - switch 结构不清晰

## Redux Toolkit

> Redux Toolkit 是官方的，有观点的，开箱即用的高效 Redux 开发工具集

- configureStore

  > Redux 工具包有一个 configureStore() 函数，其中覆盖了 createStore() 的功能

  > configureStore() 函数 提供简化的配置选项。它可以自动组合切片 slice 的 reducer，添加你提供的任何 Redux 中间件，默认 情况下包含 redux-thunk，并启用 Redux DevTools 扩展

  - 创建 store,支持异步（thunk）

```js
// const store = createStore(reducer);

const store = configureStore({
  reducer,
  middleware: [thunk, logger],
});

document.getElementById("async-add").addEventListener("click", () => {
  store.dispatch((dispatch) => {
    setTimeout(() => {
      dispatch(add());
    }, 2000);
  });
});
```

- createAction
- createReducer
- createSlice
- immer
- reselect
- createAsyncThunk
- Redux Toolkit Query
- axios-basequery
