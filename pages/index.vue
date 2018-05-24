<template>
  <section class="container">
    <div class="loaded" v-if="Object.keys(station()).length">
      <GoogleMaps :station="station()" />
      <StationInfo />
      <p class="policyLink" @click="$router.push('/privacy')">
        プライバシーポリシー
      </p>
    </div>
    <div v-else>
      <AppLoading />
    </div>
  </section>
</template>

<script>
import AppLoading from "~/components/AppLoading";
import GoogleMaps from "~/components/GoogleMaps";
import StationInfo from "~/components/StationInfo";
import { mapGetters } from "vuex";

export default {
  components: {
    AppLoading,
    GoogleMaps,
    StationInfo
  },
  computed: {
    ...mapGetters(["station"])
  }
};
</script>

<style scoped>
.policyLink {
  width: 100%;
  text-align: center;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 12px;
  font-size: .75rem;
}
</style>
