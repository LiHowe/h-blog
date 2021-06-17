<template>
  <nuxt-link
    class="article-card"
    tag="div"
    :to="{ name: `articles-slug___${$i18n.locale}`, params: { slug: article.slug }, query: { t: article.category }}"
  >
    <div class="card-thumbnail flex-none w-32 h-32 flex items-center justify-center">
      <img class="card-thumbnail-img object-scale-down rounded-sm" :src="article.thumbnail" />
    </div>
    <div class="card-info relative py-3 px-5 w-full leading-loose text-sm">
      <div class="font-semibold text-xl">
        {{ article.title }}
      </div>
      <div class="font-normal">
        {{ article.description }}
      </div>
      <div class="card-footer flex absolute bottom-3 left-0 px-5 w-full">
        <Tag class="card-tag " v-for="(tag, i) in article.tags" :key="tag + i" :text="tag" />
        <span class="card-create-time ml-auto">
          {{ article.date }}
        </span>
      </div>
    </div>
  </nuxt-link>
</template>
<script>

export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      required: true,
      default: () => ({})
    },
    mode: {
      type: String,
      validator: (t) => {
        return ['line', 'block'].includes(t)
      },
      default: 'line'
    }
  },
}
</script>
<style lang="postcss" scoped>
.article-card {
  @apply rounded-md flex shadow-md cursor-pointer mx-auto transform duration-500 transition overflow-hidden relative
  dark:bg-gray-700 dark:bg-opacity-30 dark:text-gray-200 bg-gray-100 2xl:max-w-screen-xl opacity-90;
  &:hover {
    @apply scale-105 shadow-lg;
  }
}
.article-card + .article-card {
  @apply
    mt-5;
}
</style>
