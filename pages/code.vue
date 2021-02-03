<template>
  <main class="container-code">
    <div class="card-list">
      <article-card :article="article" v-for="(article, index) in articles" :key="article.title + index" />
    </div>
  </main>
</template>
<script>
export default {
  async asyncData({ app, $content, error, params }) {
    const articles = await $content(`${app.i18n.locale}/articles`, params.slug)
      // .only(['title', 'tag', 'slug', 'description', 'createdAt', 'stick', 'img']) // 筛选markdown属性
      .sortBy('createdAt', 'asc')
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
