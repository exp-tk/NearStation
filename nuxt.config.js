const meta = {
  title: 'NearStation',
  description: '近くの駅を表示します',
  color: '#0087C5',
  url: 'https://near.tinykitten.me',
  twitter: '@tinykitten8',
};

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: meta.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: meta.description },
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
  loading: { color: meta.color },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
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
  modules: ['@nuxtjs/pwa'],
  meta: {
    mobileAppIOS: true,
    name: meta.title,
    author: meta.title,
    description: meta.description,
    theme_color: meta.color,
    lang: 'ja',
    twitterCard: 'summary_large_image',
    twitterSite: meta.twitter,
    twitterCreator: meta.twitter,
    ogHost: meta.url,
  },
  manifest: {
    name: meta.title,
    short_name: meta.title,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    description: meta.description,
    lang: 'ja',
  },
};
