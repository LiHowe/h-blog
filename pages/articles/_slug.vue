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
    console.log(article)
    return {
      prev,
      next,
      article
    }
  },
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
      underline
      text-blue-500
      mx-2;
  }
  pre {
    @apply
      rounded-md
      font-mono
      text-sm
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
          bg-gray-500
          dark:text-gray-200
          ;
        th {
          @apply
            border-r
            dark:border-gray-300
            ;
        }
      }
    }
    tbody {
      tr {
        &:hover {
          @apply bg-gray-300 bg-opacity-50 transition-colors duration-200;
        }
        td {
          @apply px-4 text-sm leading-loose;
        }
      }
    }
  }
  code:not(pre code) {
    @apply border rounded bg-gray-300 text-gray-800 px-2 py-0.5 mx-1 text-sm;
  }
}
</style>
