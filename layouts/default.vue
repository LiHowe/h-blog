<template>
  <div class="layout">
    <div class="layout-bg"></div>
    <Header />
    <Nuxt class="layout-body" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
export default {
  layout: 'default',
  components: {
    Header,
    Footer,
  }
}
</script>
<style lang="scss" scoped>
.layout {
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  color: #fff;
  padding-bottom: $footer-height;
  &-bg {
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
    z-index: -1;
  }
  &-body {
    margin: $article-padding auto;
    max-width: $content-max-width;
  }
}
</style>
