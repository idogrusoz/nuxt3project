// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',
  ssr: false,
  modules: ['@nuxtjs/tailwindcss'],
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      mapBoxToken: 'mySuperSecretToken',
      mapCenter: [4.3, 51.3],
    },
  },
});
