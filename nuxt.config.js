// import Mode from 'frontmatter-markdown-loader/mode'
const path = require('path')
import MarkdownIt from 'markdown-it'
import mip from 'markdown-it-prism'
// const i18n = require('./locales/index')
import i18n from './locales/index'
import fs from 'fs'
import Mode from "frontmatter-markdown-loader/mode"

const md = new MarkdownIt({
  html: true,
  typographer: true,
})
md.use(mip)

function getPaths (lang, type) {
  let initial = lang
  if (lang === 'en') { initial = '' }
  return fs.readdirSync(path.resolve(__dirname, 'content', `${lang}/${type}`))
    .filter(filename => path.extname(filename) === '.md')
    .map(filename => `${initial}/${type}/${path.parse(filename).name}`)
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
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: '//at.alicdn.com/t/font_2339230_54yg7uau8jr.js' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'normalize.css/normalize.css',
    '@/assets/css/main.scss',
    '@/assets/css/prism-material-light.css',
  ],

  styleResources: {
    scss: ['@/assets/css/_variable.scss'],
  },

  webfontloader: {
    custom: {
      families: ['Source Sans Pro', 'Partner'],
      urls: ['/fonts/fonts.css']
    }
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/globalLib'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    ['nuxt-i18n', i18n]
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['animejs'],
    extend (config) {
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/i')
      config.module.rules.splice(config.module.rules.indexOf(rule), 1)

      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'content'),
        options: {
          mode: [Mode.VUE_COMPONENT]
        }
      }, {
        test: /\.(jpe?g|png)$/i,
        loader: 'responsive-loader',
        options: {
          placeholder: true,
          quality: 60,
          size: 1400,
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
    .concat(getPaths('zh', 'articles'))
    .concat(getPaths('en', 'articles'))
  }
}
