<template>
  <div class="article container relative bg-gray-50">
    <div class="cover-image-wrapper h-60">
      <img class="cover-image" :src="article.coverImage" alt="">
    </div>
    <article class="article-content dark:text-gray-700 2xl:max-w-screen-xl">
      <p class="article-title">{{ article.title }}</p>
      <p class="article-createTime">
        {{ article.date }}
      </p>
      <p class="article-description">{{ article.description }}</p>
      <nuxt-content class="content-body" :document="article" />
    </article>
    <div>
      <NuxtLink v-if="prev" :to="{ name: `articles-slug___${$i18n.locale}`, params: { slug: prev.slug }, query: { t: prev.category }}">
        上一篇: {{ prev.title }}
      </NuxtLink>

      <NuxtLink v-if="next" :to="{ name: `articles-slug___${$i18n.locale}`, params: { slug: next.slug}, query: { t: next.category }}">
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

    return {
      prev,
      next,
      article
    }
  },
}
</script>
<style lang="postcss" scoped>
.article {
  @apply p-4 rounded-lg shadow-md text-base;
}
.dark .article {
 background-color: #DCD9D4;
 background-image: linear-gradient(to bottom, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), radial-gradient(at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.50) 50%);
 background-blend-mode: soft-light,screen;
}
.cover-image-wrapper {
  @apply relative w-full overflow-hidden rounded-lg object-center object-scale-down left-0 z-0;
}
.cover-image {
  @apply w-full h-full;
}
.article-content {
  @apply
    relative
    -mt-12
    z-10
    rounded-lg
    mx-10
    p-8
    bg-gray-200
    leading-loose
    shadow-md;
}

.article-title {
  @apply
    text-2xl
    p-0
    text-center
    font-bold
    m-0;
}
.content-body {
  h2 {
    @apply
      leading-loose
      border-b
      border-gray-300
      text-xl
      my-4
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
          bg-gray-300;
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
    @apply border rounded bg-gray-300 px-2 py-0.5 mx-1;
  }
}
</style>
