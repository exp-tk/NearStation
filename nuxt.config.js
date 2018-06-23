module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'NearStation',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'NearStation',
      },
      { property: 'fb:app_id', content: '460933694343730' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#0087C5' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['vue2-google-maps', 'vue-swipe'],
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  plugins: [
    '~/plugins/vue2-google-maps',
    { src: '~/plugins/vue-swipe', ssr: false },
  ],
  modules: ['@nuxtjs/pwa'],
  meta: {
    mobileAppIOS: true,
    name: 'NearStation',
    author: 'NearStation',
    description: '近くの駅を表示',
    theme_color: '#0087C5',
    lang: 'ja',
    twitterCard: 'summary_large_image',
    twitterSite: '@tinykitten8',
    twitterCreator: '@tinykitten8',
    ogHost: 'https://near.tinykitten.me',
  },
  manifest: {
    name: 'NearStation',
    short_name: 'NearStation',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    description: '近くの駅を表示',
    lang: 'ja',
  },
};
