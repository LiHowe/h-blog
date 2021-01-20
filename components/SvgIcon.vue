<template>
  <svg :class="svgClass" :style="iconStyle" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    revert: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 拼接font-icon图标名称
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    iconStyle () {
      const res = {
        fontSize: this.size || null,
        color: this.color || null
      }
      if (this.revert) {
        res.transform = 'rotate(180deg)'
      }
      return res
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
