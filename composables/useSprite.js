const sprites = {
    '1g': {
        width: 60,
        height: 60,
        border: 8,
        spacing: 4
    },
    '2g': {
        width: 56,
        height: 56,
        border: 8,
        spacing: 14
    }
}

function spritePositionToImagePosition(gen, sprite, row, col) {
    return {
        x:
            sprite.border +
            col * (sprite[gen === '1g' ? 'spacing' : 'border'] + sprite.width),
        y:
            sprite[gen === '1g' ? 'border' : 'spacing'] +
            row * (sprite.spacing + sprite.height)
    }
}

export default function useSprite(canvas, gen, row, col) {
    const sprite = sprites[gen]
    const context = canvas.getContext('2d')
    const position = spritePositionToImagePosition(gen, sprite, row, col)

    // Clear previous sprite to avoid overlay
    context.clearRect(0, 0, 56, 56)

    // Use sprite image to draw
    context.drawImage(
        document.getElementById(`sprites-${gen}`),
        position.x,
        position.y,
        sprite.width,
        sprite.height,
        0,
        0,
        sprite.width,
        sprite.height
    )
}
