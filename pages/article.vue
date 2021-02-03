<template>
  <article>
    This is design as article list page
    <article-card :article="article" v-for="(article, index) in articles" :key="article.title + index" />
  </article>
</template>
<script>
export default {
  async asyncData({ $content, error }) {
    const articles = await $content(`${app.i18n.locale}/articles`, params.slug)
      // .only(['title', 'tag', 'slug', 'description', 'createdAt', 'stick', 'img']) // 筛选markdown属性
      .sortBy('createdAt')
      .fetch()
      .catch(_ => {
        error({ statusCode: 404, message: 'Article not exist.' })
      })

    return {
      articles
    }
  }
}
</script>
