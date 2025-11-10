export default defineNuxtConfig({
  app: {
    head: {
      title: "Test Task Varaev",
      meta: [
        {
          name: "description",
          content: "A car catalog.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  runtimeConfig: {
    carDataUrl: process.env.CAR_DATA_URL,
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@pinia/nuxt", "@nuxt/image"],
  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },
});
