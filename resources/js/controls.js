const items = ['a_button', 'b_button', 'left', 'top', 'right', 'bottom']
const keys = [
    { key: 'ArrowUp', event: 'top' },
    { key: 'ArrowDown', event: 'bottom' },
    { key: 'Enter', event: 'a_button' },
    { key: 'Escape', event: 'b_button' }
]

let emitter
let currentScreen
let oldScreen

function deleteListeners() {
    items.map(item => {
        const original = document.getElementById(`${item}_${oldScreen}`)
        const clone = original.cloneNode(true)

        original.parentElement.replaceChild(clone, original)
    })
}

function keyboardListener(e) {
    const foundKey = keys.find(key => key.key === e.key)

    if (!foundKey) return

    emitter.emit(
        `ON_${foundKey.event
            .split('_')[0]
            .toUpperCase()}_${currentScreen.toUpperCase()}`
    )
}

function stopEmitter() {
    items.forEach(item => {
        emitter.off(
            `ON_${item.split('_')[0].toUpperCase()}_${oldScreen.toUpperCase()}`
        )
    })
}

function updateControls() {
    items
        .map(item => {
            const el = document.getElementsByClassName(item)[0]

            el.id = `${item}_${currentScreen}`
            return item
        })
        .map(item => {
            document
                .getElementById(`${item}_${currentScreen}`)
                .addEventListener('click', () =>
                    emitter.emit(
                        `ON_${item
                            .split('_')[0]
                            .toUpperCase()}_${currentScreen.toUpperCase()}`
                    )
                )
        })

    document.addEventListener('keydown', keyboardListener)
}

export default function (globalEmitter, curr, old) {
    emitter = globalEmitter
    currentScreen = curr
    oldScreen = old

    document.onkeydown = null

    deleteListeners()
    stopEmitter()
    updateControls()
}
