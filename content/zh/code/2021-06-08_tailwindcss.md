---
category: code
layout: blog
title: 初探TailwindCSS
date: 06/08-2021 13:14
coverImage: https://i.loli.net/2021/06/09/likAPwq4rTvBxfZ.png
thumbnail: https://i.loli.net/2021/06/11/hyQ8ksvMN3jIlVF.png
tags:
  - CSS
description: TailwindCSS是一个原子化的CSS框架, 提供丰富的原子类以加快开发人员页面样式开发速度.
stick: false
wip: true
---

## 📄 介绍

[Tailwind](https://tailwindcss.com/) [ 'teilˌwind ] CSS 是一个CSS框架，将CSS进行原子化，把大部分的CSS属性封装成一个个对应的工具类(class)，进而提高使用者页面样式的编写速度(ps:如果你熟悉文档的话)。



## 为什么要使用这东西?

希望大家先看看下面的几个例子来决定该框架是否适合你

### 🌰例1 - 简单样式

例如:

```html
<div class="demo-box">
This is a DEMO box
</div>
```

要实现 <u>将`demo-box`这个div画成圆角添加阴影，添加内边距，并且将文字加粗</u> 这个简单的样式

+ CSS

  ```css
  .demo-box {
    border-radius: 4px;
    font-weight: bold;
    padding: 4px;
    box-shadow: 0 0 4px black;
  }
  ```

  

+ inlineStyle

  ```html
  <div style="border-radius: 4px;font-weight: bold;padding: 4px;box-shadow: 0 0 4px black;">
    This is a DEMO box
  </div>
  ```

  

+ TailwindCSS

  ```html
  <div class="rounded font-bold p-2 shadow">
    This is a DEMO box
  </div>
  ```

  

看起来只是将内联样式的写法简化成一个个class，没有减少多少代码量



### 🌰例2 -- 稍复杂样式



## 👋 开始使用

### 安装

tailwindcss目前主要支持6种工具/框架进行安装使用

+ Next.js: [英文指引](https://tailwindcss.com/docs/guides/nextjs) | [中文指引](https://www.tailwindcss.cn/docs/guides/nextjs)
+ Vue3(Vite): [英文指引](https://tailwindcss.com/docs/guides/vue-3-vite) | [中文指引](https://www.tailwindcss.cn/docs/guides/vue-3-vite)
+ Laravel: [英文指引](https://tailwindcss.com/docs/guides/laravel) | [中文指引](https://www.tailwindcss.cn/docs/guides/laravel)
+ Nuxt.js: [英文指引](https://tailwindcss.com/docs/guides/nuxtjs) | [中文指引](https://www.tailwindcss.cn/docs/guides/nuxtjs)
+ Create React App: [英文指引](https://tailwindcss.com/docs/guides/create-react-app) | [中文指引](https://www.tailwindcss.cn/docs/guides/create-react-app)
+ Gatsby: [英文指引](https://tailwindcss.com/docs/guides/gatsby) | [中文指引](https://www.tailwindcss.cn/docs/guides/gatsby)

除了以上方式外，你还可以以PostCSS插件的方式进行安装使用



### IDE支持

VS Code选手: [Tailwindcss插件](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss), [PostCSS插件](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)

Webstorm选手: 新版本已经自动集成了!!（老版本自行在插件市场搜索 Tailwind CSS进行下载安装）

### 响应式

class前缀 | 宽度阈值 | 对应CSS
-- | -- | -- 
`sm` | 640px | `@media (min-width: 640px) { ... }`
`md` | 768px | `@media (min-width: 768px) { ... }` 
`lg` | 1024px | `@media (min-width: 1024px) { ... }` 
`xl` | 1280px | `@media (min-width: 1280px) { ... }` 
`2xl` | 1536px | `@media (min-width: 1536px) { ... }` 

### 状态转化(hover, focus和其他状态)

出于文件大小考虑，TailwindCSS并没有为全部的样式类启用全部的转化，除了内置的转化外，如果需要支持其他特定转化态则需要修改配置文件.

```js
// tailwind.config.js
module.exports = {
  // ...
  variants: {
    extend: {
      backgroundColor: ['active'], // 这样active就支持背景颜色的改变了
    }
  },
}
```



+ hover:

  + 颜色、阴影以及透明度
  + 基础的transform

+ focus:

  + 同hover
  + 轮廓环(ring,其实就是box-shadow)样式的修改
  + zIndex、accessibility

+ active: 都不支持，需要手动开启

+ group-hover:

  比如当你需要鼠标移到元素上时，它的子元素进行样式变化，则需要使用这个状态。需要给父元素添加`group`，子元素使用`group-hover:变化`进行样式控制。

  支持背景、边框、字体的颜色以及透明度变化

  例:

  ```html
  <div class="mt-5 group px-6 py-5 max-w-full mx-auto w-72 border border-indigo-500 border-opacity-25 cursor-pointer rounded-lg select-none overflow-hidden space-y-1 hover:bg-white hover:shadow-lg hover:border-transparent">
    <p class="text-indigo-600 group-hover:text-gray-900">小卡片</p>
    <p class="text-indigo-500 group-hover:text-gray-500">这是描述内容</p>
  </div>
  ```

  ![group-hover](https://i.loli.net/2021/06/15/75drQAPnOU4j9bt.png)

+ 

## 🤔 问题

1. 比内联CSS好在哪儿？
2. 比传统class写法好在哪？
3. 与Bootstrap有什么不同？



## 🐛 错误记录

+ tailwindCSS @apply cannot be use with .dark之类的问题

  **原因**

  由于引用`@nuxt/content-theme-docs`导致不兼容问题

  **解决方案**

  移除`content-theme-docs`依赖即可





## 🔗 相关链接

[官网链接(英文)](https://tailwindcss.com/)

[官网链接(中文,会落后几个小版本)](https://www.tailwindcss.cn/)

