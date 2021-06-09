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
  dark:text-gray-200;
}
.dark .layout {
  background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
  background-blend-mode: multiply,multiply;
}
</style>
