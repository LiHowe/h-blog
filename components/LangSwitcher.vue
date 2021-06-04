<template>
  <div class="lang-switcher clickable" @click="changeLocale()">
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
