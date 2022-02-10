export function listenControls(emitter) {
    document
        .getElementById('top')
        .addEventListener('click', () => emitter.emit('ON_TOP'))
    document
        .getElementById('bottom')
        .addEventListener('click', () => emitter.emit('ON_BOTTOM'))

    document
        .getElementById('a-button')
        .addEventListener('click', () => emitter.emit('ON_A'))
    document
        .getElementById('b-button')
        .addEventListener('click', () => emitter.emit('ON_B'))

    document.addEventListener('keydown', e => {
        console.log('controls', e)
        switch (e.key) {
            case 'ArrowUp':
                emitter.emit('ON_TOP')
                break
            case 'ArrowDown':
                emitter.emit('ON_BOTTOM')
                break
            case 'Enter':
                emitter.emit('ON_A')
                break
            case 'Escape':
                emitter.emit('ON_B')
                break
            default:
                break
        }
    })
}

export function stopControls(emitter) {
    emitter.off('ON_TOP')
    emitter.off('ON_BOTTOM')

    emitter.off('ON_A')
    emitter.off('ON_B')
}

export function toggleControls(emitter) {
    stopControls(emitter)
    // emitter.all.clear()
    listenControls(emitter)
}
