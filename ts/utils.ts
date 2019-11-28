///<reference path="./types.d.ts" />
import Discord from 'discord.js'

export default {
    getAcc(msg: Discord.Message, accs: AccountObject) {
        return accs[`<${msg.author.id}>`];
    },
    getAccCreate(msg: Discord.Message, accs: AccountObject, id? : string) {
        const ID = id === undefined ? msg.author.id : id;
        let acc: ToastAccount = accs[`<${ID}>`];
        if (acc === undefined) {
            accs[`<${ID}>`] = {
                config: {
                    bannedCommand: []
                },
                coins: 0,
                messages: 0,
            }
            msg.channel.send('account created');
        }
        return acc
    },
    isBanned(com :string, acc: ToastAccount) {
        return acc.config.bannedCommand.indexOf(com) !== -1;
    },
    calcLvlFromMsg(msg :number) {
        let msgCap = 10;
        let msgStock = msg;
        let lvl = 0;
        while (msgStock >= msgCap) {
            msgStock -= msgCap;
            lvl ++;
            switch(msgCap) {
                case 10:
                    msgCap = 20;
                break;
                case 20:
                    msgCap = 40;
                break;
                case 40:
                    msgCap = 50;
                break;
                case 50:
                    msgCap = 75;
                break;
                case 75:
                    msgCap = 100;
                break;
                case 100:
                    msgCap = 125;
                break;
                case 125:
                    msgCap = 150;
                break;
                case 150:
                    msgCap = 200;
                break;
                default:
                    msgCap += msgCap * (1/8)
                break;
            }
        }
        msgStock = Math.floor(msgStock);
        msgCap = Math.floor(msgCap);
        return {lvl, msgStock, msgCap};
    },
    nearestPow2( aSize :number ){
        return Math.pow( 2, Math.round( Math.log( aSize ) / Math.log( 2 ) ) ); 
    }
}

