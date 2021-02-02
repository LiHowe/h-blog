<template>
  <article class="article">
    <div class="article-content">
      <h1 class="article-title">{{ article.title }}</h1>
      <p class="article-createTime">
        <Time :t="article.createdAt"/>
      </p>
      <p class="article-description">{{ article.description }}</p>
      <!-- <nuxt-content class="article-content" :document="article" /> -->
      <div v-html="article" class="article-content"></div>
    </div>
  </article>
</template>

<script>
import { Base64 } from 'js-base64'
import Markdown from 'markdown-it'

import '@/assets/js/prism.js'
// import mip from 'markdown-it-prism'

export default {
  async asyncData({ $content, params, app, error, $axios }) {
    // const article = await $content(`${app.i18n.locale}/articles`, params.slug).fetch().catch((err) => {
    //   error({ statusCode: 404, message: 'Page not found' })
    // })

    const res = await $axios.get(encodeURI('https://api.github.com/repos/LiHowe/Note/contents/Front End/未分类知识点.md'), {
      Accept: 'application/vnd.github.v3+json'
    })
    const md = new Markdown({
      html: true,
      typographer: true
    })
    // md.use(mip)
    let article = Base64.decode(res.data.content)
    article = md.render(article)
    return { article }
  },
  // mounted() {
  //   this.$axios.get('https://api.github.com/repos/LiHowe/Note/contents/leetcode/index.md', {
  //     Accept: 'application/vnd.github.v3+json'
  //   }).then(res => {
  //     console.log(window.atob(res.data.content))
  //   })
  // }
}
</script>
<style lang="scss" scoped>
.article {
  background: #fff;
  color: #000;
  border-radius: 6px;
  padding: 0 $article-padding $article-padding;
  overflow: auto;
  &-content {

  }
  &-header {

  }
}
</style>
