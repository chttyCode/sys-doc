# React 简易实现

- 根据原生框架，体验框架的渲染流程

  - 目前版本 jsx 转化会自动插入
    ```js
    // automatic
    var _jsxRuntime = require("react/jsx-runtime");
    //vs classic
    _reactDom.default.render(
      /*#__PURE__*/ _react.default.createElement(App, null),
      document.getElementById("root")
    );
    ```
    - 因为需要实现 createElement，通过设置，可以使用 classic 创建 ReactElement
      ```js
        set DISABLE_NEW_JSX_TRANSFORM=true
      ```

- createElement
  ```js
  function createElement(type, config, children) {
    let ref;
    let key;
    if (config) {
      delete config.__source;
      delete config.__self;
      ref = config.ref;
      delete config.ref;
      key = config.key;
      delete config.key;
    }
    let props = { ...config };
    if (arguments.length > 3) {
      props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVDom);
    } else {
      props.children = wrapToVDom(children);
    }
    return {
      type,
      ref,
      key,
      props,
    };
  }
  ```
  - 特殊属性会被过滤，不会通过 props 传递
  - 对文本节点进行保证，统一 ReactElement 结构
    ```js
    function wrapToVDom(element) {
      return typeof element === "string" || typeof element === "number"
        ? { type: REACT_TEXT, props: { content: element } }
        : element;
    }
    ```
- render

  ```js
  /**
   * 渲染
   * @param VDom
   * @param container
   */
  function render(VDom, container) {
    mount(VDom, container);
  }
  /**
   * 通过VDom创建Dom，进行挂载
   * @param VDom
   * @param container
   */
  function mount(VDom, container) {
    let newDOM = createDom(VDom);
    container.appendChild(newDOM);
  }
  ```

  - 在 ReactDom.render 进行渲染

    ```js
    /**
     * 创建Dom
     * @param VDom
     */
    export function createDom(VDom) {
      const { type, props, ref } = VDom;
      let dom;
      if (type === REACT_TEXT) {
        dom = document.createTextNode(props.content);
      } else if (typeof type === "function") {
        if (type.isClassComponent) {
          return mountClassComponent(VDom);
        } else {
          return mountFunctionComponent(VDom, props);
        }
      } else {
        dom = document.createElement(type);
      }
      if (props) {
        updateProps(dom, props);
        if (typeof props.children == "object" && props.children.type) {
          mount(props.children, dom);
        } else if (Array.isArray(props.children)) {
          reconcileChildren(props.children, dom);
        }
      }
      VDom.dom = dom;
      return dom;
    }
    ```

    - 根据 VDom 的不同类型分发创建真实 Dom

      ```js
      // 创建Function组件
      function mountFunctionComponent(VDom, props) {
        const { type } = VDom;
        const oldRenderVDom = type(props);
        VDom.oldRenderVDom = oldRenderVDom;
        return createDom(oldRenderVDom);
      }
      // 创建class组件
      function mountClassComponent(VDom) {
        // 解构类的定义和类的属性对象
        let { type, props, ref } = VDom;
        //创建类的实例
        let classInstance = new type(props);
        if (ref) classInstance.ref = ref; //如果虚拟DOm身上有REF属性，那么就赋给类的实例
        if (type.contextType) {
          classInstance.context = type.contextType.Provider._value;
        }
        //让这个类组件的虚拟DOM的classInstance属性指向这个类组件的实例
        VDom.classInstance = classInstance;
        //调用实例的render方法返回要渲染的虚拟DOM对象
        let oldRenderVDom = classInstance.render();
        //把这个将要渲染的虚拟dom添加到类的实例上
        classInstance.oldRenderVDom = VDom.oldRenderVDom = oldRenderVDom;
        //根据虚拟DOM对象创建真实DOM对象
        let dom = createDom(oldRenderVDom);
        if (classInstance.componentDidMount) {
          classInstance.componentDidMount();
          // dom.componentDidMount=classInstance.componentDidMount.bind(classInstance);
        }

        return dom;
      }
      ```

    - 更新 Dom 上的属性
      ```js
      function updateProps(dom, oldProps = {}, newProps = {}) {
        for (let key in newProps) {
          if (key === "children") {
            continue;
          } else if (key === "style") {
            let styleObj = newProps[key];
            for (let attr in styleObj) {
              dom.style[attr] = styleObj[attr];
            }
          } else {
            dom[key] = newProps[key];
          }
        }
        for (let key in oldProps) {
          if (!newProps.hasOwnProperty(key)) {
            dom[key] = null;
          }
        }
      }
      ```
      - VDom 的 className 属性，直接赋值 dom 的 className 属性
    - 更新 Dom 的 children
      ```js
      function reconcileChildren(childrenVDom, parentDOM) {
        for (let i = 0; i < childrenVDom.length; i++) {
          let childVDom = childrenVDom[i];
          mount(childVDom, parentDOM);
        }
      }
      ```

- 类组件的更新

  - classComponent 基类
    ```js
    export class Component {
      static isReactComponent = true;
      constructor(props) {
        this.props = props;
        this.state = {};
        this.updater = new Updater(this);
      }
      setState(partialState, callback?) {
        this.updater.addState(partialState, callback);
      }
      forceUpdate() {
        let oldRenderVDom = this.oldRenderVDom;
        let oldDOM = findDOM(oldRenderVDom);
        let newRenderVDom = this.render();
        compareTwoVDom(oldDOM.parentNode, oldRenderVDom, newRenderVDom);
        this.oldRenderVDom = newRenderVDom;
      }
    }
    ```
    - 维护一个更新队列
    ```js
    class Updater {
      classInstance: any;
      pendingStates: any[];
      callbacks: any[];
      nextProps: any;
      constructor(classInstance) {
        this.classInstance = classInstance; //类组件的实例
        this.pendingStates = []; //等待生效的状态,可能是一个对象，也可能是一个函数
        this.callbacks = [];
      }
      addState(partialState, callback) {
        this.pendingStates.push(partialState); ///等待更新的或者说等待生效的状态
        if (typeof callback === "function") this.callbacks.push(callback); //状态更新后的回调
        this.emitUpdate();
      }
      emitUpdate(nextProps?) {
        this.updateComponent();
      }
      updateComponent() {
        let { classInstance, pendingStates, nextProps } = this;
        // 如果有等待更新的状态对象的话
        if (nextProps || pendingStates.length > 0) {
          shouldUpdate(classInstance, nextProps, this.getState(nextProps));
        }
      }
      getState(nextProps) {
        //如何计算最新的状态
        let { classInstance, pendingStates } = this;
        let { state } = classInstance;
        pendingStates.forEach((nextState) => {
          //如果pendingState是一个函数的话，传入老状态，返回新状态，再进行合并
          if (typeof nextState === "function") {
            nextState = nextState(state);
          }
          state = { ...state, ...nextState };
        });
        pendingStates.length = 0; //清空数组
        return state;
      }
    }
    function shouldUpdate(classInstance, nextState) {
      classInstance.state = nextState;
      classInstance.forceUpdate();
    }
    ```
  - mountClassComponent 时存储 oldVDom
  - findDOM,查找 VDom 上真实 dom
    ```js
    function findDOM(VDom) {
      let { type } = VDom;
      let dom;
      if (typeof type === "function") {
        dom = findDOM(VDom.oldRenderVDom);
      } else {
        dom = VDom.dom;
      }
      return dom;
    }
    ```
  - compareTwoVDom
    ```js
    export function compareTwoVDom(parentDOM, oldVDom, newVDom) {
      let oldDOM = findDOM(oldVDom);
      let newDOM = createDOM(newVDom);
      parentDOM.replaceChild(newDOM, oldDOM);
    }
    ```

- 渲染流程图
  ![alt 流程](/imgs/simpleReact.svg)
