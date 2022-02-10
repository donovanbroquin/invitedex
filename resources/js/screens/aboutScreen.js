import { container } from '../helpers'

export default function (globalEmitter) {
    container.innerHTML = ''

    const title = 'Invitédex'
    const text = 'Cette application ne collecte aucune information.'
    const textSecond =
        'Les cookies présents sont nécessaires au fonctionnement et ne contient aucune donnée personnelle'

    const aboutContainer = document.createElement('div')
    aboutContainer.classList.add('about__container')

    const titleEl = document.createElement('h1')
    titleEl.innerHTML = title

    const paragraph = document.createElement('p')
    paragraph.innerHTML = text

    const paragraphSecond = document.createElement('p')
    paragraphSecond.innerHTML = textSecond

    aboutContainer.appendChild(titleEl)
    aboutContainer.appendChild(paragraph)
    aboutContainer.appendChild(paragraphSecond)
    container.appendChild(aboutContainer)

    globalEmitter.on('ON_B_ABOUT', () =>
        globalEmitter.emit('CHANGE_SCREEN', { screen: 'menu' })
    )
}
