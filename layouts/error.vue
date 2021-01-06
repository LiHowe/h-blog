<template>
  <div class="error-container">
    <h1 v-if="error.statusCode === 404">Not found</h1>
    <h1 v-else>{{ error }}</h1>
    <nuxt-link to="/">Home</nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  layout: 'default',
}
</script>
