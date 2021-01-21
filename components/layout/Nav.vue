<template>
  <ul class="layout-nav">
    <nuxt-link v-for="menu in menus" :key="menu.title" class="nav-item clickable" tag="li" :to="localePath(menu.to)">
      {{ $t(`menu.${menu.title}`) }}
    </nuxt-link>
  </ul>
</template>
<script>
export default {
  name: 'Navigation',
  data: () => ({
    menus: [
      {
        title: 'home',
        to: '/'
      },
      {
        title: 'article',
        to: '/article'
      },
    ]
  })
}
</script>
<style lang="scss" scoped>
.layout-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  .nav-item {
    display: inline-block;
    padding: 0 2 * $header-padding;
    height: 100%;
    line-height: $header-line-height;
  }
  .nuxt-link-exact-active {
    font-weight: bold;
  }
}
</style>
