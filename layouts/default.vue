<template>
  <div class="layout">
    <LayoutHeader />
    <Nuxt class="layout-body container mx-auto min-h-full mt-3" />
    <LayoutFooter/>
  </div>
</template>

<script>
export default {
  layout: 'default',
}
</script>
<style lang="postcss" scoped>
.layout {
  @apply
  relative
  min-h-screen
  leading-normal
  tracking-normal
  dark:bg-gray-900
  dark:text-gray-200;

}
</style>
