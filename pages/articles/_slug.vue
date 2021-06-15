<template>
  <div class="article container relative bg-gray-50">
    <div class="cover-image-wrapper h-60">
      <img class="cover-image" :src="article.coverImage" alt="">
    </div>
    <article class="article-content dark:text-gray-700 2xl:max-w-screen-xl">
      <span class="article-title">{{ article.title }}</span>
      <p class="article-createTime">
        <Time :t="article.date"/>
      </p>
      <p class="article-description">{{ article.description }}</p>
      <nuxt-content class="content-body" :document="article" />
    </article>
    <div>
      <NuxtLink v-if="prev" :to="{ name: `articles-slug___${$i18n.locale}`, params: { slug: prev.slug }, query: { t: prev.category }}">
        上一篇: {{ prev.title }}
      </NuxtLink>

      <NuxtLink v-if="next" :to="{ name: `articles-slug___${$i18n.locale}`, params: { slug: next.slug}, query: { t: next.category }}">
        下一篇: {{ next.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, app, error, query }) {
    const path = query.t
    const article = await $content(`${app.i18n.locale}/${path}`, params.slug).fetch().catch((err) => {
      error({ statusCode: 404, message: 'Page not found' })
    })
    const [prev, next] = await $content(`${app.i18n.locale}/${path}`)
      .only(['title', 'slug', 'category'])
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
  @apply p-4 rounded-lg shadow-md;
}
.dark .article {
 background-color: #DCD9D4;
 background-image: linear-gradient(to bottom, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), radial-gradient(at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.50) 50%);
 background-blend-mode: soft-light,screen;
}
.cover-image-wrapper {
  @apply relative w-full overflow-hidden rounded-lg object-center object-scale-down left-0 z-0;
}
.cover-image {
  @apply w-full h-full;
}
.article-content {
  @apply
  relative
  -mt-12
  z-10
  rounded-lg
  mx-10
  p-5
  bg-gray-200
  shadow-md;
}

.article-title {
  @apply
  text-2xl
  p-0
  m-0;
}
</style>
