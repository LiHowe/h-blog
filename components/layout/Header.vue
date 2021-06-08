<template>
  <div class="layout-header">
    <div class="flex items-center justify-items-end">
      <Logo class="w-16"/>
      <LayoutNav class="ml-auto"/>
      <div class="flex ml-auto">
        <ThemeSwitcher class="action-item mr-3 cursor-pointer" />
        <LangSwitcher class="action-item cursor-pointer" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
}
</script>
<style lang="postcss" scoped>
.layout-header {
  @apply
  leading-5
  w-auto
  px-2.5
  py-1
  text-center
  h-12;
}
.dark .layout-header {
}
</style>
