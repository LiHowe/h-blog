export const menuList = [
  {
    title: 'home',
    to: '/',
    zh: '主页',
    en: 'Home'
  },
  // {
  //   title: 'article',
  //   to: '/article',
  //   zh: '文章列表',
  //   en: 'Articles'
  // },
  {
    title: 'aboutCode',
    to: '/code',
    zh: '打工人日志',
    en: 'About Code'
  },
  {
    title: 'aboutWorld',
    to: '/world',
    zh: '大千世界',
    en: 'About World'
  },
  {
    title: 'aboutLife',
    to: '/life',
    zh: '柴米油盐',
    en: 'About Life'
  },
]

export const generateMenuI18n = (lang) => menuList.reduce((init, menu) => {
  init[menu.title] = menu[lang]
  return init
}, {})
