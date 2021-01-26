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
<style lang="scss" scoped>
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

.card-container {
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;

  &:hover {
    .card-content {
      transform: translateY(0);
    }
    .card-content p {
      opacity: 1;
    }
    .card-content, .card-content p {
      transition: 0.6s $hoverEasing;
    }
    .card-content:after {
      transition: 5s $hoverEasing;
      opacity: 1;
      transform: translateY(0);
    }
    .card-bg {
      transition:
        0.6s $hoverEasing,
        opacity 5s $hoverEasing;
      opacity: 0.8;
    }
    .card {
      transition:
        0.6s $hoverEasing,
        box-shadow 2s $hoverEasing;
      box-shadow:
        rgba(white, 0.2) 0 0 40px 5px,
        rgba(white, 1) 0 0 0 1px,
        rgba(black, 0.66) 0 30px 60px 0,
        inset #333 0 0 0 5px,
        inset white 0 0 0 6px;
    }
  }
}
.card {
  position: relative;
  flex: 0 0 240px;
  width: 240px;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow:
    rgba(black, 0.66) 0 30px 60px 0,
    inset #333 0 0 0 5px,
    inset rgba(white, 0.5) 0 0 0 6px;
  transition: 1s $returnEasing;
}

.card-bg {
  opacity: 0.5;
  position: absolute;
  top: -20px; left: -20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition:
    1s $returnEasing,
    opacity 5s 1s $returnEasing;
  pointer-events: none;
}

.card-content {
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(40%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);

  p {
    opacity: 0;
    text-shadow: rgba(black, 1) 0 2px 3px;
    transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  * {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 0%, rgba(#000, 0.6) 100%);
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(100%);
    transition: 5s 1s $returnEasing;
  }
}

.card-info h1 {
  font-size: 36px;
  font-weight: 700;
  text-shadow: rgba(black, 0.5) 0 10px 10px;
}
</style>
