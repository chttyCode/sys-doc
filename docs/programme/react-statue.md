# redux

> Redux 是 JavaScript 应用的状态容器，提供可预测的状态管理

- 特点

  - 单向数据流，只读，改变通过 action 改变状态，action 是一个用于描述已发生事件的普通对象 使用纯函数来执行修改
  - Redux 除了和 React 一起用外，还支持其它界面库。它体小精悍（只有 2kB，包括依赖），却有很强大的插件扩展生态

- redux

  - 发布订阅

    ```js
    function createStore(reducer, initialState) {
      let state = initialState;
      let listeners = [];
      function getState() {
        return state;
      }
      function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach((l) => l());
        return action;
      }
      function subscribe(listener) {
        listeners.push(listener);
        return () => {
          listeners = listeners.filter((l) => l !== listener);
        };
      }
      <!-- 初始化state -->
      dispatch({ type: '@@REDUX/INIT' });
      return {
        getState,
        dispatch,
        subscribe,
      };
    }
    ```

    - 原生应用

    ```js
    import { createStore } from './redux';
    let counterValue = document.getElementById('counter-value');
    let incrementBtn = document.getElementById('add-btn');
    <!-- 定义action Type -->
    const INCREMENT = 'INCREMENT';
    const DECREMENT = 'DECREMENT';
    <!-- 初始化 -->
    let initState = { number: 0 };
    <!-- reducer -->
    const reducer = (state = initState, action) => {
      switch (action.type) {
        case INCREMENT:
          return { number: state.number  1 };
        case DECREMENT:
          return { number: state.number - 1 };
        default:
          return state;
      }
    };
    <!-- 创建仓库 -->
    let store = createStore(reducer);
    function render() {
      counterValue.innerHTML = store.getState().number  '';
    }
    <!-- 订阅 -->
    store.subscribe(render);
    render();
    incrementBtn.addEventListener('click', function () {
      <!-- 派发 action  -->
      store.dispatch({ type: INCREMENT });
    });
    ```

    - react 应用

    ```js
    import React, { Component } from 'react';
    import { createStore } from '../redux';
    <!-- 定义action Type -->
    const INCREMENT = 'ADD';
    const DECREMENT = 'MINUS';
    <!-- 定义reducer -->
    const reducer = (state = initState, action) => {
      switch (action.type) {
        case INCREMENT:
          return { number: state.number  1 };
        case DECREMENT:
          return { number: state.number - 1 };
        default:
          return state;
      }
    };
    <!-- 初始化 -->
    let initState = { number: 0 };
    <!-- 创建仓库 -->
    const store = createStore(reducer, initState);

    export default class Counter extends Component {
      unsubscribe;
      constructor(props) {
        super(props);
        this.state = { number: 0 };
      }
      componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState({ number: store.getState().number }));
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        return (
          <div>
            <p>{this.state.number}</p>
            <button onClick={() => store.dispatch({ type: 'ADD' })}></button>
            <button onClick={() => store.dispatch({ type: 'MINUS' })}>-</button>
            <button
              onClick={() => {
                setTimeout(() => {
                  store.dispatch({ type: 'ADD' });
                }, 1000);
              }}
            >
              1秒后加1
            </button>
          </div>
        );
      }
    }
    ```

    - 这是最原生的应该用，没有任何的封装，原滋原味，和原生的应用基本没差
    - 缺点

      - 手动绑定更新(react-redux)
      - 通过 store.dispatch 派发 action

        - 封装 bindActionCreators ，隐藏 store 调用

          ```js
          function bindActionCreator(actionCreator, dispatch) {
            return function (...args) {
              return dispatch(actionCreator.apply(this, args));
            };
          }

          export default function bindActionCreators(actionCreators, dispatch) {
            if (typeof actionCreators === 'function') {
              return bindActionCreator(actionCreators, dispatch);
            }
            const boundActionCreators = {};
            for (const key in actionCreators) {
              const actionCreator = actionCreators[key];
              if (typeof actionCreator === 'function') {
                boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
              }
            }
            return boundActionCreators;
          }
          ```

          - 使用,bindActionCreators 还是需要手动传入 dispatch

            ```js
            function add() {
              return { type: 'ADD' };
            }
            function minus() {
              return { type: 'MINUS' };
            }
            const actions = { add, minus };
            const boundActions = bindActionCreators(actions, store.dispatch);

            render() {
              return (
                <div>
                  <p>{this.state.number}</p>
                  <button onClick={boundActions.add}></button>
                  <button onClick={boundActions.minus}>-</button>
                  <button
                    onClick={() => {
                      setTimeout(() => {
                        boundActions.add();
                      }, 1000);
                    }}
                  >
                    1秒后加1
                  </button>
                </div>
              );
            }
            ```

            - 目前项目使用的方式多是在 connect 中

              ```js
                const mapDispatchToProps = (dispatch: any) => ({
                setRecommendTripPanelShow: bindActionCreators(
                  setRecommendTripPanelShow,
                  dispatch
                ),
              });

              export default connect<any, any, any>(
                mapStateToProps,
                mapDispatchToProps
              )(RecommendTicketItem);

              ```

            - 也可以集中定义 actions 文件

      - 多组件时，如何创建 reducer 的命名空间

        ```js
        <!-- reducer1-->
        export default function (state=initialState, action) {
            switch (action.type) {
                case types.ADD1:
                    return { number: state.number  1 };
                case types.MINUS1:
                    return { number: state.number - 1 };
                default:
                    return state;
            }
        }
        ```

        ```js
        <!-- reducer2 -->
        import * as types from '../action-types';

        let initialState = { number: 0 };

        export default function (state=initialState, action) {
            switch (action.type) {
                case types.ADD2:
                    return { number: state.number  1 };
                case types.MINUS2:
                    return { number: state.number - 1 };
                default:
                    return state;
            }
        }
        ```

        ```js
        <!-- 合并reducers -->
        import { combineReducers } from '../../redux';
        import counter1 from './counter1';
        import counter2 from './counter2';
        let rootReducer = combineReducers({
          counter1,
          counter2,
        });
        export default rootReducer;
        ```

        ```js
        <!-- 使用合并后的reducer,创建store -->
        import { createStore } from '../redux';
        import reducer from './reducers';
        const store = createStore(reducer, { counter1: { number: 0 }, counter2: { number: 0 } });
        export default store;
        ```

        ```js
        <!-- 合并reducer -->
        function combineReducers(reducers) {
          return function combination(state = {}, action) {
            let nextState = {};
            for (let key in reducers) {
              nextState[key] = reducers[key](state[key], action);
            }
            return nextState;
          };
        }
        export default combineReducers;
        ```

      - 每个组件都要订阅&解除订阅

        - react-redux 就为解决这个问题，主要是利用上下文 context,提供 2 个 Api

          - Provider 是利用 context 能力，提供一个 value 供子组件消费

            ```js
            import React from 'react';
            import ReactReduxContext from './ReactReduxContext';

            export default function (props) {
              return (
                <ReactReduxContext.Provider value={{ store: props.store }}>{props.children}</ReactReduxContext.Provider>
              );
            }
            ```

          - connect 是一个高阶组件，用于消费 Provider 提供的 value,将值作为 props,传递给子组件

            ```js
            function connect(mapStateToProps, mapDispatchToProps) {
              return function (OldComponent) {
                return class extends React.Component {
                  static contextType = ReactReduxContext;
                  constructor(props, context) {
                    super(props);
                    const { store } = context;
                    const { getState, subscribe, dispatch } = store;
                    this.state = mapStateToProps(getState());
                    this.unsubscribe = subscribe(() => {
                      this.setState(mapStateToProps(getState()));
                    });
                    let dispatchProps;
                    if (typeof mapDispatchToProps === 'function') {
                      dispatchProps = mapDispatchToProps(dispatch);
                    } else if (typeof mapDispatchToProps === 'object') {
                      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
                    } else {
                      dispatchProps = { dispatch };
                    }
                    this.dispatchProps = dispatchProps;
                  }
                  componentWillUnmount() {
                    this.unsubscribe();
                  }
                  render() {
                    return <OldComponent {...this.props} {...this.state} {...this.dispatchProps} />;
                  }
                };
              };
            }
            ```

      - hooks 中应用 redux

        ```js
        import React from 'react';
        import { useDispatch, useSelector } from 'react-redux';
        function Counter1() {
          let state = useSelector((state) => state.counter1); //状态映射函数 connect(mapStateToProps)
          let dispatch = useDispatch();
          return (
            <div>
              <p>{state.number}</p>
              <button onClick={() => dispatch({ type: 'ADD1' })}>+</button>
            </div>
          );
        }
        export default Counter1;
        ```

        ```js
          <!-- 封装actions -->
          import React from 'react';
          import actions from '../store/actions/counter2';
          import {useSelector,useBoundDispatch} from 'react-redux';
          function Counter3(){
              let {number} = useSelector((state)=>state.counter2);
              let boundActions = useBoundDispatch(actions);
              return (
                  <div>
                      <p>{number}</p>
                      <button onClick={boundActions.add2}>+</button>
                      <button onClick={boundActions.minus2}>-</button>
                  </div>
              )
          }
          export default Counter3;
        ```

        - useSelector

          - 负责订阅类似 connect

          ```js
          import { useContext, useLayoutEffect, useReducer, useRef } from 'react';
          import ReactReduxContext from '../ReactReduxContext';
          function useSelector(selector, equalityFn = shallowEqual) {
            const { store } = useContext(ReactReduxContext);
            let lastSelectedState = useRef(null);
            //获取仓库中的最新的状态
            let state = store.getState();
            let selectedState = selector(state);
            //每次计算完selectedState之后会判断状态变化了没有，如果变化 了，组件会刷新，如果没变化组件不刷新
            let [, forceUpdate] = useReducer((x) => x + 1, 0);
            useLayoutEffect(
              () =>
                store.subscribe(() => {
                  //比较老状态和新选中状态是否相等，如果相等，不刷新
                  let selectedState = selector(store.getState());
                  if (!_.isEqual(lastSelectedState.current, selectedState)) {
                    console.log('重新渲染');
                    forceUpdate();
                    lastSelectedState.current = selectedState;
                  }
                }),
              []
            );
            //如何获取 最新的状态值  定义useEffect,然后给lastSelectedState.current赋值，可以在任何地方通过lastSelectedState.current取到新的值
            return selectedState;
          }
          export default useSelector;
          ```

        - useDispatch

          - 返回 dispatch

          ```js
          import { useContext } from 'react';
          import ReactReduxContext from '../ReactReduxContext';

          const useDispatch = () => {
            const { store } = useContext(ReactReduxContext);
            return store.dispatch;
          };
          export default useDispatch;
          ```

        - useBoundDispatch

          - 用于封装 dispatch 调用

          ```js
          import React from 'react';
          import { bindActionCreators } from '../../redux';
          import ReactReduxContext from '../ReactReduxContext';

          function useBoundDispatch(actions) {
            const { store } = React.useContext(ReactReduxContext);
            let boundActions = bindActionCreators(actions, store.dispatch);
            return boundActions;
          }
          export default useBoundDispatch;
          ```
