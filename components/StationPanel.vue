<template>
  <div class="panel">
    <LineDots />
    <p class="stationName">{{ station().station_name }}</p>
    <p class="stationAddr">{{ station().addr }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LineDots from '~/components/LineDots';

export default {
  components: {
    LineDots,
  },
  computed: {
    ...mapGetters(['station']),
  },
};
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
.stationAddr {
  color: #555;
}
</style>
