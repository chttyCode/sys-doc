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

    - 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值
    - 当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定
    - useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>
    - useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context
    - eg:

      ```js
      import React from "./react";
      import ReactDOM from "./react-dom";

      const CounterContext = React.createContext();

      function reducer(state, action) {
        switch (action.type) {
          case "add":
            return { number: state.number + 1 };
          case "minus":
            return { number: state.number - 1 };
          default:
            return state;
        }
      }
      function Counter() {
        let { state, dispatch } = React.useContext(CounterContext);
        return (
          <div>
            <p>{state.number}</p>
            <button onClick={() => dispatch({ type: "add" })}>+</button>
            <button onClick={() => dispatch({ type: "minus" })}>-</button>
          </div>
        );
      }
      function App() {
        const [state, dispatch] = React.useReducer(reducer, { number: 0 });
        return (
          <CounterContext.Provider value={{ state, dispatch }}>
            <Counter />
          </CounterContext.Provider>
        );
      }
      ```

      ```js
      function useContext(context) {
        return context._currentValue;
      }
      ```

  - useEffect
    - 给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API
    - eg:
      ```js
      import React from "./react";
      import ReactDOM from "./react-dom";
      function Counter() {
        const [number, setNumber] = React.useState(0);
        React.useEffect(() => {
          console.log("开启一个新的定时器");
          const $timer = setInterval(() => {
            setNumber((number) => number + 1);
          }, 1000);
          return () => {
            console.log("销毁老的定时器");
            clearInterval($timer);
          };
        });
        return <p>{number}</p>;
      }
      ```
      ```js
      export function useEffect(callback, dependencies) {
        let currentIndex = hookIndex;
        if (hookStates[hookIndex]) {
          let [destroy, lastDeps] = hookStates[hookIndex];
          let same =
            dependencies &&
            dependencies.every((item, index) => item === lastDeps[index]);
          if (same) {
            hookIndex++;
          } else {
            destroy && destroy();
            setTimeout(() => {
              hookStates[currentIndex] = [callback(), dependencies];
            });
            hookIndex++;
          }
        } else {
          setTimeout(() => {
            hookStates[currentIndex] = [callback(), dependencies];
          });
          hookIndex++;
        }
      }
      ```
  - useLayoutEffect+useRef

    - useEffect 不会阻塞浏览器渲染，而 useLayoutEffect 会浏览器渲染
    - eg:

      ```js
      const Animate = () => {
        const ref = React.useRef();
        React.useLayoutEffect(() => {
          ref.current.style.transform = `translate(500px)`; //TODO
          ref.current.style.transition = `all 500ms`;
        });
        let style = {
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "red",
        };
        return <div style={style} ref={ref}></div>;
      };
      ```

  - forwardRef
    - forwardRef 将 ref 从父组件中转发到子组件中的 dom 元素上,子组件接受 props 和 ref 作为参数
  - useImperativeHandle
    - useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值
    - eg:
      ```js
      function Child(props, ref) {
        const inputRef = React.useRef();
        React.useImperativeHandle(ref, () => ({
          focus() {
            inputRef.current.focus();
          },
        }));
        return <input type="text" ref={inputRef} />;
      }
      const ForwardChild = React.forwardRef(Child);
      function Parent() {
        let [number, setNumber] = React.useState(0);
        const inputRef = React.useRef();
        function getFocus() {
          console.log(inputRef.current);
          inputRef.current.value = "focus";
          inputRef.current.focus();
        }
        return (
          <div>
            <ForwardChild ref={inputRef} />
            <button onClick={getFocus}>获得焦点</button>
            <p>{number}</p>
            <button
              onClick={() => {
                debugger;
                setNumber(number + 1);
              }}
            >
              +
            </button>
          </div>
        );
      }
      ```

- redux hooks

  - useSelector

    - 它在 class 组件中的 connect 类似，都会订阅 store

    - eg:

      ```js
      import React from "react";
      import { useSelector } from "react-redux";

      export const CounterComponent = () => {
        const counter = useSelector((state) => state.counter);
        return <div>{counter}</div>;
      };
      ```

      - 实现见 redux

  - useDispatch

    - eg:

      ```js
      import React from "react";
      import { useDispatch } from "react-redux";

      export const CounterComponent = ({ value }) => {
        const dispatch = useDispatch();

        return (
          <div>
            <span>{value}</span>
            <button onClick={() => dispatch({ type: "increment-counter" })}>
              Increment counter
            </button>
          </div>
        );
      };
      ```

      - 实现见 redux

- react-router-dom hooks

  - useParams

    - eg:

      ```js
      import React from "react";
      import ReactDOM from "react-dom";
      import {
        BrowserRouter as Router,
        Route,
        Switch,
        useParams,
      } from "react-router-dom";

      function Post() {
        let { title } = useParams();
        return <div>{title}</div>;
      }

      ReactDOM.render(
        <Router>
          <div>
            <Switch>
              <Route path="/post/:title">
                <Post />
              </Route>
            </Switch>
          </div>
        </Router>,
        document.getElementById("root")
      );
      ```

  - useLocation

    - eg:

      ```js
      import React from "react";
      import ReactDOM from "react-dom";
      import {
        BrowserRouter as Router,
        Route,
        Switch,
        useParams,
        useLocation,
      } from "react-router-dom";

      function Post() {
        let { title } = useParams();
        const location = useLocation();
        return (
          <div>
            {title}
            <hr />
            {JSON.stringify(location)}
          </div>
        );
      }

      ReactDOM.render(
        <Router>
          <div>
            <Switch>
              <Route path="/post/:title">
                <Post />
              </Route>
            </Switch>
          </div>
        </Router>,
        document.getElementById("root")
      );
      ```

  - useHistory

    - eg:

      ```js
      import React from "react";
      import ReactDOM from "react-dom";
      import {
        BrowserRouter as Router,
        Route,
        Switch,
        useHistory,
      } from "react-router-dom";

      function Post({ match, history }) {
        let { title } = match.params;
        return (
          <div>
            {title}
            <hr />
            <button type="button" onClick={() => history.goBack()}>
              回去
            </button>
          </div>
        );
      }
      function Home({ history }) {
        return (
          <>
            <button type="button" onClick={() => history.push("/post/hello")}>
              title
            </button>
          </>
        );
      }
      ReactDOM.render(
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/post/:title" component={Post} />
            </Switch>
          </div>
        </Router>,
        document.getElementById("root")
      );
      ```

  - useRouteMatch

    - eg:

      ```js
      import React from "react";
      import ReactDOM from "react-dom";
      import {
        BrowserRouter as Router,
        Route,
        useRouteMatch,
      } from "react-router-dom";
      function NotFound() {
        return <div>Not Found</div>;
      }
      function Post(props) {
        return <div>{props.match.params.title}</div>;
      }
      function App() {
        let match = useRouteMatch({
          path: "/post/:title",
          strict: true,
          sensitive: true,
        });
        console.log(match);
        return <div>{match ? <Post match={match} /> : <NotFound />}</div>;
      }

      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        document.getElementById("root")
      );
      ```

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
