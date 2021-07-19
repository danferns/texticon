export default function TextIcon(name, userOptions) {
    const options = {
        font: "128px sans-serif",
        size: 256,
        circle: false,
        randomSeed: 0,
        ...userOptions,
    };

    const initials = getInitials(name);
    const hue = getHue(name, options.randomSeed);

    const canvas = document.createElement("canvas");

    const devicePixelRatio = Math.max(window.devicePixelRatio, 1);
    const canvasSize = options.size * devicePixelRatio;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const ctx = canvas.getContext("2d");
    ctx.scale(devicePixelRatio, devicePixelRatio);

    if (options.circle) ctx.arc(canvasSize/2, canvasSize/2, canvasSize/2, 0, 2 * Math.PI, false);
    else ctx.rect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = `hsla(${hue}, 50%, 80%, 100%)`;
    ctx.fill();

    ctx.font = options.font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textMetrics = ctx.measureText(initials);
    const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

    const baselineOffset = textMetrics.actualBoundingBoxAscent;

    const textX = canvasSize / 2;
    const textY = (canvasSize - textHeight) / 2 + baselineOffset;
    const maxWidth = canvasSize * 0.9;

    ctx.fillStyle = `hsla(${hue}, 50%, 50%, 100%)`;
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