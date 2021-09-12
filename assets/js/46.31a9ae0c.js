(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{404:function(t,a,e){"use strict";e.r(a);var r=e(44),v=Object(r.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"react-源码阅读"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#react-源码阅读"}},[t._v("#")]),t._v(" React 源码阅读")]),t._v(" "),e("h2",{attrs:{id:"基础"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基础"}},[t._v("#")]),t._v(" 基础")]),t._v(" "),e("h2",{attrs:{id:"react-中的更新"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#react-中的更新"}},[t._v("#")]),t._v(" React 中的更新")]),t._v(" "),e("h2",{attrs:{id:"fiber-scheduler"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#fiber-scheduler"}},[t._v("#")]),t._v(" Fiber Scheduler")]),t._v(" "),e("ul",[e("li",[t._v("总体流程概况")]),t._v(" "),e("li",[t._v("scheduleWork\n"),e("blockquote",[e("p",[t._v("所有的更新都会从 scheduleWork 开始")])]),t._v(" "),e("ul",[e("li",[t._v("找到更新对应的 FiberRoot 节点")]),t._v(" "),e("li",[t._v("如果符合一定的条件重置 stack")]),t._v(" "),e("li",[t._v("如果符合条件就请求调度工作")])])]),t._v(" "),e("li",[t._v("requestWork\n"),e("ul",[e("li",[t._v("把 root 加入到调度队列中")]),t._v(" "),e("li",[t._v("判断是否批量更新")]),t._v(" "),e("li",[t._v("根据 expiration 判断调度类型")])])]),t._v(" "),e("li",[t._v("batchUpdate\n"),e("ul",[e("li",[t._v("批量更新")])])]),t._v(" "),e("li",[t._v("reactSchedule\n"),e("blockquote",[e("p",[t._v("异步调度流程")])]),t._v(" "),e("ul",[e("li",[t._v("维护时间片")]),t._v(" "),e("li",[t._v("模拟 requestIdeCallback")]),t._v(" "),e("li",[t._v("调度列表和超时判断")])])]),t._v(" "),e("li",[t._v("performWork\n"),e("ul",[e("li",[t._v("是否有 deadline 的区分")]),t._v(" "),e("li",[t._v("循环渲染 Root 的条件")]),t._v(" "),e("li",[t._v("超时处理")])])]),t._v(" "),e("li",[t._v("renderRoot\n"),e("ul",[e("li",[t._v("调用 workLoop 进行循环单元更新")]),t._v(" "),e("li",[t._v("捕获错误进行处理")])])])]),t._v(" "),e("h2",{attrs:{id:"各类组件-update"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#各类组件-update"}},[t._v("#")]),t._v(" 各类组件 update")]),t._v(" "),e("ul",[e("li",[t._v("入口优化\n"),e("blockquote",[e("p",[t._v("子节点的更新不一定会引起兄弟节点的更新")])]),t._v(" "),e("ul",[e("li",[t._v("判断组件的更新是否可以优化")]),t._v(" "),e("li",[t._v("更具节点类型分发处理")]),t._v(" "),e("li",[t._v("根据 expirationTime 判断是否可以跳过")])])]),t._v(" "),e("li",[t._v("functionComponent 更新")])]),t._v(" "),e("h2",{attrs:{id:"完成节点任务"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#完成节点任务"}},[t._v("#")]),t._v(" 完成节点任务")]),t._v(" "),e("h2",{attrs:{id:"commitroot"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#commitroot"}},[t._v("#")]),t._v(" commitRoot")]),t._v(" "),e("h2",{attrs:{id:"功能详解-基础"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#功能详解-基础"}},[t._v("#")]),t._v(" 功能详解：基础")]),t._v(" "),e("h2",{attrs:{id:"suspense-and-priority"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#suspense-and-priority"}},[t._v("#")]),t._v(" suspense and priority")]),t._v(" "),e("h2",{attrs:{id:"功能详解-hooks"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#功能详解-hooks"}},[t._v("#")]),t._v(" 功能详解：hooks")])])}),[],!1,null,null,null);a.default=v.exports}}]);