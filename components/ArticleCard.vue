<template>
  <div>
    <nuxt-link class="article-card flex-box" :class="`card-${mode}`" tag="div" :to="localePath({ name: 'articles-slug', params: { slug: article.slug }})">
      <div class="card-thumbnail">
        <img class="card-thumbnail-img" :src="article.img" />
      </div>
      <div class="card-info">
        <h2 class="card-title">
          {{ article.title }}
        </h2>
        <p class="card-desc">
          {{ article.description }}
        </p>
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
<style lang="scss" scoped>
$card-padding: 20px;
$card-height: 150px;
$card-bg-color: #fff;
$thumbnail-size-rate: 0.9;
$thumbnail-size: $card-height * $thumbnail-size-rate;
.article-card {
  position: relative;
  border-radius: 6px;
  box-shadow: 0px 0 4px rgba(0, 0, 0, 0.25);
  height: $card-height;
  margin: $card-padding 0 $card-padding $thumbnail-size / 2 ;
  background-color: rgba($card-bg-color, 0.7);
  color: invert($card-bg-color);
  cursor: pointer;
  transition: all .25s;
  &:hover {
    background-color: $card-bg-color;
  }
  .card {
    &-thumbnail {
      position: absolute;
      top: $card-height * ((1 - $thumbnail-size-rate) / 2);
      left: 0;
      width: $thumbnail-size;
      height: $thumbnail-size;
      transform: translateX(-50%);
      &-img {
        height: 100%;
        width: 100%;
        border-radius: 6px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25) ;
      }
    }
    &-info {
      position: relative;
      width: 100%;
      padding: $card-padding;
      padding-left: $thumbnail-size / 2 + $card-padding;
    }
    &-title {
      font-weight: bold;
      height: 30%;
    }
    &-desc {
      line-height: 1.5;
      height: 50%;
    }
    &-footer {
      height: 20%;
      font-size: 14px;
    }
    &-create-time {
      margin-left: auto;
    }
  }
}
</style>
