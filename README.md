# h-blog

> [个人主页](https://lihowe.top)

为了学习Vue服务器渲染(Nuxt.js)并顺便搭建个人博客.

部署于 `netlify` , 域名于阿里云购买

使用 `netlify CMS`进行文章发布

## 引用依赖以及说明

后期补充

## 未开发功能

- [ ] 为每篇文章设置引用(比如写tailwindCSS的时候引用tailwindCSS相关, 方便在页面进行样式交互展示)
- [ ] 文章预览功能
- [ ] 文章tag分类
- [ ] 文章全局搜索
- [ ] 天气组件
- [ ] 记录点赞预览等功能
- [ ] 本地CMS

## 优化点

- [ ] 文章图片加载失败处理
- [ ] lazy load
- [x] 添加ToC
- [x] 完善Markdown显示样式
- [ ] 卡片样式优化 (支持两种布局)
- [ ] 多端适配

## 问题点记录

1. tailwindCSS @apply cannot be use with .dark之类的问题
    **原因**:  
    由于引用`@nuxt/content-theme-docs`导致不兼容问题
    **解决方案**:
    移除`content-theme-docs`依赖即可
