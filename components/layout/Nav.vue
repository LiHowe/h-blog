<template>
  <ul class="layout-nav flex text-gray-200">
    <NuxtLink
      v-for="menu in menus"
      :key="menu.title"
      class="nav-item cursor-pointer mr-3"
      tag="li"
      :to="localePath(menu.to)"
    >
      <span>{{ $t(`menu.${menu.title}`) }}</span>
    </NuxtLink>
  </ul>
</template>
<script>
import { menuList } from '@/utils/menu'

export default {
  name: 'Navigation',
  data: () => ({
    menus: [],
  }),
  created() {
    this.menus = menuList
  }
}
</script>
