<template>
  <ul class="dots">
    <li v-for="line in station().lines" :key="line.line_cd" :style="{
      background: `#${lineColor(line)}`,
      width: '12px',
      height: '12px',
      borderRadius: '100%',
      boxShadow: `0 0 6px #${lineColor(line)}aa`
    }" class="dot" />
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['station']),
  },
  methods: {
    lineColor(line) {
      if (!line.line_color_c) {
        return '000000';
      }
      return line.line_color_c;
    },
  },
};
</script>

<style scoped>
.dots {
  display: flex;
  margin-bottom: 8px;
}
.dot {
  margin: 0 4px;
}
</style>
