import {useStoreFile} from "~/composables/useFile"

export default defineEventHandler(async (event) => {
    const {hash, catches, id} = await useBody(event)

    if (hash) {
        await useStoreFile(useRuntimeConfig(), {hash, catches, id})
    }
})
