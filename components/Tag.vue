<template>
  <span class="tag-container" :class="[{clickable}]">
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
<style lang="postcss" scoped>
.tag-container {
  @apply
  rounded-full flex justify-center items-center text-sm py-2 px-4 bg-gray-200 dark:bg-gray-600 h-7;
  & + .tag-container {
    @apply ml-1
  }
}
</style>
