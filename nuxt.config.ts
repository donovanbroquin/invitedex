import {defineNuxtConfig} from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        notionProject: process.env.NOTION_PROJECT,
        notionToken: process.env.NOTION_TOKEN,
    },
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt',],
    build: {
        transpile: [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
        ]
    },
    head: {
        meta: [
            {name: "viewport", content: "width=device-width, user-scalable=no"}
        ]
    }
});
