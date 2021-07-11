<template>
  <button class="copy-btn dark:bg-gray-700 dark:text-gray-200 group-hover:opacity-100" ref="copy">
    <svg-icon :icon-class="status ? 'check' : 'copy'"></svg-icon>
  </button>
</template>
<script>
import Clipboard from 'clipboard'
export default {
  data: () => ({
    status: 0
  }),
  mounted() {
    const copyCode = new Clipboard(this.$refs.copy, {
      target (trigger) {
        return trigger.previousElementSibling
      }
    })

    copyCode.on('success', event => {
      event.clearSelection()
      this.status = 1
      // 2s 后还原状态
      window.setTimeout(() => {
        this.status = 0
      }, 2000)
    })
  }
}
</script>
<style lang="postcss" scoped>
.copy-btn {
  @apply
  h-8 w-8 shadow-md
  rounded text-base
  bottom-1 right-1
  absolute opacity-0
  transition-opacity
  bg-gray-800
  text-gray-100
  duration-150
  border
  border-gray-50
  flex items-center justify-center
  hover:text-green-400
  hover:border-green-400;
}
</style>
