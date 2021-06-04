<template>
  <ul class="layout-nav">
    <nuxt-link v-for="menu in menus" :key="menu.title" class="nav-item clickable" tag="li" :to="localePath(menu.to)">
      <span>{{ $t(`menu.${menu.title}`) }}</span>
    </nuxt-link>
  </ul>
</template>
<script>
import { menuList } from '@/utils/menu'

export default {
  name: 'Navigation',
  created() {
    this.menus = menuList
  }
}
</script>
