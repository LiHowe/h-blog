<template>
  <div class="layout-header fixed top-0 w-full bg-gray-200 dark:bg-gray-800 transition-colors duration-200 z-10">
    <div class="max-w-6xl mx-auto flex items-center h-16">
      <Logo class="w-16"/>
      <LayoutNav class="ml-16"/>
      <div class="flex ml-auto">
        <ThemeSwitcher class="action-item mr-3 cursor-pointer" />
        <!-- <LangSwitcher class="action-item cursor-pointer" /> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
}
</script>
