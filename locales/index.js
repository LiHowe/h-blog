export default {
  locales: [
    {
      code: 'zh',
      iso: 'zh-CN',
      name: '简体中文',
      icon: 'cn',
      file: 'zh/index.js'
    },
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      icon: 'us',
      file: 'en/index.js'
    },
  ],
  useCookie: true,
  alwaysRedirect: true,
  defaultLocale: 'zh',
  fallbackLocale: 'zh',
  parsePages: false,
  lazy: true,
  seo: true,
  langDir: 'locales/',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    onlyOnRoot: true,  // recommended
    fallbackLocale: 'zh'
  }
}
