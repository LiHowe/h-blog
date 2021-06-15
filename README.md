# h-blog

> [个人主页](https://lihowe.top)

为了学习Vue服务器渲染(Nuxt.js)并顺便搭建个人博客.

部署于 `netlify` , 域名于阿里云购买

使用 `netlify CMS`进行文章发布

## 引用依赖以及说明


## 代办

### 优化点

- [ ] 添加ToC
- [ ] 完善Markdown显示样式

### 新特性sss

- [ ] 文章预览功能
- [ ] 文章tag分类
- [ ] 文章全局搜索
- [ ] 天气组件
- [ ] 记录点赞预览等功能

## 开发遇到问题点记录

1. @apply cannot be use with .dark之类的问题
    原因:  
    由于引用`@nuxt/content-theme-docs`导致, 移除`content-theme-docs`依赖即可
