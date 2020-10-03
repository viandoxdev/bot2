///<reference path="../types.d.ts" />
import Discord from 'discord.js';
import utils from '../utils';
import path from 'path';

export default async function _ (accs: AccountObject, msg: Discord.Message, client: Discord.Client, args: string[], conf :Conf) {
    const acc : ToastAccount = utils.getAccCreate(msg, accs);
    if(utils.isBanned('basic', acc)) {
        msg.channel.send(conf.banMessage.replace(/\$\{user\}/, `<@${msg.author.id}>`));
        return accs;
    }   
    const image = path.join(__dirname, "../../res/saucisson/", (Math.floor(Math.random() * 5) + 1) + ".jpg");
    msg.channel.send(new Discord.Attachment(image));
    
    return accs;
}