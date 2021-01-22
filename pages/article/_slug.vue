<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params, app, error }) {
    const article = await $content(`${app.i18n.locale}/articles`, params.slug).fetch().catch((err) => {
      error({ statusCode: 404, message: 'Page not found' })
    })
    return { article }
  }
}
</script>
