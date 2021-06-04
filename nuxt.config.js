const path = require('path')
import i18n from './locales/index'
import fs from 'fs'

function getPaths (lang, type) {
  let initial = lang
  if (lang === 'zh') { initial = '' }
  return fs.readdirSync(path.resolve(__dirname, 'content', `${lang}/articles/${type}`))
    .filter(filename => path.extname(filename) === '.md')
    .map(filename => `${initial}/articles/${type}/${path.parse(filename).name}`)
}

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Howe\'s blog',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
      },
      { hid: 'description', name: 'description', content: 'a blog of a web developer' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: '//at.alicdn.com/t/font_2339230_54yg7uau8jr.js' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'normalize.css/normalize.css',
  ],


  // webfontloader: {
  //   custom: {
  //     families: ['Source Sans Pro', 'Partner'],
  //     urls: ['/fonts/fonts.css']
  //   }
  // },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/globalLib',
    '~/plugins/lazyload',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // 'nuxt-webfontloader',
    ['nuxt-i18n', i18n]
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend (config) {
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/i')
      config.module.rules.splice(config.module.rules.indexOf(rule), 1) // 移除默认url-loader, 为了responsive-loader

      config.module.rules.push({
        test: /\.(jpe?g|png|webp)$/i,
        loader: 'responsive-loader',
        options: {
          placeholder: true,
          quality: 60,
          adapter: require('responsive-loader/sharp')
        }
      }, {
        test: /\.(gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]'
        }
      })
    }
  },

  generate: {
    routes: [
      '/zh', '404'
    ]
    .concat(getPaths('zh', 'code'))
    .concat(getPaths('zh', 'world'))
    .concat(getPaths('zh', 'life'))
    .concat(getPaths('en', 'code'))
    .concat(getPaths('en', 'world'))
    .concat(getPaths('en', 'life'))
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {}
  }
}
