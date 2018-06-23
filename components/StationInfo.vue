<template>
  <swipe :auto="0" :show-indicators="false" class="swipe">
    <swipe-item class="slide">
      <StationPanel />
    </swipe-item>
    <swipe-item v-for="line in station().lines" :key="line.line_cd" class="slide">
      <line-panel :line="line" />
    </swipe-item>
  </swipe>
</template>

<script>
import { mapGetters } from 'vuex';
import StationPanel from '~/components/StationPanel';
import LinePanel from '~/components/LinePanel';

export default {
  components: {
    StationPanel,
    LinePanel,
  },
  computed: {
    ...mapGetters(['station']),
  },
};
</script>

<style scoped>
.swipe {
  height: 120px;
  margin-top: -152px;
  background: #fff;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
