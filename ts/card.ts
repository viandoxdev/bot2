///<reference path='./types.d.ts' />
import Discord from 'discord.js'
import { createCanvas, loadImage } from 'canvas'
import utils from './utils'

export default async function (acc :ToastAccount, client: Discord.User) :Promise<Buffer> {
    const canvas = createCanvas(1000, 250);
    const ctx = canvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;
    const xpSize = ch / 15;
    const pdpCX = (ch-xpSize*4) / 2 + xpSize * 2;
    const grey = 50;
    ctx.strokeStyle = "black"
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect(0, 0, cw, ch);
    ctx.beginPath();
    ctx.arc(pdpCX, pdpCX, (ch-xpSize*4)/2, 0, 2*Math.PI);
    ctx.closePath();
    ctx.save();
    ctx.clip();
    const pdp = await loadImage(client.displayAvatarURL);
    console.log(pdp.width + ' ' + pdp.height)
    ctx.drawImage(pdp, xpSize*2,xpSize*2, ch-xpSize * 4, ch - xpSize * 4);
    ctx.restore();
    ctx.beginPath();
    ctx.lineWidth = xpSize;
    ctx.strokeStyle = `rgb(${grey}, ${grey}, ${grey})`;
    ctx.arc(pdpCX, pdpCX, ((ch-xpSize*4) / 2) + (1 * xpSize), 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    console.log(utils.calcLvlFromMsg(1900))
    return canvas.toBuffer();
}