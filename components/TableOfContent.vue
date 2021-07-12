<template>
  <aside class="toc relative ">
    <ul class="sticky top-20 list-inside">
      <li class="text-lg list-none ml-3 leading-loose font-bold">
        <svg-icon icon-class="toc" class="mr-1 inline-block" />
        <span>目录</span>
      </li>
      <template v-if="toc && toc.length > 0">
        <li
          v-for="(item, index) in toc"
          :key="index"
          :class="getTailMargin(item)"
        >
          <a :href="`#${item.id}`" @click="current = item.id">{{ item.text }}</a>
        </li>
      </template>
      <li v-else>
        <span>没有内容</span>
      </li>
    </ul>
  </aside>
</template>
<script>
export default {
  name: 'TableOfContent',
  props: {
    toc: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data: () => ({
    current: ''
  }),
  mounted () {
    setTimeout(() => {
      this.observe()
    }, 0)
  },
  methods: {
    getTailMargin ({ depth, id }) {
      const marginMapping = {
        1: 'ml-0 text-lg',
        2: 'ml-3 text-base',
        3: 'ml-6 text-sm',
        4: 'ml-9 text-xs',
      }
      const res = [
        'title-item',
        marginMapping[depth]
      ]
      if (this.current === id) {
        res.push('current')
      }
      return res
    },
    observe () {
      const titles = document.querySelectorAll('.content-body h2[id], .content-body h3[id]')
      const ob = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.current = entry.target.id
          }
        })
      })
      titles.forEach(title => {
        ob.observe(title)
      })
    }
  }
}
</script>
<style lang="postcss" scoped>
.toc {
}
.title-item {
  @apply leading-8;
  &:hover {
    @apply text-gray-400 transition-colors duration-100;
  }
  &.current {
    @apply text-green-400
  }
}
</style>


