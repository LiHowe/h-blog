<template>
  <div class="theme-switcher" :class="modeList[mode]" @click="changeMode">
    <svg-icon :icon-class="modeList[mode]" :size="iconSize" class="switcher-icon" />
  </div>
</template>
<script>
export default {
  name: "ThemeSwitcher",
  data: () => ({
    iconSize: 26,
    mode: 0,
    modeList: ['sun', 'moon']
  }),
  methods: {
    changeMode() {
      this.mode = (this.mode + 1) % 2
    }
  }
};
</script>
<style lang="scss" scoped>
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.theme-switcher {
  position: relative;
  height: $header-height;
  width: $header-height;
  display: inline-block;
  border-bottom: 2px solid black;
  cursor: pointer;
  .switcher-icon {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
  &.sun {
    .switcher-icon:hover {
      animation: rotate linear infinite 1s;
    }
  }
}
</style>
