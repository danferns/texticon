export default function TextIcon(name, userOptions) {
    let options = {
        font: "128px sans-serif",
        size: 256,
        circle: false,
        randomSeed: 0,
        background: {
            saturation: 0.5,
            lightness: 0.8,
            alpha: 1,
        },
        foreground: {
            saturation: 0.5,
            lightness: 0.5,
            alpha: 1,
        },
    };

    recursiveMerge(userOptions, options)

    const bg = options.background;
    const fg = options.foreground;

    const initials = getInitials(name);
    const hue = getHue(name, options.randomSeed);

    // setting up the canvas
    const canvas = document.createElement("canvas");
    const devicePixelRatio = Math.max(window.devicePixelRatio, 1);
    const canvasSize = options.size;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const ctx = canvas.getContext("2d");
    ctx.scale(devicePixelRatio, devicePixelRatio);

    // applying the background
    if (options.circle) ctx.arc(canvasSize/2, canvasSize/2, canvasSize/2, 0, 2 * Math.PI, false);
    else ctx.rect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = `hsla(${hue}, 
        ${bg.saturation * 100}%, 
        ${bg.lightness * 100}%, 
        ${bg.alpha * 100}%)`;
    ctx.fill();

    // setting up the text
    ctx.font = options.font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // calculating the values used for visually centering the text
    const textMetrics = ctx.measureText(initials);
    const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
    const baselineOffset = textMetrics.actualBoundingBoxAscent;

    const textX = canvasSize / 2;
    const textY = (canvasSize - textHeight) / 2 + baselineOffset;
    const maxWidth = canvasSize * 0.9;

    // applying the text
    ctx.fillStyle = `hsla(${hue}, 
        ${fg.saturation * 100}%, 
        ${fg.lightness * 100}%, 
        ${fg.alpha * 100}%)`;
    ctx.fillText(initials, textX, textY, maxWidth);

    return canvas.toDataURL("image/png");
}

function getInitials(name) {
    let initials = "";
    for (const word of name.split(" ")) initials += word[0];
    return initials;
}

function getHue(name, seed = 0) {
    let number = 0;
    for (let i = 0; i < name.length; i++) {
        number += name.charCodeAt(i);
        number *= name.charCodeAt(i);
        number += seed;
    }
    return number % 360;
}

function recursiveMerge(from, to) {
    for (const prop of Object.keys(from)) {
        if (typeof from[prop] === 'object' && from[prop] !== null) {
            recursiveMerge(from[prop], to[prop]);
        } else {
            to[prop] = from[prop];
        }
    }
}