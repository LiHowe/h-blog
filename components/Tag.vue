<template>
  <span class="tag-container flex-box flex-box__center" :class="[{clickable}]">
    <slot>
      <span class="tag-text" v-text="text"></span>
    </slot>
  </span>
</template>
<script>
export default {
  name: 'Tag',
  props: {
    // tag文本
    text: String,
    // 是否可点击
    clickable: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.tag-container {
  font-size: .85rem;
  background: #fafafa;
  border-radius: 40px;
  text-align: center;
  padding: 0 0.7rem;
  .tag-text {
    color: $color-primary;
  }
  &.clickable {
    cursor: pointer;
  }
  & + .tag-container {
    margin-left: 5px;
  }
}
</style>
