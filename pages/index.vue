<template>
  <section class="container">
    <div v-if="Object.keys(station()).length" class="loaded">
      <GoogleMaps :station="station()" />
      <StationInfo />
      <footer class="footer">
        <span class="policyLink" @click="$router.push('/privacy')">
          プライバシーポリシー
        </span>
      </footer>
    </div>
    <div v-else>
      <AppLoading />
    </div>
  </section>
</template>

<script>
import AppLoading from '~/components/AppLoading';
import GoogleMaps from '~/components/GoogleMaps';
import StationInfo from '~/components/StationInfo';
import { mapGetters } from 'vuex';

export default {
  components: {
    AppLoading,
    GoogleMaps,
    StationInfo,
  },
  computed: {
    ...mapGetters(['station']),
  },
};
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 8px;
}
.policyLink {
  text-align: center;
  width: auto;
  font-size: 0.75rem;
  cursor: pointer;
  position: relative;
  z-index: 1;
  text-align: center;
}
</style>
