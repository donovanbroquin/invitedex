import { container } from '../helpers'

let emitter = null

function cleanScreen(loader, content) {
    clearInterval(loader)

    content.innerHTML = 'Chargement terminé'

    setTimeout(() => {
        emitter.emit('CHANGE_SCREEN', { screen: 'menu' })
    }, 600)
}

export default function (emitterInstance) {
    emitter = emitterInstance
    container.innerHTML = `<div id="boot">Chargement</div>`

    const endAfter = Math.floor(Math.random() * 10) * 900
    const content = document.querySelector('#boot')
    const loader = setInterval(() => {
        if (content.innerHTML === 'Chargement...')
            return (content.innerHTML = 'Chargement.')

        return (content.innerHTML = content.innerHTML + '.')
    }, 800)

    setTimeout(() => cleanScreen(loader, content), endAfter)
}
