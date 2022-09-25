import {useStoreFile} from "~/composables/useFile"

export default defineEventHandler(async (event) => {
    const {hash, catches} = await useBody(event)

    if (hash) {
        await useStoreFile(useRuntimeConfig(), {hash, catches})
    }
})
