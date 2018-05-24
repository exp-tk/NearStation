<template>
  <div class="panel" :style="{
    borderTop: `8px solid #${lineColor}`
  }">
    <p class="stationName">{{line.line_name}}</p>
    <p class="delayInfo">遅延情報未実装</p>
  </div>
</template>

<script>
export default {
  props: {
    line: {
      required: true,
      type: Object,
    }
  },
  computed: {
    lineColor() {
      if (!this.line.line_color_c) {
        return '000000';
      }
      return this.line.line_color_c;
    }
  }
}
</script>

<style scoped>
.panel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  flex-direction: column;
}
.stationName {
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 4px;
}
.delayInfo {
  color: #555;
}
</style>
