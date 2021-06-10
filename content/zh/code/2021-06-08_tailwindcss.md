---
category: code
layout: blog
title: 初探TailwindCSS
date: 06/08-2021 13:14
coverImage: https://i.loli.net/2021/06/09/likAPwq4rTvBxfZ.png
tags:
  - CSS
description: TailwindCSS是一个原子化的CSS框架, 提供丰富的原子类以加快开发人员页面样式开发速度.
stick: false
---

## 📄 介绍
[Tailwind](https://tailwindcss.com/) [ 'teilˌwind ] CSS 是一个CSS框架，将CSS进行原子化，把大部分的CSS属性封装成一个个对应的工具类(class)，进而提高使用者页面样式的编写速度(ps:如果你熟悉文档的话)。

例如: 

```html
<div class="demo-box">
This is a DEMO box
</div>
```

要实现 <u>将`demo`这个div画成圆角添加阴影，添加内边距，并且将文字加粗</u> 这个简单的样式

+ CSS

  ```css
  .demo-box {
    border-radius: 4px;
   	font-weight: bold;
    padding: 4px;
    box-shadow: 0 0 4px black;
  }
  ```

+ TailwindCSS

  ```html
  <div class="rounded font-bold p-2 shadow">
  This is a DEMO box
  </div>
  ```





## 👋 开始使用





## 🤔 问题

1. 比内联CSS好在哪儿？
2. 比传统class写法好在哪？
3. 与Bootstrap有什么不同？

## 🔗 相关链接

[官网链接(英文)](https://tailwindcss.com/)

[官网链接(中文,会落后几个小版本)](https://www.tailwindcss.cn/)

