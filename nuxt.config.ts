import {defineNuxtConfig} from "nuxt";

export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        // Notion
        notionProject: process.env.NOTION_PROJECT,
        notionToken: process.env.NOTION_TOKEN,

        // S3
        s3BucketName: process.env.S3_BUCKET_NAME,
        s3EndpointUrl: process.env.S3_ENDPOINT_URL,
        s3Region: process.env.S3_REGION,
        s3Id: process.env.S3_ID,
        s3Secret: process.env.S3_SECRET
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
