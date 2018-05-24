<template>
  <swipe class="swipe" :auto="0" :showIndicators="false">
  <swipe-item class="slide">
    <StationPanel />
  </swipe-item>
  <swipe-item class="slide" v-for="line in station().lines" :key="line.line_cd">
    <line-panel :line="line" />
  </swipe-item>
</swipe>
</template>

<script>
import { mapGetters } from 'vuex';
import StationPanel from '~/components/StationPanel';
import LinePanel from '~/components/LinePanel';

export default {
  computed: {
    ...mapGetters([
      'station',
    ])
  },
  components: {
    StationPanel,
    LinePanel
  }
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
  }
</style>
