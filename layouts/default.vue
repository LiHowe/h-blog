<template>
  <div class="leading-normal tracking-normal bg-green-50">
    <Header />
    <Nuxt class="layout-body container mx-auto " />
    <Footer class="border-red-400 bg-black"/>
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
