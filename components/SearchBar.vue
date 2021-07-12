<template>
  <div class="search-bar">
    <input type="search" v-model="search" autocomplete="off" />
  </div>
</template>
<script>
export default {
  name: 'SearchBar',
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data: () => ({
    query: ''
  }),
  watch: {
    async search(q) {
      if (!q) return
      const results = this.content('articles')
        .sortBy('createdAt', 'asc')
        .search(q)
        .fetch()
      this.$emit('on-search', results)
    }
  }
}
</script>

