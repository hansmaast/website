// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxt/eslint',
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    'shadcn-nuxt',
  ],
  shadcn: {
    /**
       * Prefix for all the imported component
       */
    prefix: '',
    /**
       * Directory that the component lives in.
       * @default "./components/ui"
       */
    componentDir: './components/ui',
  },
})
