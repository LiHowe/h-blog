<template>
  <div class="lang-switcher clickable" @click="changeLocale(locale)">
    <svg-icon :icon-class="current" size="26" />
  </div>
</template>
<script>
export default {
  name: 'LangSwitcher',
  computed: {
    current() {
      return this.$i18n.locale
    }
  },
  methods: {
    changeLocale() {
      const nextLocale = this.$i18n.locales.find(item => item.code !== this.current).code
      this.$router.push(this.switchLocalePath(nextLocale))
    }
  }
}
</script>
<style lang="scss" scoped>
$size: $header-height - 2 * $header-padding;
.lang-switcher {
  display: inline-block;
  position: relative;
  height: $size;
  width: $size;
  line-height: $size + 5px; // small position adjustment, 5px is perfect for display center
  text-align: center;
}
</style>
