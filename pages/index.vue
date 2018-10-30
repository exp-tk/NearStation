<template>
  <section class="container">
    <a href="https://github.com/you"><img
      style="position: absolute; top: 0; left: 0; border: 0;"
      src="https://s3.amazonaws.com/github/ribbons/forkme_left_white_ffffff.png"
      alt="Fork me on GitHub"></a>
    <div
      v-if="station"
      class="loaded"
    >
      <app-station-info :station="station" />
    </div>
    <app-loading v-else />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import AppStationInfo from '~/components/AppStationInfo.vue';
import AppLoading from '~/components/AppLoading.vue';

export default {
  components: {
    AppStationInfo,
    AppLoading,
  },
  computed: {
    ...mapGetters(['station']),
  },
};
</script>

<style scoped>
</style>
