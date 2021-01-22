<template>
  <div class="container">
    <article-card v-for="art in articleList" :key="art.name" :article="art" />
  </div>
</template>
<script>

import article_en from '@/content/en'
import article_zh from '@/content/zh'

export default {
  async asyncData({ app, $content, params, error }) {
    const asyncImport = async (name) => {
      const md = await import(`@/content/${app.i18n.locale}/articles/${name}.md`)
      return md.attributes
    }
    const articles = app.i18n.locale === 'zh' ? article_zh : article_en
    return Promise.all(articles.map(art => asyncImport(art))).then(res => ({ articleList: res }))
  }
}
</script>
