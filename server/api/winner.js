import {useGetWinner} from "~/composables/useFile";

export default defineEventHandler(async () => {
    return useGetWinner(useRuntimeConfig())
})
