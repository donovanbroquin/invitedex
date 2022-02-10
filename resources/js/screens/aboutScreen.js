import { container } from '../helpers'

export default function (globalEmitter) {
    container.innerHTML = ''

    const text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut dolor enim. Duis id ullamcorper velit. Praesent viverra tortor a sollicitudin sollicitudin. Sed eu nunc id arcu condimentum imperdiet vel non dolor'

    const paragraph = document.createElement('p')
    paragraph.innerHTML = text

    container.appendChild(paragraph)

    globalEmitter.on('ON_B_ABOUT', () =>
        globalEmitter.emit('CHANGE_SCREEN', { screen: 'menu' })
    )
}
