<template>
  <div :class="animationClass" :style="{background: '#' + color}"></div>
</template>

<script>
import state from '../state';

export default {
  name: 'line-panel',
  props: ['color'],
  data() {
    return {
      state: state.state,
    };
  },
  computed: {
    animationClass() {
      if (this.state.animationDisabled) {
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
