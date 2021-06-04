<template>
  <div>
    <nuxt-link class="article-card flex-box" :class="`card-${mode}`" tag="div" :to="localePath({ name: 'articles-slug', params: { slug: article.slug }})">
      <div class="card-thumbnail">
        <img class="card-thumbnail-img" :src="article.img" />
      </div>
      <div class="card-info">
        <div class="card-title">
          {{ article.title }}
        </div>
        <div class="card-desc">
          {{ article.description }}
        </div>
        <div class="card-footer flex-box">
          <Tag class="card-tag" v-for="(tag, i) in article.tag" :key="tag + i" :text="tag" />
          <span class="card-create-time">
            {{ createTime }}
          </span>
        </div>
      </div>
    </nuxt-link>
  </div>
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
