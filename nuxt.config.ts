// https://nuxt.com/docs/api/configuration/nuxt-config
import {fileURLToPath, URL} from "node:url";

export default defineNuxtConfig({
    devtools: {enabled: true},
    ssr: true,
    vite: {
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./', import.meta.url))
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
              @import "@/assets/scss/_variables.scss";
              @import "@/assets/scss/_mixins.scss";
            `
                }
            }
        }
    }
})
