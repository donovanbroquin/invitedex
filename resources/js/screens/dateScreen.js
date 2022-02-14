import { container } from '../helpers'

export default function (globalEmitter) {
    container.innerHTML = ''

    const title = 'Save the date'
    const text = 'Le 01/10/2022'
    const textSecond = "À L'Avallonnaise, 12 Rue Carnot, Avallon 89200"

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

    globalEmitter.on('ON_B_DATE', () =>
        globalEmitter.emit('CHANGE_SCREEN', { screen: 'menu' })
    )
}
