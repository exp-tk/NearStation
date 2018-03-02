<template>
  <div class="app">
    <panel-station></panel-station>
    <button-share></button-share>
    <footer>
        <a href="https://github.com/TinyKitten/NearStation" target="_blank" class="fork" rel="noopener">
            Fork me on Github
        </a>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PanelStation from './components/Station';
import ButtonShare from './components/Share';

export default {
  name: 'app',
  components: {
    PanelStation,
    ButtonShare,
  },
  computed: {
    ...mapGetters([
      'position',
    ]),
  },
  methods: {
    ...mapActions([
      'WATCH_POSITION',
      'CONNECT_WS',
      'LISTEN_STATION',
      'DOWNLOAD_DIC',
    ]),
  },
  async mounted() {
    Promise.all([
      await this.WATCH_POSITION(),
      await this.CONNECT_WS(),
      this.LISTEN_STATION(),
      this.DOWNLOAD_DIC(),
    ]);
  },
};
</script>

<style lang="scss">
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline; }

/* HTML5 display-role reset for older browsers */

article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  display: block; }

body {
  line-height: 1; }

ol, ul {
  list-style: none; }

blockquote, q {
  quotes: none; }

blockquote {
  &:before, &:after {
    content: '';
    content: none; } }

q {
  &:before, &:after {
    content: '';
    content: none; } }

table {
  border-collapse: collapse;
  border-spacing: 0; }

  html, body {
    font-family:-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI","Noto Sans Japanese","ヒラギノ角ゴ ProN W3", Meiryo, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f5f5f5;
    overflow: hidden;

    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
  }

  footer {
    position: absolute;
    bottom: 24px;
    width: 100vw;
    text-align: center;
    a {
        color: #555;
    }
}

</style>
