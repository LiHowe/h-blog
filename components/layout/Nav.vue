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
<style lang="scss" scoped>
.layout-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  .nav-item {
    display: inline-block;
    padding: 0 2.5 * $header-padding;
    height: 100%;
    line-height: $header-line-height;
    position: relative;
    &::after {
      position: absolute;
      width: 50%;
      height: 2px;
      left: 25%;
      bottom: 0;
      border-radius: 4px;
      background: linear-gradient(#000, #fff);
      transform: scaleY(0);
      transition: all .25s;
    }
    &:hover {
      color: $color-blue-2;
      &::after {
        transform: scaleY(1);
      }
    }
  }
  .nuxt-link-exact-active {
    font-weight: bold;
  }
}
</style>
