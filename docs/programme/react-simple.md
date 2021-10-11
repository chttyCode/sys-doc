# React 简易实现

- 根据原生框架，体验框架的渲染流程

  - 目前版本 jsx 转化会自动插入
    ```js
    // automatic
    var _jsxRuntime = require('react/jsx-runtime');
    //vs classic
    _reactDom.default.render(/*#__PURE__*/ _react.default.createElement(App, null), document.getElementById('root'));
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
    export const REACT_TEXT = Symbol('REACT_TEXT');
    function wrapToVDom(element) {
      return typeof element === 'string' || typeof element === 'number'
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
      } else if (typeof type === 'function') {
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
        if (typeof props.children == 'object' && props.children.type) {
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
          if (key === 'children') {
            continue;
          } else if (key === 'style') {
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
        if (typeof callback === 'function') this.callbacks.push(callback); //状态更新后的回调
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
          if (typeof nextState === 'function') {
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
      if (typeof type === 'function') {
        dom = findDOM(VDom.oldRenderVDom);
      } else {
        dom = VDom.dom;
      }
      return dom;
    }
    ```
  - compareTwoVDom
    ```js
    <!-- 全量更新替换、后续更新 -->
    export function compareTwoVDom(parentDOM, oldVDom, newVDom) {
      let oldDOM = findDOM(oldVDom);
      let newDOM = createDOM(newVDom);
      parentDOM.replaceChild(newDOM, oldDOM);
    }
    ```

- 合成事件和批量更新

  - 封装事件对象

    ```js
    <!-- updateQueue 全局更新队列 -->
    // 在原生dom上挂载store属性
    export function addEvent(dom, eventType, handleClick) {
      let store = dom.store || (dom.store = {});
      store[eventType] = handleClick;
      if (!document[eventType]) {
        document[eventType] = dispatchEvent;
      }
    }

    // 通过事件冒泡的方式，触发document事件，再通过event事件源向上查找绑定该事件的dom
    function dispatchEvent(event) {
      let { target, type } = event;
      let eventType = `on${type}`;
      updateQueue.isBatchingUpdate = true;
      let syntheticEvent = createSyntheticEvent(event);
      while (target) {
        let { store } = target;
        let handleClick = store && store[eventType];
        handleClick && handleClick.call(target, syntheticEvent);
        target = target.parentNode;
      }
      updateQueue.isBatchingUpdate = false;
      updateQueue.batchUpdate();
    }

    function createSyntheticEvent(nativeEvent) {
      let syntheticEvent = {};
      for (let key in nativeEvent) {
        syntheticEvent[key] = nativeEvent[key];
      }
      return syntheticEvent;
    }
    ```

  - 创建全局更新队列(vs component Updater)

    ```js
    export let updateQueue = {
      isBatchingUpdate: false,
      updaters: [],
      batchUpdate() {
        //批量更新
        for (let updater of updateQueue.updaters) {
          updater.updateComponent();
        }
        updateQueue.isBatchingUpdate = false;
        updateQueue.updaters.length = 0;
      },
    };
    ```

    - 改造 component 实例上的 Updater

      ```js
      class Updater {
        constructor(classInstance) {
          this.classInstance = classInstance;
          this.pendingStates = [];
          this.callbacks = [];
        }
        addState(partialState, callback) {
          this.pendingStates.push(partialState); ///等待更新的或者说等待生效的状态
          if (typeof callback === 'function') this.callbacks.push(callback); //状态更新后的回调
          this.emitUpdate();
        }
        emitUpdate(nextProps) {
          this.nextProps = nextProps;
          <!-- 批量更新 -->
          if (updateQueue.isBatchingUpdate) {
            updateQueue.updaters.push(this);
          } else {
            this.updateComponent();
          }
        }
        updateComponent() {
          let { classInstance, pendingStates } = this;
          if (this.nextProps || pendingStates.length > 0) {
            shouldUpdate(classInstance, this.nextProps, this.getState());
          }
        }
        getState() {
          let { classInstance, pendingStates } = this;
          let { state } = classInstance;
          pendingStates.forEach((nextState) => {
            if (typeof nextState === 'function') {
              nextState = nextState(state);
            }
            state = { ...state, ...nextState };
          });
          pendingStates.length = 0;
          return state;
        }
      }
      ```

      - 批量更新时，将当前组建的更新队列加入全局更新队里

  - 绑定封装事件
    ```js
    function updateProps(dom, oldProps = {}, newProps = {}) {
      for (let key in newProps) {
        if (key === 'children') {
          continue;
        } else if (key === 'style') {
          let styleObj = newProps[key];
          for (let attr in styleObj) {
            dom.style[attr] = styleObj[attr];
          }
        } else if (key.startsWith('on')) {
          addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
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
    - 绑定封装事件时原生 dom 绑定方式
      - onClick vs onclick

- Ref
  - class Ref
    - 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性
  - 转发 Ref
    - 函数组件没有实例，无法使用 Ref
    - 转发 Ref 就是将 ref 通过组件传递给子组件
  - 定义 Ref 标识
    ```js
    export const REACT_FORWARD_REF_TYPE = Symbol('react.forward_ref');
    ```
  - 创建
    ```js
    +function createRef() {
      return { current: null };
    };
    function forwardRef(render) {
      var elementType = {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render: render,
      };
      return elementType;
    }
    ```
  - CreateDom 新增一个分支
    ```js
    function createDOM(vDom) {
      let { type, props, ref } = vDom;
      let dom;
      if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) {
        return mountForwardComponent(vDom);
      } else if (type === REACT_TEXT) {
        dom = document.createTextNode(props.content);
      } else if (typeof type === 'function') {
        if (type.isReactComponent) {
          return mountClassComponent(vDom);
        } else {
          return mountFunctionComponent(vDom);
        }
      } else {
        dom = document.createElement(type);
      }
      if (props) {
        updateProps(dom, {}, props);
        if (typeof props.children == 'object' && props.children.type) {
          mount(props.children, dom);
        } else if (Array.isArray(props.children)) {
          reconcileChildren(props.children, dom);
        }
      }
      vDom.dom = dom;
      if (ref) ref.current = dom;
      return dom;
    }
    ```
    - 转发
      ```js
      function mountForwardComponent(vDom) {
        let { type, props, ref } = vDom;
        let renderVDom = type.render(props, ref);
        vDom.oldRenderVDom = renderVDom;
        return createDOM(renderVDom);
      }
      ```
  - mountClassComponent 新增 ref 实例挂载
    ```js
    function mountClassComponent(vDom) {
      let { type, props, ref } = vDom;
      let classInstance = new type(props);
      if (ref) ref.current = classInstance;
      let renderVDom = classInstance.render();
      classInstance.oldRenderVDom = renderVDom;
      let dom = createDOM(renderVDom);
      return dom;
    }
    ```
- 生命周期

  - 父组件

    - shouldUpdate 处理 shouldComponentUpdate、componentWillUpdate

      ```js
      function shouldUpdate(classInstance, nextProps, nextState) {
        let willUpdate = true;
        if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(nextProps, nextState)) {
          willUpdate = false;
        }
        if (willUpdate && classInstance.componentWillUpdate) {
          classInstance.componentWillUpdate();
        }
        if (nextProps) {
          classInstance.props = nextProps;
        }
        classInstance.state = nextState;
        if (willUpdate) classInstance.forceUpdate();
      }
      ```

    - forceUpdate 处理 componentDidUpdate
      ```js
      forceUpdate() {
        let oldRenderVDom = this.oldRenderVDom;
        let oldDOM = findDOM(oldRenderVDom);
        let newRenderVdom = this.render();
        compareTwoVDom(oldDOM.parentNode, oldRenderVDom, newRenderVDom);
        this.oldRenderVDom = newRenderVDom;
        if (this.componentDidUpdate) {
          this.componentDidUpdate(this.props, this.state);
        }
      }
      ```
    - mountClassComponent
      ```js
      function mountClassComponent(vDom) {
        let { type, props, ref } = vDom;
        let classInstance = new type(props);
        if (ref) ref.current = classInstance;
        if (classInstance.componentWillMount) classInstance.componentWillMount();
        let renderVDom = classInstance.render();
        classInstance.oldRenderVDom = renderVDom;
        let dom = createDOM(renderVDom);
        if (classInstance.componentDidMount)
          dom.componentDidMount = classInstance.componentDidMount.bind(classInstance);
        return dom;
      }
      ```

  - 子组件

    - vDom 上挂载实例

      ```js
      function mountClassComponent(vDom) {
        let { type, props, ref } = vDom;
        let classInstance = new type(props);
        vDom.classInstance = classInstance; // 实例上挂载
        if (ref) ref.current = classInstance;
        if (classInstance.componentWillMount) classInstance.componentWillMount();
        let renderVDom = classInstance.render();
        classInstance.oldRenderVDom = renderVDom;
        let dom = createDOM(renderVDom);
        if (classInstance.componentDidMount)
          dom.componentDidMount = classInstance.componentDidMount.bind(classInstance);
        return dom;
      }
      ```

    - compareTwoVDom

      ```js
      export function compareTwoVDom(parentDom, oldVDom, newVDom) {
        if (!oldVDom && !newVDom) {
          //老和新都是没有
          return;
        } else if (!!oldVDom && !newVDom) {
          //老有新没有,卸载老的
          unMountVDom(oldVDom);
        } else if (!oldVDom && !!newVDom) {
          //老没有新的有
          let newDom = createDom(newVDom);
          if (newDom) parentDom.insertBefore(newDom, newDom);
          else parentDom.appendChild(newDom);
          if (newDom.componentDidMount) newDom.componentDidMount();
          return;
        } else if (!!oldVDom && !!newVDom && oldVDom.type !== newVDom.type) {
          //新老都有，但类型不同
          let newDom = createDom(newVDom);
          unMountVDom(oldVDom);
          parentDom.appendChild(newDom);
          if (newDom.componentDidMount) newDom.componentDidMount();
        } else {
          updateElement(oldVDom, newVDom);
        }

        let oldDOM = findDOM(oldVDom);
        let newDOM = createDom(newVDom);
        parentDom.replaceChild(newDOM, oldDOM);
      }
      ```

    - unMountVDom

    ```js
    export function unMountVDom(vDom) {
      let { props, ref, classInstance } = vDom;
      let currentDOM = findDOM(vDom); //获取此虚拟DOM对应的真实DOM
      //vDom 可能是原生组件 类组件 classComponent 也可能是函数组件Function
      if (classInstance && classInstance.componentWillUnmount) {
        classInstance.componentWillUnmount();
      }
      // 释放引用
      if (ref) {
        ref.current = null;
      }

      //如果此虚拟DOM有子节点的话，递归全部删除
      if (props.children) {
        //得到儿子的数组
        let children = Array.isArray(props.children) ? props.children : [props.children];
        children.forEach(unMountVDom);
      }

      //把自己这个虚拟DOM对应的真实DOM从界面删除
      if (currentDOM) currentDOM.parentNode.removeChild(currentDOM);
    }
    ```

    - updateElement

    ```js
    export function updateElement(oldVDom, newVDom) {
      if (oldVDom.type === REACT_TEXT && newVDom.type === REACT_TEXT) {
        // 如果新老都是文本节点
        let currentDOM = (newVDom.dom = findDOM(oldVDom));
        if (oldVDom.props.content !== newVDom.props.content) {
          currentDOM.textContent = newVDom.props.content;
        }
        return;
      } else if (typeof oldVDom.type === 'string') {
        // 原生组件
        let currentDOM = (newVDom.dom = findDOM(oldVDom));
        updateProps(currentDOM, oldVDom.props, newVDom.props);
        updateChildren(currentDOM, oldVDom.props.children, newVDom.props.children);
      } else if (typeof oldVDom.type === 'function') {
        // React组件
        if (oldVDom.type.isClassComponent) {
          // 类组件
          newVDom.classInstance = oldVDom.classInstance;
          updateClassComponent(oldVDom, newVDom);
        } else {
          // 函数组件
          updateFunctionComponent(oldVDom, newVDom);
        }
      }
    }
    ```

    - updateFunctionComponent

    ```js
    function updateFunctionComponent(oldVdom, newVdom) {
      let parentDOM = findDOM(oldVdom).parentNode;
      let { type, props } = newVdom;
      let newRenderVdom = type(props);
      compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, newRenderVdom);
      newVdom.oldRenderVdom = newRenderVdom;
    }
    ```

    - updateClassComponent

    ```js
    function updateClassComponent(oldVdom, newVdom) {
      let classInstance = (newVdom.classInstance = oldVdom.classInstance);
      if (classInstance.componentWillReceiveProps) {
        classInstance.componentWillReceiveProps(newVdom.props);
      }
      classInstance.updater.emitUpdate(newVdom.props);
    }
    ```

    - updateChildren

    ```js
    function updateChildren(parentDOM, oldVChildren, newVChildren) {
      oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : oldVChildren ? [oldVChildren] : [];
      newVChildren = Array.isArray(newVChildren) ? newVChildren : newVChildren ? [newVChildren] : [];
      let maxLength = Math.max(oldVChildren.length, newVChildren.length);
      for (let i = 0; i < maxLength; i++) {
        let nextVdom = oldVChildren.find((item, index) => index > i && item && findDOM(item));
        compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], nextVdom && findDOM(nextVdom));
      }
    }
    ```

- DOM-DIFF 算法

  - 只对同级节点进行对比，如果 DOM 节点跨层级移动，则 React 不会复用
  - 不同类型的元素会产出不同的结构 ，会销毁老结构，创建新结构
  - 可以通过 key 标识移动的元素

  ```js
  // 定义常量
  export const REACT_FRAGMENT = Symbol('react.fragment');
  export const PLACEMENT = 'PLACEMENT';
  export const MOVE = 'MOVE';
  ```

  - updateElement

  ```js
  function updateElement(oldVdom, newVdom) {
    if (oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT) {
      let currentDOM = (newVdom.dom = findDOM(oldVdom));
      if (oldVdom.props.content !== newVdom.props.content) {
        currentDOM.textContent = newVdom.props.content;
      }
      return;
    } else if (typeof oldVdom.type === 'string') {
      let currentDOM = (newVdom.dom = findDOM(oldVdom));
      updateProps(currentDOM, oldVdom.props, newVdom.props);
      updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
    } else if (oldVdom.type === REACT_FRAGMENT) {
      dom = document.createDocumentFragment();
    } else if (typeof oldVdom.type === 'function') {
      if (oldVdom.type.isReactComponent) {
        newVdom.classInstance = oldVdom.classInstance;
        updateClassComponent(oldVdom, newVdom);
      } else {
        updateFunctionComponent(oldVdom, newVdom);
      }
    }
  }
  ```

  - updateChildren

  ```js
  export function updateChildren(parentDOM, oldVChildren, newVChildren) {
    oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : oldVChildren ? [oldVChildren] : [];
    newVChildren = Array.isArray(newVChildren) ? newVChildren : newVChildren ? [newVChildren] : [];
    let keyedOldMap = {};
    let lastPlacedIndex = 0;
    oldVChildren.forEach((oldVChild, index) => {
      let oldKey = oldVChild.key ? oldVChild.key : index;
      keyedOldMap[oldKey] = oldVChild;
    });
    let patch = [];
    newVChildren.forEach((newVChild, index) => {
      newVChild.mountIndex = index;
      let newKey = newVChild.key ? newVChild.key : index;
      let oldVChild = keyedOldMap[newKey];
      if (oldVChild) {
        updateElement(oldVChild, newVChild);
        if (oldVChild.mountIndex < lastPlacedIndex) {
          patch.push({
            type: MOVE,
            oldVChild,
            newVChild,
            mountIndex: index,
          });
        }
        delete keyedOldMap[newKey];
        lastPlacedIndex = Math.max(lastPlacedIndex, oldVChild.mountIndex);
      } else {
        patch.push({
          type: PLACEMENT,
          newVChild,
          mountIndex: index,
        });
      }
    });
    let moveVChild = patch.filter((action) => action.type === MOVE).map((action) => action.oldVChild);
    Object.values(keyedOldMap)
      .concat(moveVChild)
      .forEach((oldVChild) => {
        let currentDOM = findDOM(oldVChild);
        parentDOM.removeChild(currentDOM);
      });
    patch.forEach((action) => {
      let { type, oldVChild, newVChild, mountIndex } = action;
      let childNodes = parentDOM.childNodes;
      if (type === PLACEMENT) {
        let newDOM = createDom(newVChild);
        let childNode = childNodes[mountIndex];
        if (childNode) {
          parentDOM.insertBefore(newDOM, childNode);
        } else {
          parentDOM.appendChild(newDOM);
        }
      } else if (type === MOVE) {
        let oldDOM = findDOM(oldVChild);
        let childNode = childNodes[mountIndex];
        if (childNode) {
          parentDOM.insertBefore(oldDOM, childNode);
        } else {
          parentDOM.appendChild(oldDOM);
        }
      }
    });
  }
  ```

- 渲染流程图
  ![alt 流程](/sys-doc/imgs/simpleReact.svg)
