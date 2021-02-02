<template>
  <div>
    this is about code
    <pre>
      {{ list }}
    </pre>
  </div>
</template>
<script>
export default {
  data: () => ({
    list: null
  }),
  async asyncData({ $axios }) {

  /**
   * @param {path: string, mode: string, type: string, sha: string } list
   */
    const generateTree = (data) => {
      const list = []
      const tempMap = {}
      data.forEach(item => {
        if (item.type === 'blob') {
          if (/\w+.md/.test(item.path)) {
            const pathArr = item.path.split('/')
            const fileName = pathArr.pop()
            const existItem = list[tempMap[fileName]]
            let res = {}
            res = existItem || {}
            res.id = item.sha
            res.name = fileName
            res.tags = pathArr
            res.path = item.path
            tempMap[fileName] = list.length
            if (!existItem) {
              list.push(res)
            }
          }
        }
      })
      console.log(list)
      return list
    }

    const res = await $axios.get('https://api.github.com/repos/LiHowe/Note/git/trees/master?recursive=1')
    return { list: generateTree(res.data.tree) }
  }
}
</script>
