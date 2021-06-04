<template>
  <nav class="container layout-header bg-gray-700">
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
