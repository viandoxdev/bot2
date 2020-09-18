///<reference path='./types.d.ts' />
import { createCanvas, registerFont } from 'canvas'

export default async function (str: string, size: number, bg: string, fg: string): Promise<Buffer> {
    registerFont('./res/fonts/Montserrat-Light.ttf', { family: 'Montserrat' })
    const dummyCTX = createCanvas(1, 1).getContext("2d");
    dummyCTX.font = `${size}px 'Montserrat', sans-serif`;
    const margin: number = 1.2;
    const h = Math.floor((dummyCTX.measureText(str).actualBoundingBoxAscent + dummyCTX.measureText(str).actualBoundingBoxDescent) * margin);
    const w = Math.floor(dummyCTX.measureText(str).width * margin);
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext("2d");
    ctx.font = `${size}px 'Montserrat', sans-serif`;
    if (bg !== "transparent") {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);
    }
    ctx.fillStyle = fg
    ctx.textAlign = "center"
    ctx.fillText(str, w / 2, h / ((margin - 1) / 2 + 1), w);
    return canvas.toBuffer();

}

