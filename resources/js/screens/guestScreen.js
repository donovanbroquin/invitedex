import padstart from 'lodash.padstart'
import { container } from '../helpers'
import setSprite from '../sprite'

let guest

function createMainContainer(children) {
    const mainContainer = document.createElement('div')
    mainContainer.classList.add('guest__detail__screen')

    children.map(child => mainContainer.append(child))

    return mainContainer
}

function createChars() {
    // Create characteristics container and elements
    const charContainer = document.createElement('div')
    charContainer.classList.add('guest__detail__char')

    const charLeft = document.createElement('div')
    charLeft.classList.add('guest__left')

    const sprite = document.createElement('canvas')
    sprite.setAttribute('width', '56px')
    sprite.setAttribute('height', '56px')

    setSprite(sprite, guest.sprite[0], guest.sprite[1])

    const id = document.createElement('div')
    id.innerHTML = `<div><span class="id__prefix">No.</span> ${padstart(
        guest.id,
        3,
        0
    )}</div>`

    charLeft.appendChild(sprite)
    charLeft.appendChild(id)

    const charRight = document.createElement('div')
    charRight.classList.add('guest__right')

    const firstName = document.createElement('div')
    firstName.classList.add('guest__firstname')
    firstName.appendChild(document.createTextNode(guest.name.split(' ')[0]))

    const relation = document.createElement('div')
    relation.classList.add('guest__relation')
    relation.appendChild(document.createTextNode(guest.relation))

    charRight.appendChild(firstName)
    charRight.appendChild(relation)

    charContainer.appendChild(charLeft)
    charContainer.appendChild(charRight)

    return charContainer
}

function createDescription() {
    const desc = document.createElement('p')

    desc.classList.add('guest__detail__desc')
    desc.appendChild(document.createTextNode(guest.description))

    return desc
}

function handleControls(emitter) {
    emitter.on('ON_B_GUEST', () => {
        emitter.emit('CHANGE_SCREEN', { screen: 'guests' })
    })
}

export default function (globalEmitter, params) {
    guest = params.guest

    container.appendChild(
        createMainContainer([createChars(), createDescription()])
    )

    handleControls(globalEmitter)
}
