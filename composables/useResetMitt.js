export default () => {
    const {$mitt} = useNuxtApp()

    onBeforeUnmount(() => {
        $mitt.all.clear()
    })
}
