<template>
  <div class="container">
    <article-card v-for="art in articles" :key="art.name" :article="art" />
  </div>
</template>
<script>

export default {
  async asyncData({ app, $content, params, error }) {
    const articles = await $content(`${app.i18n.locale}/articles`, params.slug)
    .only(['title', 'tag', 'slug', 'description', 'createdAt', 'stick'])
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
