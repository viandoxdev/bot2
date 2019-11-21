///<reference path='./types.d.ts' />
import Discord from 'discord.js'
import { createCanvas, loadImage, registerFont } from 'canvas'
import utils from './utils'

export default async function (acc :ToastAccount, client: Discord.User) :Promise<Buffer> {
    registerFont('./res/fonts/Montserrat-Light.ttf', {family: 'Montserrat', weight:'300'})
    const canvas = createCanvas(1000, 250);
    const ctx = canvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;
    const xpSize = ch / 15;
    const pdpCX = (ch-xpSize*4) / 2 + xpSize * 2;
    const grey = 65;
    const blue = 'rgba(21, 162, 232, 1)';
    const colors = {
        online: "rgb(67, 181, 129)",
        afk: "rgb(250, 166, 26)",
        pasd: "rgb(240, 71, 71)",
        deco: "rgb(116, 127, 141)",

    };
    const black = "rgb(10, 10, 10)";
    ctx.strokeStyle = black
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect(0, 0, cw, ch);
    ctx.beginPath();
    ctx.lineWidth=25;
    ctx.strokeStyle='black'
    ctx.arc(pdpCX, pdpCX, (ch-xpSize*4)/2, 0, 2*Math.PI);
    ctx.closePath();
    ctx.save();
    ctx.stroke();
    ctx.clip();
    let pdp;
    try {
        pdp = await loadImage(client.avatarURL.split('?')[0] + '?size=' + utils.nearestPow2(ch-xpSize * 4));
    } catch(e) {
        pdp = await loadImage(client.defaultAvatarURL)
    }
    ctx.drawImage(pdp, xpSize*2,xpSize*2, ch-xpSize * 4, ch - xpSize * 4);
    ctx.restore();
    ctx.beginPath();
    ctx.lineWidth = xpSize;
    ctx.strokeStyle = `rgb(${grey}, ${grey}, ${grey})`;
    ctx.arc(pdpCX, pdpCX, ((ch-xpSize*4) / 2) + (0.75 * xpSize), 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    const { lvl, msgStock: xp, msgCap: cap } = utils.calcLvlFromMsg(acc.messages);
    const percent = xp / cap;
    ctx.beginPath();
    ctx.lineWidth = xpSize * 1.5;
    ctx.strokeStyle = blue;
    ctx.arc(pdpCX, pdpCX, ((ch-xpSize*4) / 2) + (1 * xpSize), -(Math.PI / 2), percent * 2*Math.PI -(Math.PI / 2),);
    ctx.stroke();
    ctx.closePath();
    const angle = ((Math.PI * 2) / 8);
    const actX = Math.cos(angle) *  (ch-xpSize*4)/2  + pdpCX
    const actY = Math.sin(angle) *  (ch-xpSize*4)/2  + pdpCX;
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.fillStyle = ctx.strokeStyle;
    ctx.arc(actX, actY, 32, 0, Math.PI * 2); 
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    const concernColor = 
    client.presence.status === 'online' ? colors.online : 
    client.presence.status === 'idle' ? colors.afk :
    client.presence.status === 'dnd' ? colors.pasd : colors.deco;
    ctx.fillStyle = concernColor;
    ctx.beginPath();
    ctx.arc(actX, actY, 28, 0, Math.PI * 2); 
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.font = '50px \'Montserrat\', sans-serif';
    const maxWidth = 1000-(pdpCX*2+(ctx.measureText('#'+client.discriminator).width)+(ctx.measureText(`LVL ${utils.calcLvlFromMsg(acc.messages).lvl}`).width));
    let username = '';
    let usernameT :string[] = [];
    let oT = client.username.split('');
    let toolong = true;
    while (ctx.measureText(username).width < maxWidth) {
        usernameT.push(oT.splice(0, 1).join(''));
        username = usernameT.join('');
        if(oT.length < 1 ) {toolong=false;break;};
    }
    if(toolong) {
        username = username.slice(0, username.length - 2)
    }
    const lvlOff = 1000 - ctx.measureText(`LVL ${utils.calcLvlFromMsg(acc.messages).lvl}X`).width;
    ctx.fillText(username, pdpCX*2, 20+50, maxWidth)
    ctx.fillText('LVL '+utils.calcLvlFromMsg(acc.messages).lvl, lvlOff, 20+50);
    ctx.font = '40px \'Montserrat\', sans-serif';
    ctx.fillStyle ="grey"
    ctx.fillText("#"+client.discriminator,pdpCX*2 + ctx.measureText(username+'X..'+(toolong ? 'X' : '')).width, 20+50, 1000-pdpCX*2+2*xpSize);
    ctx.fillStyle = "white"
    ctx.fillText(`messages: ${acc.messages}`, pdpCX*2 + xpSize, (20+50)*2);
    ctx.fillText(`coins: ${acc.coins}`, pdpCX*2, (20+50)*3);
    ctx.fillStyle = 'grey';
    ctx.lineWidth = 2;
    ctx.strokeStyle = ctx.fillStyle;
    ctx.font = '40px \'Montserrat\', sans-serif';
    const txt = `${utils.calcLvlFromMsg(acc.messages).msgStock} / ${utils.calcLvlFromMsg(acc.messages).msgCap} msg`;
    ctx.fillText(txt, cw - ctx.measureText(txt+'X').width, ch - 40);
    return canvas.toBuffer();
}