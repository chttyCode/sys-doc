(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{387:function(s,t,a){"use strict";a.r(t);var _=a(44),v=Object(_.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"数组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数组"}},[s._v("#")]),s._v(" 数组")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("定义：是一种线性表结构数据、使用连续内存、存储类型选相同的数据")]),s._v(" "),a("ul",[a("li",[s._v("线性表(可以类比线性方程),即一条直线，特点是每个数据只有前后关系")]),s._v(" "),a("li",[s._v("连续内存，可以快速访问、缺点是增删会造成群移操作\n"),a("ul",[a("li",[s._v("有序数组的插入，\n"),a("ul",[a("li",[s._v("方法一：群移+插入")]),s._v(" "),a("li",[s._v("方法二：插入指定位置，将该位置添加到末尾，快排序的思想")])])]),s._v(" "),a("li",[s._v("数组的删除\n"),a("ul",[a("li",[s._v("追个删除，每次删除都会引起数组内的群移操作")]),s._v(" "),a("li",[s._v("标记删除，遍历记录待删除项，最后删除，引起一次数组群移操作")])])])])])])]),s._v(" "),a("li",[a("p",[s._v("数组快速访问")]),s._v(" "),a("ul",[a("li",[s._v("计算机按地址寻值")]),s._v(" "),a("li",[s._v("数组申请内存的方式是\n"),a("ul",[a("li",[s._v("申请首址，base_address，后续为连续地址")])])]),s._v(" "),a("li",[s._v("计算机寻址"),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("  a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("_address "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" base_address "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" data_type_size\n")])])])]),s._v(" "),a("li",[s._v("数组下标为从 0 开始\n"),a("ul",[a("li",[s._v("方便计算寻址地址，首址 base_address + 0 * data_type_size")]),s._v(" "),a("li",[s._v("C 语言设计者用 0 开始计数数组下标，之后的 Java、JavaScript 等高级语言都效仿了 C 语言")])])])])]),s._v(" "),a("li",[a("p",[s._v("Array")]),s._v(" "),a("ul",[a("li",[s._v("11 ✅")])]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v(" 盛水最多 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.")]),s._v(" 暴力解法、时间"),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("O")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" 空间"),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("O")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.")]),s._v(" 双指针左右夹逼"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("向内移动短板 时间"),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("O")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" 空间"),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("O")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])])]),a("ul",[a("li",[s._v("283 ✅")]),s._v(" "),a("li",[s._v("70 ✅")]),s._v(" "),a("li",[s._v("15 ✅")])])])]),s._v(" "),a("h1",{attrs:{id:"链表"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#链表"}},[s._v("#")]),s._v(" 链表")]),s._v(" "),a("ul",[a("li",[s._v("链表就通过指针将一组零散的地址串联起来使用的一种数据结构")]),s._v(" "),a("li",[s._v("数组能够随机访问，是因为使用了寻址公式，链表只能从头指针开始一个一个遍历查找")]),s._v(" "),a("li",[s._v("数组使用的是连续内存地址，链表使用一组零散内存串联起来使用\n"),a("ul",[a("li",[s._v("数组这种使用连续内存，对 CPU 缓存比较友好，可以借助预读数组中的数据，提高访问效率，链表无法预读")]),s._v(" "),a("li",[s._v("缺点内存大小固定，存在动态扩容拷贝数据的问题")]),s._v(" "),a("li",[s._v("链表频繁的增删存在增加 GC")])])]),s._v(" "),a("li",[s._v("链表:\n"),a("ul",[a("li",[s._v("单链表通过一种空间换时间的思想，来衍生出双向链表、循环链表")]),s._v(" "),a("li",[s._v("重要的思想\n"),a("ul",[a("li",[s._v("空间换时间(空间足够时，可以考虑牺牲空间来换时间)、时间换空间(在空间比较珍贵时，可以考虑使用时间来换空间)")])])])])]),s._v(" "),a("li",[s._v("缓存的方式(可以类比，买了很多书，需要整理的时候)\n"),a("ul",[a("li",[s._v("先进先出")]),s._v(" "),a("li",[s._v("使用最少")]),s._v(" "),a("li",[s._v("最近最少使用")])])]),s._v(" "),a("li",[s._v("单链表实现 LRU 缓存淘汰算法(当一个新数据被访问时) 时间复杂度为 O(n)\n"),a("ul",[a("li",[s._v("如果此数据缓存中已存在，这遍历找到对应的节点，删除原节点，添加在头结点")]),s._v(" "),a("li",[s._v("如果数据缓存中不存在 - 如果数据未满，在头节点插入新数据 - 如果数据已满，删除尾节点，将新数据插入头结点")])])])]),s._v(" "),a("blockquote",[a("p",[s._v("CPU 缓存机制:CPU 在从内存读取数据的时候，会先把读取到的数据加载到 CPU 的缓存中。而 CPU 每次从内存读取数据并不是只读取那个特定要访问的地址，而是读取一个数据块(这个大小我不太确定。。)并保存到 CPU 缓存中，然后下次访问内存数据的时候就会先从 CPU 缓存开始查找，如果找到就不需要再从内存中取。这样就实现了比内存访问速度更快的机制，也就是 CPU 缓存存在的意义:为了弥补内存访问速度过慢与 CPU 执行速度快之间的差异而引入。")])]),s._v(" "),a("ul",[a("li",[a("p",[s._v("Linked List")]),s._v(" "),a("ul",[a("li",[s._v("206")]),s._v(" "),a("li",[s._v("24")]),s._v(" "),a("li",[s._v("141")]),s._v(" "),a("li",[s._v("142")]),s._v(" "),a("li",[s._v("25")])])]),s._v(" "),a("li",[a("p",[s._v("test")]),s._v(" "),a("ul",[a("li",[s._v("26 ✅ => 80 ✅")]),s._v(" "),a("li",[s._v("189")]),s._v(" "),a("li",[s._v("21")]),s._v(" "),a("li",[s._v("88")]),s._v(" "),a("li",[s._v("1")]),s._v(" "),a("li",[s._v("283")]),s._v(" "),a("li",[s._v("66")])])])])])}),[],!1,null,null,null);t.default=v.exports}}]);