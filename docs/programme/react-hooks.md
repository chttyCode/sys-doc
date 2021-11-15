# hooks

- react hooks

  - useState

    - 通过在函数组件里调用它来给组件添加一些内部 state,React 会在重复渲染时保留这个 state
    - eg:

      ```js
      import React from "./react";
      import ReactDOM from "./react-dom";

      function App() {
        const [number, setNumber] = React.useState(0);
        let handleClick = () => setNumber(number + 1);
        return (
          <div>
            <p>{number}</p>
            <button onClick={handleClick}>+</button>
          </div>
        );
      }

      ReactDOM.render(<App />, document.getElementById("root"));
      ```

      ```js
      let hookStates = [];
      let hookIndex = 0;
      let scheduleUpdate;
      function render(vDom, container) {
        mount(vDom, container);
        scheduleUpdate = () => {
          hookIndex = 0;
          compareTwoVDom(container, vDom, vDom);
        };
      }
      export function useState(initialState) {
        hookStates[hookIndex] = hookStates[hookIndex] || initialState;
        let currentIndex = hookIndex;
        function setState(newState) {
          if (typeof newState === "function")
            newState = newState(hookStates[currentIndex]);
          hookStates[currentIndex] = newState;
          scheduleUpdate();
        }
        return [hookStates[hookIndex++], setState];
      }
      ```

  - useCallback & useMemo

    - 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新
    - 把创建函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算
    - eg:

      ```js
      import React from "react";
      import ReactDOM from "react-dom";
      let Child = ({ data, handleClick }) => {
        console.log("Child render");
        return <button onClick={handleClick}>{data.number}</button>;
      };
      Child = React.memo(Child);

      function App() {
        console.log("App render");
        const [name, setName] = React.useState("zhufeng");
        const [number, setNumber] = React.useState(0);
        let data = React.useMemo(() => ({ number }), [number]);
        let handleClick = React.useCallback(() => setNumber(number + 1), [
          number,
        ]);
        return (
          <div>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Child data={data} handleClick={handleClick} />
          </div>
        );
      }

      ReactDOM.render(<App />, document.getElementById("root"));
      ```

      ```js
      export function useCallback(callback, deps) {
        if (hookStates[hookIndex]) {
          let [lastCallback, lastDeps] = hookStates[hookIndex];
          let same = deps.every((item, index) => item === lastDeps[index]);
          if (same) {
            hookIndex++;
            return lastCallback;
          } else {
            hookStates[hookIndex++] = [callback, deps];
            return callback;
          }
        } else {
          hookStates[hookIndex++] = [callback, deps];
          return callback;
        }
      }
      export function useMemo(factory, deps) {
        if (hookStates[hookIndex]) {
          let [lastMemo, lastDeps] = hookStates[hookIndex];
          let same = deps.every((item, index) => item === lastDeps[index]);
          if (same) {
            hookIndex++;
            return lastMemo;
          } else {
            let newMemo = factory();
            hookStates[hookIndex++] = [newMemo, deps];
            return newMemo;
          }
        } else {
          let newMemo = factory();
          hookStates[hookIndex++] = [newMemo, deps];
          return newMemo;
        }
      }
      ```

  - useReducer

    - useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法
    - 使用场景不同 useReducer 使用于多值，useState 适用于单值
    - eg:

      ```js
      import React from "./react";
      import ReactDOM from "./react-dom";
      function reducer(state = { number: 0 }, action) {
        switch (action.type) {
          case "ADD":
            return { number: state.number + 1 };
          case "MINUS":
            return { number: state.number - 1 };
          default:
            return state;
        }
      }

      function Counter() {
        const [state, dispatch] = React.useReducer(reducer, { number: 0 });
        return (
          <div>
            Count: {state.number}
            <button onClick={() => dispatch({ type: "ADD" })}>+</button>
            <button onClick={() => dispatch({ type: "MINUS" })}>-</button>
          </div>
        );
      }
      ReactDOM.render(<Counter />, document.getElementById("root"));
      ```

      ```js
      export function useReducer(reducer, initialState) {
        hookStates[hookIndex] = hookStates[hookIndex] || initialState;
        let currentIndex = hookIndex;
        function dispatch(action) {
          hookStates[currentIndex] = reducer
            ? reducer(hookStates[currentIndex], action)
            : action;
          scheduleUpdate();
        }
        return [hookStates[hookIndex++], dispatch];
      }
      ```

  - useContext
  - useEffect
  - useLayoutEffect+useRef
  - forwardRef
  - useImperativeHandle

- redux hooks
- 自定义 hooks

  - 优点
    - 可以抽离公共方法和逻辑，提高代码的可复用性
    - 函数式组件更简洁，开发效率更高
    - 自定义 Hook 是一个函数，其名称以 use 开头，函数内部可以调用其他的 Hook
  - eg:

    ```js
    import { useState, useEffect } from "react";
    function useRequest(url) {
      let [options, setOptions] = useState({
        currentPage: 1,
        pageSize: 5,
      });
      let [data, setData] = useState({
        totalPage: 0,
        list: [],
      });
      function getData() {
        let { currentPage, pageSize } = options;
        fetch(`${url}?currentPage=${currentPage}&pageSize=${pageSize}`)
          .then((response) => response.json())
          .then((result) => {
            setData({ ...result });
          });
      }
      useEffect(getData, [options, url]);
      return [data, options, setOptions];
    }

    export default useRequest;
    ```
