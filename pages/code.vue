<template>
  <main class="max-w-6xl mx-auto pt-16">
    <div class="card-list">
      <article-card :article="article" v-for="(article, index) in articles" :key="article.title + index" />
    </div>
  </main>
</template>
<script>
export default {
  async asyncData({ app, $content, error, params }) {
    const articles = await $content(`${app.i18n.locale}/code`, params.slug)
      // .only(['title', 'tag', 'slug', 'description', 'createdAt', 'stick', 'img']) // 筛选markdown属性
      .sortBy('date', 'asc')
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
