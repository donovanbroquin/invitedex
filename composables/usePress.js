export default function (button) {
    const {$mitt} = useNuxtApp()

    window.navigator.vibrate(25);

    $mitt.emit(`${button.toUpperCase()}_PRESS`)
}
