---
title: 前端面试相关
description: 本文收录常见前端面试问题
tags: ['javascript', 'interview', 'other']
---

# [JS] JS 的封装, 继承, 多态

+ 封装: 即对象或者function, JavaScript通过函数来模拟类
+ 继承:
  + 原型继承:  (无法创建私有属性)
    ```javascript
    function A (name) {
    	this.name = name
    }
    function B() {}
    B.prototype = new A()
    ```

  + 构造函数继承 ( 无法继承父类原型上的方法 )

    ```javascript
    function A (name) {
    	this.name = name
    }
    function B(name) {
        A.apply(this, arguments)
    }
    ```

  + 组合继承(结合原型继承与构造函数继承)

    ```JavaScript
    function A (name) {
    	this.name = name
    }
    function B() {
        A.apply(this, arguments)
    }
    B.prototype = new A()
    ```

  + 继承组合继承

    ```javascript
    function A (name) {
    	this.name = name
    }
    function B() {
        A.apply(this, arguments)
    }
    B.prototype = Object.create(A.prototype)		// 浅拷贝A的原型
    B.protptype.constructor = A
    ```

  + ES6 extends 继承

    ```javascript
    class A {
        constructor(name) {
            this.name = name
    	}
    }
    class B extends A{
        constructor(name) {
            super(name)
        }
    }
    ```



# [JS] new, bind, apply, call原理

## new

如: new Person()

```javascript
function myNew() {
    let Constructor = Array.prototype.shift.call(arguments)
    const obj = new Object() // Object.create({}) , {}
    obj.__proto__ = Constructor.prototype
    const result = Constructor.apply(obj, arguments)
    return typeof result === 'object' ? result : obj
}
```

## bind:  返回一个函数, 不执行


## apply: 

`fn.apply(this, [arg1, arg2])`


## call: 同apply, 只是接受参数不同

`fn.call(this, arg1, arg2)`



### 相关知识 -- 原型链, `__proto__`, `prototype`

+ 每个对象(除了`null`)都有`__proto__`属性, 来指向创建它的**原型**
+ 只有函数有`prototype`属性, 函数的原型的构造函数为自己`fn.prototype.constructor === fn`
+ `Object.prototype`为原型链顶端, 再往上查找就是null
+ `Function.prototype` 继承`Object.prototype`

在定义函数的时候, JavaScript会自动帮该函数的prototype属性赋予一个原型对象, 创建了两者之间的关联, 包含`constructor`和`__proto__`属性

也就是所有的函数/对象原型链顶端都是Object, 通过原型链一层一层查找到Object.prototype

`Object.prototype.__proto__ === null`



# [JS] 类型判断以及 instanceof, typeof区别

+ **instanceof**: 用来判断B(构造函数)的原型(`prototype`)是否出现在某个实例的原型链(`__proto__`上.

  用法: 例如: `A instanceof B`

+ **typeof**: 返回一个字符串, 底层为二进制低位(3位)判断. 因为`null`机器码全为0, 与对象(机器码(000))相同, 所以`typeof null === 'object'`

+ `Object.prototype.toString(A).slilce(8, -1)` 得到具体对象类型





# [JS] 创建对象的几种方式

1. `const a = {}`

2. `const a = new Object()`

3. `const a = Object.create({})` 或 `const a = Object.create(null)`

   当传入null的时候创建的对象没有原型, 不继承任何对象

   其中1为最高效的创建方式

4. 工厂模式

   ```javascript
   function createPerson(name) {
   	const o = new Object()
       o.name = name
       o.getName = function() {
           console.log(this.name)
       }
       return o
   }
   ```

5. 构造函数模式

   ```javascript
   function Person(name) {
       this.name = name
   }
   ```

6. 原型模式:  (缺: 所有的属性和方法都共享, 不能初始化参数)

   ```javascript
   function Person(name) {}
   Person.prototype.name = 'haha'
   Person.prototype.getName = function() { return this.name }
   Person.prototype.constructor = Person
   ```

7. 组合模式

   ```javascript
   function Person(name) {
       this.name = name
   }
   Person.prototype = {
       constructor: Person,
       getName: function() {
           console.log(this.name)
       }
   }
   ```

   

8. 寄生构造函数模式

   ```javascript
   function Person(name) {
       const o = new Object() // 寄生
       o.name = name
       o.getName = function() {
           console.log(this.name)
       }
       return o
   }
   ```



# [HTTP] HTTP/0.9, 1.0, 1.1, 2.0的区别

## HTTP/0.9[过时]

仅支持GET请求, 仅能访问HTML格式资源,不支持请求头

## HTTP/1.0

增加了POST请求方式,  每次TCP连接只能发送一个请求,服务器响应后关闭, 需要的时候再次连接

## HTTP/1.1

增加了PUT, PATCH, OPTIONS, DELETE方式

增加长连接(keep-alive), 分块传输(chunk)

同个TCP连接允许多个请求, Chrome最多为6个

## HTTP/2

多路复用, 增加服务器推送功能, 二进制传输, 头部进行了压缩



# [HTTP] HTTP, HTTPS区别

`HTTPS = HTTP + TLS`

TLS: (Transport Layer Security)传输层安全协议, 先采用非对称加密进行身份验证, 验证后采用对称加密进行通信



# [HTTP] 输入URL到页面展示发生了什么

1. 首先是域名解析(应用层DNS解析进行IP寻址)

   缓存读取顺序: `浏览器缓存`、`系统缓存`、`路由器缓存`、`ISP(运营商)DNS缓存`、`根域名服务器`、`顶级域名服务器`、`主域名服务器`

2. 传输层建立TCP连接(TCP3次握手)

3. 构建HTTP请求(HTTP/HTTPS区别 | HTTP/1.0 HTTP/1.1 HTTP/2.0区别)

   HTTPS比HTTP多了SSL层

4. 服务器构建HTTP响应

5. 关闭TCP连接(4次挥手)

6. 浏览器解析资源并渲染页面(渲染原理/过程)

   1. 解析HTML构建DOM(Document Object Model)树

      1.1 解码: 字节流 -> unicode字符流

      1.2 分词: 将unicode字符流切成一个个tokens(词语)

      1.3 解析: 根据tokens的语义创建响应节点

      1.4 建树: 建立节点关系, 创建DOM树

   2. 解析CSS构建CSSOM(CSS Object Model)树

   3. 合并DOM树和CSSOM树, 构建渲染(render)树

   4. 根据render树计算页面节点布局

   5. 根据上一步结果进行渲染绘制

      **如果DOM构建期间遇到script节点则暂停解析, 由JS引擎接管进行JS解析**

      `<script src="script.js" async></script>` async会中断DOM解析, 异步引入, 无序, 谁先

      `<script src="script.js" defer></script>` defer不会中断DOM解析, 延迟引入, 有序

      **DOM构建期间遇到img起始标签则构建HTMLImageELement, 设置src的时候触发图片资源加载**

   6. 如果JS操作了DOM就会触发回流(reflow)和重绘(repaint)

      ***回流一定重绘, 重绘不一定回流***



# [Vue] vue-router原理

vue-router分为`hash`模式和`history`模式

+ **hash模式**

  监听`hashchange`改变, 改变current的值来实现, 然后`<router-view>`负责渲染current路由对应的组件

  ```javascript
  window.addEventListener('hashchange',  () => {
      this.history.current = location.pathname 
  })
  ```

  

+ **history模式**

  监听`popstate`



# [Vue] Vue相关

## 渲染过程

![渲染过程](C:\workSpace\git-folder\public\Note\illustrations\vue渲染流程.png)

1. new Vue()
2. 调用$mount(), 实质是将template模板转换为render函数(`compileToFunctions`)
3. 执行render函数构建vNode.(深度优先遍历)(在数据变更之后也会触发render函数)
4. vNode(虚拟DOM)渲染成DOM.(patch方法, diff算法)


## computed原理
该知识点涉及到watcher的分类
+ deep watcher
+ user watcher
+ **computed watcher**(lazy watcher)
+ sync watcher
计算属性实质上是通过`Object.defineProperty(组件, 计算属性名, 计算方法)`来实现的, vue为计算属性创建了一个内部watcher(lazy), 通过watcher的dirty来实现监听数据改变重新计算

## computed为什么可以引用另一个computed?

## 双向绑定原理*

+ 如何监听数组的?

  通过覆盖array原型的7种方法进行

+ 

## keep-alive原理

##  Vue.set, Vue.delete原理

+ **数组**: 调用数组的**splice**方法
+ **对象**: 调用**defineReactive**方法

## Vue3 Proxy的好处,与之前的definePrototype的区别

## 页面节点更新过程



# [Other] 前端跨域处理

## 原因

由于浏览器同源策略(SOP), 浏览器无法加载其他域名下的资源.

**协议** + **域名** + **端口号**, 三者相同为同域, 其余皆跨域

## 解决方案

### 1. JSONP

原理: 通过`<script>`标签的src属性来发送get请求,并将返回值执行

### 2. document.domain + iframe

> 仅限于主域名相同,子域名不同的场景

```html
<!-- 父窗口 www.demo.com -->
<iframe id="iframe" src="http://child.demo.com/a.html"></iframe>
<script>
	document.domain = 'demo.com'
    var name = 'demo'
</script>

<!-- 子窗口  child.demo.com-->
<script>
	document.domain = 'demo.com'
	alert('get data from parent:', window.parent.name)
</script>
```



### 3. PostMessage



```html
<!-- www.demo.com -->
<iframe id="iframe" src="http://www.demo1.com/a.html"></iframe>
<script>
    const frameEl = document.querySelector('#iframe')
	frameEl.onload(() => {
        const data = { name: 'haha' }
        frameEl.contentWindow.postMessage(JSON.stringify(data), 'http://www.demo1.com')
    })
</script>

<!-- www.demo1.com -->
<script>
   window.addEventListener('message', (e) => {
       alert(e.data)
       if(e.data) {
           const data = data.parse(e.data)
           data.age = 18
       }
       window.parent.postMessage(JSON.stringify(data), 'http://www.demo.com')
   })
</script>
```



### 4. CORS(跨域资源共享)* (主流)

由服务器端设置Access-Control-Allow-Origin



### 5. Nginx | Apache 反向代理




## options请求
> 用于检测服务器所支持的请求方法, 会通过header中的`allow`字段返回

### 简单请求
+ HTTP method为`GET`, `POST`
+ content-type为 `text/plain` `mutipart/form-data` `application/x-www-form-urlencode`

### CORS中的预检请求
> 除去简单请求外的请求都会触发预检请求
> 用于检测实际请求是否可以被服务器所接受



# [Browser] 浏览器缓存机制

浏览器缓存主要分为: 

+ 强制缓存
+ 协商缓存

## 强制缓存

即请求资源的时候先从浏览器缓存中查找结果, 对应header中的字段为 **Expires**和**Cache-Control**

+ **Exprise**: HTTP/1.0. 使用客户端时间和服务器返回时间做对比,不一致则缓存失效
+ **Cache-Control**: HTTP/1.1
  + **private**: 默认值, 只有客户端可以缓存
  + public: 客户端和代理服务器都可以缓存
  + no-cache: 客户端缓存, 是否使用缓存由协商缓存验证决定
  + no-store: 所有内容都不缓存
  + max-age=xxx: 缓存内容在xxx**秒**后失效



## 协商缓存

浏览器第一次请求数据的时候浏览器会将缓存标识放入`response header`中一起返回给客户端

客户端将资源备份至缓存中, 再次请求服务器的时候会将缓存标识一起发送给服务器, 如果未失效则返回304,

失效则重新请求, 返回200并重新缓存.

即强制缓存失效后浏览器携带标识向服务器请求缓存, 控制协商缓存的字段有

+ **last-modified**: 资源的最后修改时间

+ **if-modified-since**: 浏览器再次请求服务器时头部会包含该字段, 服务端发现该字段后会进行资源新旧对比, 如果比较结果一致则返回304, 浏览器则会从浏览器缓存中读取

  

+ **etag**: 服务器响应时返回, `nginx`中由`last-modified` 与 `content-length`表示为十六进制组合而成.表示资源在服务器上的唯一标识

+ **if-none-match**: 浏览器再次请求服务器时携带上一次请求的`etag`

  + 如果请求资源`etag`不同, 则返回新资源, 状态码200.

  + 如果资源`etag`相同, 则返回304, 从浏览器缓存中获取资源

**不同点**:

+ `etag`比`last-modified`优先级要高
+ 计算`etag`会占用服务器资源



## 缓存场景:

+ 不需要缓存的资源可以使用`cache-control: no-store`
+ 频繁变动的资源可以使用`cache-control: no-cache`并配合`etag`使用
+ 代码文件通常使用`cache-control: max-age= 31536000`并配合打包文件名hash来进行缓存



# [Mobile] 移动端屏幕适配方案

## rem

通过媒体查询`@media`设置根元素(html标签)的字体大小来进行适配

**计算方式**:  

比如设计稿为750px, 设备实际宽度为375, 那么比率为 375 / 750 = 0.5

所以根元素`font-size`应该设置为0.5px, 但是为了计算方便需要乘以一个倍数, 通常取整数`100`

所以根元素`font-size`应该设置为`50px`.即`1rem = 50px`

那么页面上`100px`宽度的元素应该设置`width: 2rem`



# Cookie, SessionStorage与LocalStorage

+ **cookie**: 大小限制为4k, 可自行设置过期时间, 可以在header中携带
+ **localStorage**: 大小限制为4-5M, 无时间限制, 同域跨页面共享
+ **sessionStorage**: 大小限制为4-5M, 基于会话(session), 会话结束(当前网页窗口关闭)后清空, 同域跨页面不共享.



# 设计模式

## 发布-订阅模式(vue的事件监听)





# webpack相关

> [webpack概述 · webpack 中文文档(v4.15.1) (html.cn)](https://webpack.html.cn/)

## 配置

+ **entry**: `string` | `Array<string>` | ` object`指定打包文件入口 
+ **output**: `object`指定打包输出文件路径
  + path: `string`路径, 常用`path.resolve(__dirname, 'path')`
  + filename: `string`,打包后文件名
+ **loader**: 用于处理构建内容的函数. 执行顺序是从右到左(`Array.pop()`)
+ **plugin**: 拓展webpack功能
+ **resolve**: `object`配置webpack如何寻找模块对应的文件
  + modules: `Array<string>`第三方模块
  + alias: 别名
  + extensions: 拓展名

打包3种`hash`, 

## tree shaking原理



# 性能优化

1. 资源预加载

   `perfetch | perload | async | defer`

   ![](C:\workSpace\git-folder\public\Note\illustrations\script_defer_perload.png)

2. 图片雪碧图, 图片压缩, 小图片base64减少请求

3. 设置缓存策略, 对不常变动的资源进行缓存, 以及使用CDN

4. 资源懒加载(图片, 路由)

5. 使用服务器渲染(SSR)

6. CSS文件放在头部(head), js文件放在body下

7. 压缩文件(gzip) -- `compression-webpack-plugin`, 代码压缩



# 箭头函数

1. 没有this, 箭头函数的this指向外层
2. 箭头函数没有`arguments`变量
3. 不能使用`new`进行调回(原因为第一点)
4. 没有`super`



# [css] 伪类与伪元素

## 区别:
在于有没有从创建一个文档树之外的元素
+ **伪类**: 使用单冒号来表示`:`, 例如: `:hover`
+ **伪元素**: 使用双冒号`::`来表示, 例如: `::before`, `::after`



# [JS] BFC(block formatting context)

块级格式化上下文, 相当于一个容器,内部元素的样式不会对BFC外部的元素产生干扰.

创建方式有:

+ html根元素
+ float元素
+ `position: absolute`, `position: fixed`
+ `overflow: hidden`, `overflow: scroll`
+ `display: table`, `display: flex`, `display: inline-block`

作用:

+ 防止margin合并
+ 清除浮动
+ 计算高度的时候会将浮动元素也计算在内



# [JS] Event Loop

## 宏任务(macrotask)

+ script(主代码块)
+ UI 交互
+ I/O
+ setTimtout
+ setInterval
+ requestAnimationFrame

## 微任务(microtask)

+ Promise.then
+ MutationObserver

## 执行流程
> 每一次事件循环称为一次tick

1. 从宏任务队列(`macrotask queue`)中取出一个宏任务放入调用栈(stack)进行调用
2. 待宏任务调用完会去依次调用微任务队列(`microtask queue`)中的微任务直至队列清空
3. 微任务全部执行完毕后(此时微任务队列为空)进行页面渲染(UI Rendering)
4. 从宏任务队列中取出下一个宏任务放入调用栈(stack)中进行调用, 重复123





# [JS] 事件委托

> 利用事件冒泡原理来实现, 通过外层dom的绑定事件来监听内部子元素的对应事件
> 比如一个长列表中每条数据的点击事件可以通过外层容器的点击事件来进行捕获

## target vs currentTarget
+ **target**: 触发事件的元素
+ **:currentTarget**:: 监听事件的元素


# [HTTP] 网络安全

## XSS(跨站脚本攻击)

### 类型以及原理

#### 反射型(非持久型)
用户访问一个恶意链接, 该链接返回一个可执行的脚本(基本是自动执行)
#### 储存型(持久型)
会将恶意脚本传入后端进行储存, 比如评论区写脚本,然后不进行转义直接存储,
在查询该数据并渲染到页面的时候会执行恶意脚本
#### 基于DOM
通过恶意脚本修改dom结构或者为DOM添加事件用于执行恶意脚本.
比如为按钮添加绑定事件

### 防范
#### cookie设置httpOnly, 防止攻击者获取cookie
#### 检查输入, 并对用户输入的特殊字符进行转义
#### 检查输出, 对存储的用户自行输入的文本以字符串的形式进行输出.

## CSRF(跨站请求伪造)
> 借助cookie中的token等用户标识对服务器发起攻击

### 防范
#### 验证码
#### 检查referer是否合法: referer为表明来源地址的字段

# [JS] 作用域和作用域链

## 作用域:
+ 作用域为一个独立的代码执行区域, 内部变量不会暴露出去. 作用域的用处是隔离变量, 让不同作用域下的同名变量不会冲突.
+ 作用域是分层的, 内部可以访问外部作用域的变量, 反之不可

### 分类:
+ 全局作用域
  代码中任何位置都能访问到的
  比如`window`对象
+ 函数作用域
  只有函数内部能够访问到的
+ 块级作用域(ES6)
  `let` `const` 可以让变量限制在`一个函数内部`或者`一个代码块(一对花括号)`访问
  `let`, `const`声明的变量不会进行变量提升
  
## 作用域链
类似于原型链, 当变量在自身作用域内没有定义的话会逐层向创建这个函数的作用域进行查找. 

在当前作用域下没有定义的变量成为`自由变量`

## 拓展: 作用域与执行上下文(context)
> js的执行分为`解释阶段`和`执行阶段`
> + 解释阶段: 进行词法与语法分析, 作用域规则确定
> + 执行阶段: 创建执行上下文, 执行代码, 垃圾回收

** 作用域在函数/变量定义时就确定, 且不会变更 **
** 执行上下文在运行时确定, 且随时可能改变 **

# [JS] 闭包
可以理解为函数内的函数, 函数嵌套函数, 且函数内部作用域的变量不会被垃圾回收.
## 优点
1. 保护函数内变量,实现封装
2. 可以防止变量被垃圾回收, 缓存变量
3. 匿名自执行函数可以减少内存消耗.
## 缺点
1. 内部变量不会被垃圾回收, 导致内存泄漏. 解决办法为变量使用后手动赋值为null.

# [CSS] 实现居中的几种方式

## 水平居中
1. 行内元素: `text-align: center`
2. 块级元素: `margin: 0 auto`
3. 块级元素: 父元素`display: flex` 子元素`margin: 0 auto`
4. 块级元素: 父元素`display: flex; justify-content: center`
    ```css
    .parent {
    	position: relative;
    }
    .target {
        position: absolute;
        top: 50%;
        transform: translate(-50%);
    }
    ```
5.  
	```css
	.parent {
        position: relative;
    }
	.target {
	    position: absolute;
	    left: 50%;
	    width: 100px;
	    left: -50px;
	}
	```

## 垂直居中
1. 文本: `line-height: 父元素高度`
2. 块级: 父元素`display: flex` 子元素`margin: auto;`
3. 块级: 父元素`display: flex; align-items: center`
4. 
	```css
	.parent {
		display: flex;
	}
	.target {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
	}
	```

# [CSS] grid布局
`display: grid`
+ `fr`: 表示可用空间的一等份
+ `repeat(次数, 重复模板)`: 用于`grid-template-columns`, fr可传多个, 用空格分隔
+ `minmax(最小值, 最大值)`

+ `grid-template-columns`: 定义列轨道数量
+ `grid-template-rows`: 定义行轨道数量
+ `grid-auto-rows`: 行轨道高度

# [JS] DOM事件流
## 定义:
DOM事件流就是事件的传播过程, DOM事件流包括三个阶段: 
1. 捕获阶段
2. 目标阶段
3. 冒泡阶段

# [JS] fetch

# [webpack] webpack工作原理

1. 初始化参数: 从配置文件和命令行语句中读取并合并参数, 加载plugin
2. 开始编译: 初始化compiler对象, 加载配置并编译
3. 确定入口文件
4. 编译模块: tree shaking
5. 输出资源

# [Other] MVC vs MVVM
## MVC
## MVVM



# [html] symbol

> js基本类型现为7种
>
> [string](https://developer.mozilla.org/en-US/docs/Glossary/string)，[number](https://developer.mozilla.org/en-US/docs/Glossary/number)，[bigint](https://developer.mozilla.org/en-US/docs/Glossary/bigint)，[boolean](https://developer.mozilla.org/en-US/docs/Glossary/boolean)，[null](https://developer.mozilla.org/en-US/docs/Glossary/null)，[undefined](https://developer.mozilla.org/en-US/docs/Glossary/undefined)，[symbol](https://developer.mozilla.org/en-US/docs/Glossary/symbol)
>
> symbol 为基本数据类型,  主要用于**作为对象属性的标识符**



# [JS] AMD, CMD, UMD, CommonJS, ES6 Modules

## **IIFE**

  描述: 闭包

  例子: 
  ```javascript
  (function() {
  	var a = 1
  	console.log(a)
  })()
  ```


## **AMD规范** 

  描述:  (Asynchronous Module Definition) 异步模块加载规范, 主要用于浏览器端

  实现: RequireJS

  用法: define([模块列表], 回调函数)

  例子:
  ```javascript
  // module1
  	define(function(){
	  	console.log('module1')
	  	return {
	  		getName: function() {
	  			return 'module1'
	  		}
	  	}
  	})
  	
  	// main.js
  	define(function(require) {
  		var module1 = require('./module1')
  		console.log(module1.getName()) // 'module1'
  	})
  	
  	// index.html
  	requirejs(['main'])
  ```


## **CMD规范** 

  描述: (Common Module Definition) 通用模块加载规范, 主要用于浏览器端

  实现: Sea.js, 支持动态引用依赖

  

## **CommonJS规范**

  描述:  同步加载, 主要用于node端

  实现: (服务器端)node, (浏览器端) webpack, browserfy

  用法: require(模块)



## **UMD规范**

  描述: (Universal Module Definition) 通用模块规范, 支持AMD和CommonJS规范, 浏览器与node端通用



## **ES6 Module**

  描述: ES6模块化

  用法: import 模块

