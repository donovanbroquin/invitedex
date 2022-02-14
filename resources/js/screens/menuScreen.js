import { container } from '../helpers'

const entries = [
    { label: 'Invités', name: 'guests' },
    { label: 'Save the date', name: 'date' },
    { label: 'A propos', name: 'about' }
]

let currentEntry = 0

function build() {
    container.innerHTML = ''

    let entriesList = document.createElement('ul')
    entriesList.classList.add('list')

    entries
        .map(entry => {
            const el = document.createElement('li')
            el.classList.add('item')

            const entryContainer = document.createElement('div')
            entryContainer.classList.add('container')

            const chevron = document.createElement('div')
            chevron.classList.add('chevron')
            chevron.innerHTML = `<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 17.898C9 18.972 10.2649 19.546 11.0731 18.8388L17.3838 13.3169C18.1806 12.6197 18.1806 11.3801 17.3838 10.6829L11.0731 5.16108C10.2649 4.45388 9 5.02785 9 6.1018V17.898Z" fill="#212121"/>
        </svg>`

            // Create name text
            const name = document.createElement('div')
            name.appendChild(document.createTextNode(entry.label))

            entryContainer.appendChild(chevron)
            entryContainer.appendChild(name)

            el.appendChild(entryContainer)

            return el
        })
        .map((entry, idx) => {
            if (idx === currentEntry) entry.classList.add('current')

            return entry
        })
        .forEach(entry => {
            entriesList.appendChild(entry)
        })

    container.appendChild(entriesList)
}

function handleControls(emitter) {
    emitter.on('ON_BOTTOM_MENU', () => {
        if (entries.length - 1 > currentEntry) {
            currentEntry++
        } else {
            currentEntry = 0
        }

        build()
    })

    emitter.on('ON_TOP_MENU', () => {
        if (currentEntry > 0) {
            currentEntry--
        } else {
            currentEntry = entries.length - 1
        }

        build()
    })

    emitter.on('ON_A_MENU', () =>
        emitter.emit('CHANGE_SCREEN', {
            screen: entries[currentEntry].name
        })
    )
}
export default function (globalEmitter) {
    build()
    handleControls(globalEmitter)
}
