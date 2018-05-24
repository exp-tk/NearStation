<template>
  <section class="container">
    <div class="loaded" v-if="Object.keys(station()).length">
      <GoogleMaps :station="station()" />
      <StationInfo />
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
    ...mapGetters([
      'station'
    ])
  }
}
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
html, body {
  font-family: sans-serif;
}
</style>
