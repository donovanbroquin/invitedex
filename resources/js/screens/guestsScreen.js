import chunk from 'lodash.chunk'
import padstart from 'lodash.padstart'
import { container } from '../helpers'

let guests
let currentChunkId = 0
let currentGuestId = 0

function backControlMutation() {
    if (currentChunkId > 0 && currentGuestId === 0) {
        currentChunkId--
        currentGuestId = 5

        draw()
    } else if (currentGuestId > 0) {
        currentGuestId--
        draw()
    }
}

function nextControlMutation() {
    if (guests.length > currentChunkId) {
        if (currentGuestId === 5) {
            currentChunkId++
            currentGuestId = 0

            draw()
        } else if (currentGuestId < guests[currentChunkId].length - 1) {
            currentGuestId++
            draw()
        }
    }
}

function buildItem(guest) {
    const el = document.createElement('li')

    // Create guest idx div
    const id = document.createElement('div')
    id.classList.add('guest__id')
    id.innerHTML = padstart(guest.id, 3, 0)

    // Create current && name container
    const container = document.createElement('div')
    container.classList.add('guest__container')

    // Create chevron
    const chevron = document.createElement('div')
    chevron.classList.add('guest__chevron')
    chevron.innerHTML = `<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 17.898C9 18.972 10.2649 19.546 11.0731 18.8388L17.3838 13.3169C18.1806 12.6197 18.1806 11.3801 17.3838 10.6829L11.0731 5.16108C10.2649 4.45388 9 5.02785 9 6.1018V17.898Z" fill="#212121"/>
  </svg>`

    // Create name text
    const name = document.createElement('div')
    name.appendChild(document.createTextNode(guest.name))

    // Add chevron && name in container
    container.appendChild(chevron)
    container.appendChild(name)

    // Compose element
    el.classList.add('guest__item')
    el.appendChild(id)
    el.appendChild(container)

    return el
}

function draw() {
    container.innerHTML = ''
    let guestsScreen = document.createElement('ul')

    guestsScreen.classList.add('guests')

    guests[currentChunkId]
        .map(buildItem)
        .map((guest, idx) => {
            if (idx === currentGuestId) guest.classList.add('current')

            return guest
        })
        .forEach(guest => guestsScreen.appendChild(guest))

    container.appendChild(guestsScreen)
}

function handleControls(emitter) {
    emitter.on('ON_TOP_GUESTS', backControlMutation)
    emitter.on('ON_BOTTOM_GUESTS', nextControlMutation)

    emitter.on('ON_A_GUESTS', () =>
        emitter.emit('CHANGE_SCREEN', {
            screen: 'guest',
            params: { guest: guests[currentChunkId][currentGuestId] }
        })
    )

    emitter.on('ON_B_GUESTS', () => {
        emitter.emit('CHANGE_SCREEN', { screen: 'menu' })
    })
}

export default function (globalEmitter, params) {
    guests = chunk(params.guests, 4)

    draw()
    handleControls(globalEmitter)
}
