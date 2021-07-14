<template>
  <div class="article max-w-6xl mx-auto relative bg-transparent">
    <div class="grid gap-24 grid-cols-1 lg:grid-cols-3">
      <section class="article-content dark:text-gray-300 col-span-1 lg:col-span-2">
        <div class="cover-image-wrapper h-60">
          <img class="cover-image" :src="article.coverImage" alt="">
        </div>
        <p class="article-title">{{ article.title }}</p>
        <p class="article-createTime">
          {{ article.date }}
        </p>
        <p class="article-description">{{ article.description }}</p>
        <nuxt-content class="content-body" :document="article" />
      </section>
      <table-of-content class="lg:col-span-1" :toc="article.toc" />
    </div>
    <div class="flex">
      <NuxtLink class="mr-auto" v-if="prev" :to="{ name: `articles-slug___${$i18n.locale}`, params: { slug: prev.slug }, query: { t: prev.category }}">
        上一篇: {{ prev.title }}
      </NuxtLink>

      <NuxtLink class="ml-auto" v-if="next" :to="{ name: `articles-slug___${$i18n.locale}`, params: { slug: next.slug}, query: { t: next.category }}">
        下一篇: {{ next.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import CopyButton from '@/components/CopyButton'
import BackToTop from '@/components/BackToTop'
import Vue from 'vue'

export default {
  async asyncData({ $content, params, app, error, query }) {
    const path = query.t
    const article = await $content(`${app.i18n.locale}/${path}`, params.slug).fetch().catch((err) => {
      error({ statusCode: 404, message: 'Page not found' })
    })
    const [prev, next] = await $content(`${app.i18n.locale}/${path}`)
      .only(['title', 'slug', 'category'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()
    return {
      prev,
      next,
      article
    }
  },
  data: () => ({
    BTT: null
  }),
  mounted () {
    setTimeout(() => {
      // 获取全部代码块
      const blocks = document.querySelectorAll('.nuxt-content-highlight')
      blocks.forEach(block => {
        block.classList.add('relative', 'group')
        const Button = Vue.extend(CopyButton)
        const component = new Button().$mount()
        block.appendChild(component.$el)
        block.appendChild(this.genHighlightType(block))
      })
    }, 100)
    setTimeout(() => {
      const BTT = Vue.extend(BackToTop)
      const bttEl = new BTT().$mount()
      this.BTT = bttEl
      document.body.appendChild(bttEl.$el)
    }, 100)
  },
  beforeDestroy () {
    this.BTT.$destroy()
  },
  methods: {
    // 获取高亮代码块的语言
    genHighlightType (block) {
      const preEl = block.firstElementChild
      if (!preEl) return null
      const codeLang = preEl.className.match(/language-(.*)/)[1]
      const codeLangEl = document.createElement('span')
      codeLangEl.classList.add(
        'absolute',
        'right-1',
        'top-1',
        'float-right',
        'text-xs',
        'font-thin',
        'tracking-wide',
        'select-none',
        'text-gray-100'
      )
      codeLangEl.innerText = codeLang
      return codeLangEl
    }
  }
}
</script>
<style lang="postcss" scoped>
.cover-image-wrapper {
  @apply relative w-full overflow-hidden rounded-lg object-center object-scale-down left-0 z-0;
}
.cover-image {
  @apply w-full h-full;
}
.article-content {
  @apply
    relative
    z-10
    rounded-lg
    p-8
    leading-loose;
}

.article-title {
  @apply
    text-2xl
    p-0
    text-center
    font-bold
    leading-loose
    my-2;
}
.content-body {
  h2 {
    @apply
      leading-loose
      border-b
      border-gray-300
      text-xl
      my-4
      text-center
      tracking-wide
      font-bold;
  }
  h3 {
    @apply
      text-lg
      leading-normal
      my-3
      font-bold;
  }
  a:not([aria-hidden]) {
    @apply
      text-green-400
      mx-2
      hover:text-green-500
      transition-colors
      duration-150;
  }
  pre {
    @apply
      rounded-md
      font-mono;
    code {
      @apply
      leading-none
      text-xs;
    }
  }
  ul {
    @apply
      pl-4;
    li {
      @apply list-disc ml-4;
      ul {
        li {
          list-style: circle;
        }
      }
    }
  }
  ol {
    li {
      @apply list-decimal list-inside;
      &::marker {
        font-weight: bold;
      }
    }
  }
  table {
    @apply w-full;
    tr {
       td {
         @apply border-b border-gray-300 border-l;
         &:last-child {
           @apply border-r;
         }
       }
    }
    thead {
      tr {
        @apply
          bg-gray-300
          text-gray-600;
        th {
          @apply
            border-r
            border-gray-300
            ;
        }
      }
    }
    tbody {
      tr {
        &:hover {
          @apply bg-gray-200 bg-opacity-50 transition-colors duration-200;
        }
        td {
          @apply px-4 text-sm leading-loose;
        }
      }
    }
  }
  code:not(pre code) {
    @apply border rounded bg-gray-100 text-gray-800 px-2 py-0.5 mx-1 text-sm;
  }
}

</style>
