const SPRITE_WIDTH = 60
const SPRITE_HEIGHT = 60
const BORDER_WIDTH = 8
const SPACING_WIDTH = 4

const sprites = {
    '1g': {
        width: 60,
        height: 60,
        borderV: 8,
        borderH: 8,
        spacingV: 4,
        spacingH: 4
    },
    '2g': {
        width: 56,
        height: 56,
        borderV: 19,
        borderH: 16,
        spacingV: 4,
        spacingH: 14
    }
}

function spritePositionToImagePosition(sprite, row, col) {
    return {
        x: sprite.borderV + col * (sprite.spacingV + sprite.width),
        y: sprite.borderH + row * (sprite.spacingH + sprite.height)
    }
}

export default function setSprite(canvas, gen, row, col) {
    const sprite = sprites[gen]
    const context = canvas.getContext('2d')
    const position = spritePositionToImagePosition(sprite, row, col)

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
