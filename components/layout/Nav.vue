<template>
  <ul class="layout-nav flex text-gray-700 dark:text-gray-200">
    <NuxtLink
      v-for="menu in menus"
      :key="menu.title"
      class="nav-item cursor-pointer mr-10 text-base"
      tag="li"
      :to="localePath(menu.to)"
    >
      <span>{{ $t(`menu.${menu.title}`) }}</span>
    </NuxtLink>
  </ul>
</template>
<script>
import { menuList } from '~/utils/menu'

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
