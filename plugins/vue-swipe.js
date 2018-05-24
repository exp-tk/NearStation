require('vue-swipe/dist/vue-swipe.css');
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vue-swipe';

if (process.browser) {
  Vue.component('swipe', Swipe);
  Vue.component('swipe-item', SwipeItem);
}
