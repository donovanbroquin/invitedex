export default function (button) {
    const {$mitt} = useNuxtApp()

    $mitt.emit(`${button.toUpperCase()}_PRESS`)
}
