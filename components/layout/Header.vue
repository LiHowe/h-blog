<template>
  <nav class="layout-header">
    <div class="header-content flex-box dis-select">
      <Logo />
      <div class="action-area flex-box">
        <Nav />
        <theme-switcher class="action-item" />
        <lang-switcher class="action-item" />
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Header',
}
</script>
<style lang="scss" scoped>
.layout-header {
  position: relative;
  height: $header-height;
  width: 100%;
  padding: $header-padding;
  box-shadow: 0 0 4px #c4c4c4;
  .header-content {
    max-width: $content-max-width;
    margin: auto;
  }
  .action{
    &-area {
      margin-left: auto;
    }
    &-item {
      & +.action-item {
        margin-left: $header-padding;
      }
    }
  }
}
</style>
