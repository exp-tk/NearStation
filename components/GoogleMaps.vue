<template>
      <gmap-map
      :center="{
        lat: this.station.lat,
        lng: this.station.lon,
      }"
      :zoom="13"
      style="width:100%;  height: 100vh"
      :options="{disableDefaultUI: true}"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in [{
          position: {
            lat: this.station.lat,
            lng: this.station.lon,
          }
        }]"
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
  data() {
    return {
      places: [],
      currentPlace: null
    };
  }
};
</script>

<style scoped>
</style>
