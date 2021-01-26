<template>
  <div>
    <nuxt-link class="article-card flex-box" :class="`card-${mode}`" tag="div" :to="localePath({ name: 'articles-slug', params: { slug: article.slug }})">
      <div class="card-thumbnail">
        <img class="card-thumbnail-img" src="https://images.unsplash.com/photo-1611092312573-f3843ba1c540?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=460&q=80" />
      </div>
      <div class="card-info">
        <h2 class="card-title">
          {{ article.title }}
        </h2>
        <h4 class="card-desc">
          {{ article.description }}
        </h4>
        <div class="card-footer flex-box">
          <Tag class="card-tag" v-for="(tag, i) in article.tag" :key="tag + i" :text="tag" />
          <span class="card-create-time">
            {{ article.createdAt }}
          </span>
        </div>
      </div>
    </nuxt-link>
  </div>
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
