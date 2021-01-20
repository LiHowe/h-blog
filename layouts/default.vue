<template>
  <div class="layout">
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
  },
}
</script>
