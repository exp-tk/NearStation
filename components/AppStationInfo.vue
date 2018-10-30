<template>
  <section class="station">
    <h1 class="name">{{ station.station_name }}</h1>
    <h2 class="address">{{ station.addr }}</h2>
    <ul class="dots">
      <li
        v-for="line of station.lines"
        :title="line.line_name"
        :key="line.line_cd"
        :style="dotStyle(line.line_color_c)"
        class="dot" />
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    station: {
      type: Object,
      required: true,
    },
  },
  methods: {
    dotStyle(dotColor) {
      const _dotColor = dotColor === '' ? 'fff' : dotColor;
      return {
        background: `#${_dotColor}`,
        boxShadow: `0 0 6px #${_dotColor}`,
      };
    },
  },
};
</script>

<style scoped>
@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.station {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.name {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 12px;
}
.address {
  margin-bottom: 32px;
}
.dots {
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
}
.dot {
  background: #fff;
  width: 14px;
  height: 14px;
  border-radius: 7px;
  margin-right: 12px;
  opacity: 0;
  animation: show 1s ease forwards;
}
.dot:last-child {
  margin-right: 0;
}
</style>
