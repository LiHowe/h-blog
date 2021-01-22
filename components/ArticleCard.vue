<template>
  <div class="article-card flex-box" :class="`card-${mode}`">
    <div class="card-thumbnail">
      <img class="card-thumbnail-img" src="https://images.unsplash.com/photo-1611092312573-f3843ba1c540?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" />
    </div>
    <div class="card-info">
      <h2 class="card-title">
        {{ article.name }}
      </h2>
      <h4 class="card-desc">
        {{ article.description }}
      </h4>
      <span class="card-create-time">
        {{ article.createAt }}
      </span>
      <span class="card-tag" v-for="(tag, i) in article.tag" :key="tag + i">
        {{ tag }}
      </span>
    </div>
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
$thumbnail-size: $card-height * 0.8;
.article-card {
  position: relative;
  border-radius: 4px;
  box-shadow: 0px 0 4px rgba(0, 0, 0, 0.25);
  height: $card-height;
  margin-left: $thumbnail-size / 2;
  .card {
    &-thumbnail {
      position: absolute;
      top: $card-height * 0.1;
      left: 0;
      width: $thumbnail-size;
      height: $thumbnail-size;
      transform: translateX(-50%);
      &-img {
        height: 100%;
        width: 100%;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25) ;
      }
    }
    &-info {
      width: 100%;
      padding: $card-padding;
      padding-left: $thumbnail-size / 2 + $card-padding;
    }
    &-title {
      font-weight: bold;
    }
    &-desc {
      color: gray;
    }
    &-tag {
      padding: 5px 10px;
      border-radius: 4px;
      border: 1px solid black;
    }
  }
}
</style>
