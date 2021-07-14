<template>
  <button class="back-to-top" @click="toTop">
    <svg-icon icon-class="top" size="20"></svg-icon>
  </button>
</template>
<script>
export default {
  mounted () {
    window.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollListener)
  },
  methods: {
    toTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    scrollListener (e) {
      if (window.scrollY > 500) {
        this.$el.classList.add('show')
      } else {
        this.$el.classList.remove('show')
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.back-to-top {
  @apply
    w-10 h-10
    flex justify-center items-center
    text-base
    fixed bottom-10 right-10
    opacity-0 outline-none
    bg-gray-100 text-gray-700 rounded-md shadow-md
    hover:transform hover:scale-110 duration-200;
  &.show {
    @apply
    opacity-100;
  }
}
.dark .back-to-top {
  @apply
    bg-gray-700
    text-gray-200
}
</style>

