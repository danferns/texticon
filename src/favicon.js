function FaviconFallback(name, userOptions) {
    const options = {
        font: "128px sans-serif",
        size: 256,
        ...userOptions,
    };

    const initials = getInitials(name);

    const canvas = document.createElement("canvas");

    const devicePixelRatio = Math.max(window.devicePixelRatio, 1);
    const canvasSize = options.size * devicePixelRatio;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const ctx = canvas.getContext("2d");
    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.font = options.font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textMetrics = ctx.measureText(initials);
    const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

    const baselineOffset = textMetrics.actualBoundingBoxAscent;

    const textX = canvasSize / 2;
    const textY = (canvasSize - textHeight) / 2 + baselineOffset;
    const maxWidth = canvasSize * 0.9;

    ctx.fillText(initials, textX, textY, maxWidth);

    return canvas.toDataURL("image/png");
}

function getInitials(name) {
    let initials = "";
    for (const word of name.split(" ")) initials += word[0];
    return initials;
}
