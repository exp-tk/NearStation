<template>
  <div :class="animationClass" :style="{background: '#' + _color}"></div>
</template>

<script>
export default {
  name: 'line-panel',
  props: ['color'],
  computed: {
    _color() {
      if (this.color === '') return '555555';
      return this.color;
    },
    animationClass() {
      const animationDisabled = this.$store.getters.animationDisabled();
      if (animationDisabled) {
        return 'line';
      }
      return 'line animated slideInRight';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line {
    width: 100vw;
    height: 32px;
    margin-bottom: 12px;
    box-shadow: 0 0 1px rgba(0, 0, 0, .25);
}
</style>
