<template>
      <gmap-map
      :center="center"
      :zoom="13"
      style="width:100%;  height: 100vh"
      :options="{disableDefaultUI: true}"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in makers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
</template>

<script>
export default {
  props: {
    station: {
      type: Object,
      required: true
    }
  },
  computed: {
    makers() {
      return [
        {
          position: {
            lat: this.station.lat,
            lng: this.station.lon
          },
        }
      ];
    },
    center() {
      return {
        lat: this.station.lat,
        lng: this.station.lon,
      }
    }
  }
};
</script>

<style scoped>
</style>
