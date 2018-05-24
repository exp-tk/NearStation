import Vue from 'vue';
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCyE-d4T0C7Xm7AeJdIRErALt0LJwOg5nE',
    libraries: 'places' // necessary for places input
  }
});
