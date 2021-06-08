<template>
  <nuxt-link class="article-card" :class="`card-${mode}`" tag="div" :to="localePath({ name: 'articles-slug', params: { slug: article.slug }})">
    <div class="card-thumbnail flex-none">
      <img class="card-thumbnail-img w-32 h-32 rounded-sm" :src="article.img" />
    </div>
    <div class="card-info relative py-3 px-5 w-full leading-loose text-sm">
      <div class="font-semibold text-xl">
        {{ article.title }}
      </div>
      <div class="font-normal">
        {{ article.description }}
      </div>
      <div class="card-footer flex absolute bottom-3 left-0 px-5 w-full">
        <Tag class="card-tag " v-for="(tag, i) in article.tag" :key="tag + i" :text="tag" />
        <span class="card-create-time ml-auto">
          {{ createTime }}
        </span>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
import day from 'dayjs'

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
  computed: {
    createTime() {
      return day(this.article.createAt).format('YYYY-MM-DD')
    }
  }
}
</script>
<style lang="postcss" scoped>
.article-card {
  @apply
  rounded-md
  bg-gray-50
  flex shadow-md cursor-pointer
  2xl:max-w-screen-xl
  mx-auto
  transform
  duration-500
  transition
  overflow-hidden
  relative
  dark:bg-gray-600
  dark:text-gray-200
  hover:scale-105
  hover:shadow-lg;
  & + .article-card {
    @apply
    mt-5;
  }
}
</style>
