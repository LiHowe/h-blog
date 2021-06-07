<template>
  <div class="theme-switcher cursor-pointer" @click="changeMode">
    <svg-icon :icon-class="modeData[mode].icon" :size="iconSize" class="switcher-icon" />
  </div>
</template>
<script>
export default {
  name: "ThemeSwitcher",
  data: () => ({
    iconSize: '26px',
    modeData: {
      light: {
        label: 'Light',
        icon: 'sun',
        value: 'light'
      },
      dark: {
        label: 'Dark',
        icon: 'moon',
        value: 'dark'
      }
    }
  }),
  computed: {
    mode () {
      const preference = this.$colorMode.preference
      return preference === 'system' ? this.$colorMode.value : preference
    }
  },
  methods: {
    changeMode() {
      this.$colorMode.preference = this.mode === 'light' ? 'dark' : 'light'
    }
  },
};
</script>
<style lang="postcss" scoped>

</style>
