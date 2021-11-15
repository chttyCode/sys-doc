# context

- context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性
- context hooks

  ```js
  import React, { useState, createContext, useContext } from "react";
  import ReactDOM from "react-dom";
  const TodosContext = createContext();

  export default function App() {
    const [todoList, setTodoList] = useState([]);
    function addTodo(text) {
      setTodoList([...todoList, text]);
    }
    return (
      <TodosContext.Provider value={{ todoList, addTodo }}>
        <TodoApp />
      </TodosContext.Provider>
    );
  }

  function TodoApp() {
    const { todoList, addTodo } = useContext(TodosContext);
    const [text, setText] = useState("");
    return (
      <div>
        <button
          onClick={() => {
            addTodo(text);
            setText("");
          }}
        >
          增加
        </button>
        <input value={text} onChange={(event) => setText(event.target.value)} />
        <ul>
          {todoList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
  ReactDOM.render(<App />, document.getElementById("root"));
  ```

- function context
- class context
