const items = ['a_button', 'b_button', 'left', 'top', 'right', 'bottom']
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
}

export default function (globalEmitter, curr, old) {
    emitter = globalEmitter
    currentScreen = curr
    oldScreen = old

    deleteListeners()
    stopEmitter()
    updateControls()
}
