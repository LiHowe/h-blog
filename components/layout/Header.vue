<template>
  <div class="header-container">
    <Logo />
    <theme-switcher />
  </div>
</template>
<script>
import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
export default {
  name: 'Header',
  components: {
    Logo,
    ThemeSwitcher,
  },
}
</script>
<style
    ThemeSwitcher lang="scss" scoped>
.header-container {
  height: $header-height;
  padding: $header-height / 10;
}
</style>
