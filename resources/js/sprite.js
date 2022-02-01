const SPRITE_WIDTH = 60;
const SPRITE_HEIGHT = 60;
const BORDER_WIDTH = 8;
const SPACING_WIDTH = 4;

function spritePositionToImagePosition(row, col) {
    return {
        x: BORDER_WIDTH + col * (SPACING_WIDTH + SPRITE_WIDTH),
        y: BORDER_WIDTH + row * (SPACING_WIDTH + SPRITE_HEIGHT),
    };
}

export default function setSprite(canvas, row, col) {
    var context = canvas.getContext("2d");

    var spriteSheetURL = "/assets/sprites.png";
    var image = new Image();
    image.src = spriteSheetURL;
    image.crossOrigin = true;

    var position = spritePositionToImagePosition(row, col);
    image.onload = function () {
        context.drawImage(
            image,
            position.x,
            position.y,
            SPRITE_WIDTH,
            SPRITE_HEIGHT,
            0,
            0,
            SPRITE_WIDTH,
            SPRITE_HEIGHT
        );
    };
}
