<template>
  <div class="article container">
    <article class="article-content">
      <h1 class="article-title">{{ article.title }}</h1>
      <p class="article-createTime">
        <Time :t="article.date"/>
      </p>
      <p class="article-description">{{ article.description }}</p>
      <nuxt-content class="article-content" :document="article" />
    </article>
    <div>
      <NuxtLink v-if="prev" :to="localePath({ name: 'articles-slug', params: { slug: prev.slug }})">
        上一篇: {{ prev.title }}
      </NuxtLink>

      <NuxtLink v-if="next" :to="localePath({ name: 'articles-slug', params: { slug: next.slug }})">
        下一篇: {{ next.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, app, error }) {
    const article = await $content(`${app.i18n.locale}/articles`, params.slug).fetch().catch((err) => {
      error({ statusCode: 404, message: 'Page not found' })
    })
    const [prev, next] = await $content(`${app.i18n.locale}/articles`)
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      prev,
      next,
      article
    }
  },
}
</script>
<style lang="postcss" scoped>
.article {
  @apply
  rounded-md
  mx-auto
  2xl:max-w-screen-xl
  p-5
  bg-gray-50
  shadow-md
  dark:bg-gray-600
  dark:text-gray-200
}
.article-title {
  @apply
  p-0
  m-0;
}
</style>
