<template>
  <gmap-map
    :center="center"
    :zoom="13"
    :options="{disableDefaultUI: true}"
    style="width:100%;  height: 100vh"
  >
    <gmap-marker
      v-for="(m, index) in makers"
      :key="index"
      :position="m.position"
      @click="center=m.position"
    />
  </gmap-map>
</template>

<script>
export default {
  props: {
    station: {
      type: Object,
      required: true,
    },
  },
  computed: {
    makers() {
      return [
        {
          position: {
            lat: this.station.lat,
            lng: this.station.lon,
          },
        },
      ];
    },
    center() {
      return {
        lat: this.station.lat,
        lng: this.station.lon,
      };
    },
  },
};
</script>

<style scoped>
</style>
