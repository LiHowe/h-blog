<template>
  <div class="layout relative min-h-screen leading-normal tracking-normal dark:text-gray-200 dark:bg-gray-800">
    <LayoutHeader />
    <Nuxt class="pt-16 relative z-0" />
    <LayoutFooter/>
  </div>
</template>

<script>
export default {
  layout: 'default',
}
</script>
