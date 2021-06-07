<template>
  <div class="layout-header px-2.5 py-1 dark:bg-gray-800 bg-gradient-to-r from-blue-500 to-green-500">
    <div class="flex items-center justify-items-end">
      <Logo class="w-16"/>
      <div class="flex ml-auto">
        <LayoutNav/>
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
  h-11;
}
</style>
