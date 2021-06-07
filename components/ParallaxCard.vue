<template>
  <div class="card-container"
    @mousemove="handleMoseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="card">
      <div class="card-bg" :style="bgTransform"></div>
      <div class="card-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ParallaxCard',
  props: {
    cardImage: String
  },
  data: () => ({
    w: 0,
    h: 0,
    mouseX: 0,
    mouseY: 0,
    delay: null
  }),
  computed: {
    xRate() {
      return this.mouseX / this.w
    },
    yRate() {
      return this.mouseY / this.h
    },
    cardTransform() {
      const rx = this.xRate * 30
      const ry = this.yRate * -30
      return {
        transform: `rotate(${ry}deg, ${rx}deg)`
      }
    },
    bgTransform() {
      const tx = this.xRate * -40
      const ty = this.yRate * -40
       return {
        transform: `translate3d(${tx}, ${ty}, 0)`
      }
    },
    bgImgae() {
      return {
        background: `url(${this.cardImage})`
      }
    }
  },
  mounted() {
    this.h = this.$el.offsetHeight
    this.w = this.$el.offsetWidth
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$el.offsetLeft - this.w / 2
      this.mouseX = e.pageY - this.$el.offsetTop - this.w / 2
    },
    handleMouseEnter() {
      clearTimeout(this.delay)
    },
    handleMouseLeave() {
      this.delay = setTimeout(() => {
        this.mouseX = 0
        this.mouseY = 0
      }, 1000)
    }
  }
}
</script>
