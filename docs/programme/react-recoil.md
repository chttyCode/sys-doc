# recoil

- recoil]解决 React 全局数据流管理的问题，采用分散管理原子状态的设计模式，支持派生数据。
  - vs redux
    - 21 年 5 月份开源，目前仅提供 hooksAPi
    - Recoil 采用 atom 以分散方式定义数据
    - 其中 key 必须在 RecoilRoot 作用域内唯一，也可以认为是 state 树打平时 key 必须唯一的要求
- eg:

  ```js
  import React, { useState } from "react";
  import { RecoilRoot, atom, useRecoilState } from "./recoil";
  import ReactDOM from "react-dom";
  const todoListState = atom({
    key: "todoList",
    default: [],
  });

  function TodoApp() {
    //Recoil 采用 Hooks 方式读取数据
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const [input, setInput] = useState("");
    function addTodo() {
      setTodoList([...todoList, input]);
      setInput("");
    }
    return (
      <div>
        <button onClick={addTodo}>添加</button>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <ul>
          {todoList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
  ReactDOM.render(
    <RecoilRoot>
      <TodoApp />
    </RecoilRoot>,
    document.getElementById("root")
  );
  ```
