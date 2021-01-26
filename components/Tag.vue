<template>
  <span class="tag-container">
    <slot>
      <span class="tag-text" v-text="text"></span>
    </slot>
  </span>
</template>
<script>
export default {
  name: 'Tag',
  props: {
    text: String
  }
}
</script>
<style lang="scss" scoped>
.tag-container {
  padding: 5px 12px;
  font-size: 12px;
  background: #fafafa;
  border-radius: 40px;
  .tag-text {
    color: $color-primary;
  }
  & + .tag-container {
    margin-left: 5px;
  }
}
</style>
