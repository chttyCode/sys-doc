(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{459:function(s,t,a){"use strict";a.r(t);var e=a(44),r=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"十二-月"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#十二-月"}},[s._v("#")]),s._v(" 十二 月")]),s._v(" "),a("p",[s._v("正则大家都早已耳熟，工作中也偶有涉及，多数情况都是google或百度解决一下。对于这种现象也无可厚非，因为正则比较难学，且在工作中遇到的概率也很小。恰逢此次整理项目的正则，借此机会啃一啃这块骨头。")]),s._v(" "),a("p",[s._v("正则在我的印象中就是用来处理文本，有着一些特殊的操作符。知道这些想要去读写正则似乎只能靠google、百度了。如果想要学正则，就需要想想正则是用来解决什么问题的，又是如何解决的。")]),s._v(" "),a("p",[s._v("对于一段文本处理，在我们的日常开发中遇到的确实不多，当然也有种可能是我们对正则不了解，对一些可使用正则的场景忽略,eg:  编辑器提供的查找功能一般都是支持正则的，在 Linux 命令中，grep、vim，总之，正则是无处不在的，已经渗透到了日常工作的方方面面。 我们会有哪些需求？也就无非增删改查。所以正则正是解决string这类问题的，而要实现增删改查，正则提供查找内容、查找位置的能力。")]),s._v(" "),a("p",[s._v("正则，就是正则表达式，英文是 Regular Expression，一种描述文本内容组成规律的表达式。为了使表达式更简洁，正则提供一些元字符，所谓元字符就是指那些在正则表达式中具有特殊意义的专用字符，我们并不需要去记背这些，比如方括号、花括号、星号、问号等，这些无非就是一些定义而已，正真需要的时候查查手册也无可厚非。真正重要的是字符组、多选结构、量词、锚点，知道什么时候用字符组，什么时候用多选结构，什么时候用量词，什么时候用锚点，就很容易搭建起完整的概念模型。")]),s._v(" "),a("h2",{attrs:{id:"字符匹配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#字符匹配"}},[s._v("#")]),s._v(" 字符匹配")]),s._v(" "),a("p",[s._v("字符匹配主要用于查找内容，最简单的就是精确匹配。查找内容即为正则内容。")]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("regex")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"regex"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n")])])]),a("p",[s._v("而正则真正的强大之处，是在于其能实现模糊匹配,string的模糊匹配可以分为两个方向，一在string的长度方向上")]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 邮编")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("REGEXP_POST_CODE")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("^\\d{6}$")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("p",[s._v("除了长度方向，还有一种可能就是同一个字符位上可能需要模糊")]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 英文校验")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("REGEXP_ENGLISH")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("^[A-Za-z]+$")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("p",[s._v("其实这也就是正则字符匹配的2种模糊形式。为了实现简化这两种模式，正则提供了很多元字符。")]),s._v(" "),a("h3",{attrs:{id:"如何支持在字符长度方向上的模糊匹配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何支持在字符长度方向上的模糊匹配"}},[s._v("#")]),s._v(" 如何支持在字符长度方向上的模糊匹配")]),s._v(" "),a("p",[s._v("长度方向上的不固定主要是因为某些位置的上的字符可能出现多次，对于这种可能出现多次的字符位，为了表达式的简洁正则提供了量词，例如{m,n}，表示连续出现最少m次，最多n次。除此之外还有一些特殊更简洁的符号。")]),s._v(" "),a("blockquote",[a("p",[a("strong",[s._v("{m,}")]),s._v("  m 是一个非负整数。至少匹配m 次。"),a("br"),s._v(" "),a("strong",[s._v("{m}")]),s._v("  m是一个非负整数。匹配确定的 m 次。等价于{m,m}，表示出现m次。\n"),a("strong",[s._v("?")]),s._v("  等价于{0,1}，表示出现或者不出现。当该字符紧跟在任何一个其他限制符 (*, +, ?, {n}, {n,}, {n,m}) 后面时，匹配模式是非贪婪的。\n"),a("strong",[s._v("+")]),s._v(" 等价于{1,}，表示出现至少一次。\n*****  等价于{0,}，表示出现任意次，有可能不出现。")])]),s._v(" "),a("h3",{attrs:{id:"如何支持同一个字符位存在多种可能匹配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何支持同一个字符位存在多种可能匹配"}},[s._v("#")]),s._v(" 如何支持同一个字符位存在多种可能匹配")]),s._v(" "),a("p",[s._v('正则给我提供了表示范围的字符组，表现形式是使用中括号[],中括号[]代表多选一，可以表示里面的任意单个字符。当然字符组罗列所有可能的字符也是可以的，就有些类似精确匹配了，正则也就不那么简洁了。针对这种场景正则给出了用连字符-来省略和简写，或者使用排除字符组（反义字符组）的概念。例如[^abc]，表示是一个除"a"、"b"、"c"之外的任意一个字符。字符组的第一位放^（脱字符），表示求反的概念。除此之外正则还提供了一些常见的缩写形式')]),s._v(" "),a("blockquote",[a("p",[a("strong",[s._v("\\d")]),s._v("  匹配一个数字字符。等价于 [0-9]。\n"),a("strong",[s._v("\\D")]),s._v(" 匹配一个非数字字符。等价于[^-09]。\n"),a("strong",[s._v("\\w")]),s._v(" 匹配字母、数字、下划线。等价于[A-Za-z0-9_]。\n"),a("strong",[s._v("\\W")]),s._v(" 匹配非字母、数字、下划线。等价于 [^A-Za-z0-9_]。\n"),a("strong",[s._v("\\s")]),s._v(" 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \\f\\n\\r\\t\\v]。\n"),a("strong",[s._v("\\S")]),s._v(" 匹配任何非空白字符。等价于[^ \\f\\n\\r\\t\\v]。\n"),a("strong",[s._v(".")]),s._v("  匹配除换行符（\\n、\\r）之外的任何单个字符。")])]),s._v(" "),a("h2",{attrs:{id:"位置匹配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#位置匹配"}},[s._v("#")]),s._v(" 位置匹配")]),s._v(" "),a("p",[s._v("说到位置，比较熟悉的就是开头结尾、单词边界，其实字符串中的位置远不止于此，看一个金额中千分位的栗子：")]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"12345678"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("(?=(\\d{3})+$)(?!^)")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[s._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('","')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//12,345,678")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" result1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"123456789"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("(?<=^(\\d{3})+)(?<!$)")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[s._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('","')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("result1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//123,456,789")]),s._v("\n\n")])])]),a("p",[s._v("那如何理解字符串中的位置呢？\n可以简单的理解为")]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"3"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"4"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"5"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"6"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"7"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"8"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("p",[s._v("字符串理解为空字符串拼接而成的\n对于这种位置的匹配是无法通过定义元字符来完成的，因为位置千千万，也不可能统一定义描述。所以正则需要有能够描述位置的能力。")]),s._v(" "),a("h2",{attrs:{id:"断言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#断言"}},[s._v("#")]),s._v(" 断言")]),s._v(" "),a("p",[s._v("在有些情况下，我们对要匹配的文本的位置也有一定的要求，为了解决这个问题，正则中提供了一些锚字符，只用于匹配位置，而不是文本内容本身。")]),s._v(" "),a("blockquote",[a("p",[a("strong",[s._v("^")]),s._v("（脱字符）匹配输入字符串的开始位置。\n"),a("strong",[s._v("$")]),s._v("（美元符号）匹配输入字符串的结束位置。\n"),a("strong",[s._v("\\b")]),s._v("  匹配一个单词边界，也就是指单词和空格间的位置。例如， 'er\\b' 可以匹配\"never\" 中的 'er'，但不能匹配 \"verb\" 中的 'er'。\n"),a("strong",[s._v("\\B")]),s._v(" 匹配非单词边界。'er\\B' 能匹配 \"verb\" 中的 'er'，但不能匹配 \"never\" 中的 'er'。\n"),a("strong",[s._v("(?<=Y)")]),s._v(" 肯定逆向环视 左边是Y,(?<=\\d)six即左边是数字的six,6six可以匹配\n"),a("strong",[s._v("(?<!Y)")]),s._v("  否定逆向环视 左边不是Y,(?<!\\d)six,即左边不是数字的six,6six不能匹配\n**(?=Y) ** 肯定顺序环视 右边是Y,six(?=\\d)即右边是数字的six,six6可以匹配\n"),a("strong",[s._v("(?!Y)")]),s._v("  否定顺序环视 右边不是Y,six(?!\\d)即右边不是数字的six, six6不可以匹配")])]),s._v(" "),a("p",[s._v("对于这种环视的断言：左尖括号代表看左边，没有尖括号是看右边，感叹号是非的意思。\n看一个密码强度校验的栗子")]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("REGEXP_PASSWORD")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("^(?!.*\\\\s)(?!\\\\d+$)[a-zA-Z0-9\\\\s~!@#$%^&*()/\\\\|,.<>?\"\\'();:_+\\\\\\-=\\\\[\\\\]{}]{8,16}$")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("p",[s._v("对于这个正则，我们只需要弄明白"),a("code",[s._v("^(?!.*\\\\s)(?!\\\\d+$)")]),s._v("即可。")]),s._v(" "),a("p",[s._v("分开来看就是"),a("code",[s._v("(?!.*\\\\s)")]),s._v("和"),a("code",[s._v("^")]),s._v("。")]),s._v(" "),a("p",[s._v("表示开头前面还有个位置（当然也是开头，即同一个位置，想想之前的空字符类比）。")]),s._v(" "),a("p",[a("code",[s._v("(?!.*\\\\s)")]),s._v("表示该位置后面的字符不能是"),a("code",[s._v(".*\\\\s")]),s._v("，即，后面不能有空格。")]),s._v(" "),a("h2",{attrs:{id:"分组、分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分组、分支"}},[s._v("#")]),s._v(" 分组、分支")]),s._v(" "),a("p",[s._v("前面说了字符匹配&位置匹配，同时补充了能够描述位置相关的断言。但是作为表达式怎么能没有表达优先级的功能，当然正则的表达式优先级没有那么复杂，只有一组小括号()。我们知道/a+/匹配连续出现的“a”，而要匹配连续出现的“ab”时，需要使用/(ab)+/。其中括号是提供分组功能，使量词+作用于“ab”这个整体，测试如下：")]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("(ab)+")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[s._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ababa abbb ababab"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// => ["abab", "ab", "ababab"]')]),s._v("\n")])])]),a("p",[s._v("简单理解分组会将括号内的表达式视为一个整体优先级也是最高的。因此也就会有子表达式的概念了，为了提供子表达式的所有可能性，正则还对表达式提供了分支结构的元字符 ｜ 。")]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 国内手机号+86/0/17951")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("REGEXP_MOBILE_WITH_AREA")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("^(0|\\+?86|17951)?(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("p",[s._v("对于分组，正则还做了延伸，可以对分组进行引用，这个要配合具体的api了")]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("(\\d{4})-(\\d{2})-(\\d{2})")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2017-06-12"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"$2/$3/$1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// => "06/12/2017"')]),s._v("\n")])])]),a("p",[s._v("对于分组引用的几种方式")]),s._v(" "),a("ol",[a("li",[s._v("使用构造函数的全局属性$1至$9来获取：")])]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("(\\d{4})-(\\d{2})-(\\d{2})")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2017-06-12"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nregex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 正则操作即可，例如")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//regex.exec(string);")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//string.match(regex);")]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("RegExp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("$"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// "2017"')]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("RegExp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("$"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// "06"')]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("RegExp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("$"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// "12"')]),s._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("其中replace中的，参数里用$1、$2、$3指代相应的分组。")])]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("(\\d{4})-(\\d{2})-(\\d{2})")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2017-06-12"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("match"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" $"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" $"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" $"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" $"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" $"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" $"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// => "06/12/2017"')]),s._v("\n")])])]),a("p",[s._v('除了使用相应API来引用分组，也可以在正则本身里引用分组。但只能引用之前出现的分组，即反向引用。\n还是以日期为例,其中/和.需要转义。虽然匹配了要求的情况，但也匹配"2016-06/12"这样的数据。')]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("\\d{4}(-|\\/|\\.)\\d{2}(-|\\/|\\.)\\d{2}")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("p",[s._v("假设我们想要求分割符前后一致怎么办？此时需要使用反向引用：")]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("\\d{4}(-|\\/|\\.)\\d{2}\\1\\d{2}")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("p",[s._v("之前文中出现的分组，都会捕获它们匹配到的数据，以便后续引用，因此也称他们是捕获型分组，当然这种肯定会有额外的开销，如果我们不相对分组进行引用，正则也提供了取消捕获存储分组内容的功能(?:p)")]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 国内电话号码")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("REGEXP_PHONE_LANDLINE")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("^(?:\\d{3,5})?-?(?:\\d{7,8})(?:-\\d{1,})?$")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("h2",{attrs:{id:"回溯"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#回溯"}},[s._v("#")]),s._v(" 回溯")]),s._v(" "),a("p",[s._v("介绍完上面的正则使用，试着探一探深水区的东西-回溯，可以简单理解为匹配过程中的尝试。")]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("ab{1,3}c")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("p",[s._v('其中b{1,3}表示“b”字符连续出现1到3次，假如目标字符串为"abbbc"时，因为正则默认的是贪婪模式，就是尝试匹配更多的内容，所以就不存在回溯。')]),s._v(" "),a("p",[s._v('假如是"abbc"就存在回溯了，因为正则需要去尝试匹配第三个b,结果发现接下来的字符是“c”。那么就认为b{1,3}就已经匹配完毕。然后状态又回到之前的状态,再用c，去匹配字符“c”。当然，此时整个表达式匹配成功了。')]),s._v(" "),a("p",[s._v("在正则中，表示次数的量词默认是贪婪的，在贪婪模式下，会尝试尽可能最大长度去匹配。当然也可以改变为非贪婪模式，我们可以在量词后面加上英文的问号 (?)，这时正则就会尝试尽可能最小长度去匹配。")]),s._v(" "),a("h2",{attrs:{id:"读正则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#读正则"}},[s._v("#")]),s._v(" 读正则")]),s._v(" "),a("p",[s._v("首先看结构，再看操作符")]),s._v(" "),a("p",[s._v("Javascript正则中的结构有")]),s._v(" "),a("blockquote",[a("ol",[a("li",[s._v("字符字面量")]),s._v(" "),a("li",[s._v("字符组")]),s._v(" "),a("li",[s._v("量词")]),s._v(" "),a("li",[s._v("锚字符")]),s._v(" "),a("li",[s._v("分组")]),s._v(" "),a("li",[s._v("选择分支")]),s._v(" "),a("li",[s._v("反向引用")])])]),s._v(" "),a("p",[s._v("操作符有")]),s._v(" "),a("blockquote",[a("ol",[a("li",[s._v("转义符 \\")]),s._v(" "),a("li",[s._v("括号和方括号 (...)、(?:...)、(?=...)、(?!...)、[...]")]),s._v(" "),a("li",[s._v("量词限定符 {m}、{m,n}、{m,}、?、*、+")]),s._v(" "),a("li",[s._v("位置和序列 ^ 、$、 \\元字符、 一般字符")]),s._v(" "),a("li",[s._v("分支(管道符)（竖杠）|")])])]),s._v(" "),a("p",[s._v("上面操作符的优先级从上至下，由高到低。")]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("ab?(c|de*)+|fg")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),s._v("\n")])])]),a("ol",[a("li",[a("p",[s._v("由于括号的存在，所以，(c|de*)是一个整体结构。")])]),s._v(" "),a("li",[a("p",[s._v("在(c|de*)中，注意其中的量词*，因此e*是一个整体结构。")])]),s._v(" "),a("li",[a("p",[s._v("又因为分支结构“|”优先级最低，因此c是一个整体、而de*是另一个整体。")])]),s._v(" "),a("li",[a("p",[s._v("同理，整个正则分成了 a、b?、(...)+、f、g。而由于分支的原因，又可以分成ab?(c|de*)+和fg这两部分。")])])]),s._v(" "),a("h2",{attrs:{id:"注意点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#注意点"}},[s._v("#")]),s._v(" 注意点")]),s._v(" "),a("ol",[a("li",[s._v("括号嵌套，以左括号（开括号）为准。")]),s._v(" "),a("li",[s._v("引用不存在的分组，不会报错，会匹配反向引用的字符本身")]),s._v(" "),a("li",[s._v('分支默认是惰性的，比如/can|candy/，去匹配字符串"candy"，得到的结果是"can"，因为分支会一个一个尝试，如果前面的满足了，后面就不会再试验了。')]),s._v(" "),a("li",[s._v("需要转译的元字符")])]),s._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),s._v(" $ "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \\ "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])])]),a("ol",{attrs:{start:"5"}},[a("li",[s._v("当?字符紧跟在任何一个其他限制符 (*, +, ?, {n}, {n,}, {n,m}) 后面时，匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。例如，对于字符串 \"oooo\"，'o+?' 将匹配单个 \"o\"，而 'o+' 将匹配所有 'o'。")])]),s._v(" "),a("h2",{attrs:{id:"参考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[s._v("#")]),s._v(" 参考")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a",target:"_blank",rel:"noopener noreferrer"}},[s._v("密码强度正则"),a("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=r.exports}}]);