<script>
import day from 'dayjs'
export default {
  name: 'Time',
  props: {
    t: {
      type: String | Date | Number,
      default: Date.now()
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },
  render(h) {
    return h('span', day(this.t).format(this.format))
  }
}
</script>
