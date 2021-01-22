<template>
  <div class="logo-container flex-box flex-box__inline flex-box__center">
    <svg class="logo-svg" :class="{fill, stroke}" width="74" height="75" viewBox="0 0 74 75" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <path d="M48 30H26V10.4762L33.8003 2.6936C35.3117 1.18563 37.7409 1.13046 39.3192 2.56824L48 10.4762V30Z" />
        <path d="M26 38H48L48 57.5238L40.1997 65.3064C38.6883 66.8144 36.2591 66.8695 34.6808 65.4318L26 57.5238L26 38Z" />
        <path d="M18 19V49L5.82843 36.8284C4.26633 35.2663 4.26633 32.7337 5.82843 31.1716L18 19Z" />
        <path d="M56 49V19L68.1716 31.1716C69.7337 32.7337 69.7337 35.2663 68.1716 36.8284L56 49Z" />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.65686"
          y="1.52522"
          width="72.6863"
          height="72.9495"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
    <img v-if="showText" class="logo-text" src="/images/logo_text__dark.png" alt="logo_text">
  </div>
</template>
<script>
export default {
  props: {
    showText: {
      type: Boolean,
      default: true,
    },
    fill: {
      type: Boolean,
      default: true
    },
    stroke: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.animeSvg()
  },
  methods: {
    animeSvg() {
      this.$anime({
        targets: '.logo-h-line',
        opacity: [0, 1],
        duration: 5 * 1000,
        delay: (el, i) => i * 250,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
$logo-size: 40px;
.logo-container {
  user-select: none;
  height: $logo-size;
  line-height: $logo-size;
  .logo-svg {
    width: $logo-size;
    height: $logo-size;
    margin-right: $logo-size / 10;
    &.fill {
      g > path {
        fill: $color-primary;
      }
    }
    &.stroke {
      g > path {
        stroke: $color-primary;
      }
    }
  }
  .logo-text {
    height: $logo-size * 0.6;
  }
}
</style>
