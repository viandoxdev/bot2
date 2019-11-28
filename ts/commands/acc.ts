///<reference path="../types.d.ts" />
import Discord from 'discord.js';
import utils from '../utils';
import card from '../card'
import { acc } from '..';

export default async function _(accs: AccountObject, msg: Discord.Message, client: Discord.Client, args: string[], conf: Conf) {
    const acc = utils.getAccCreate(msg, accs);
    if(utils.isBanned('acc', acc)) {
        msg.channel.send(conf.banMessage.replace(/\$\{user\}/, `<@${msg.author.id}>`));
        return accs;
    }   
    
    msg.channel.send(`${msg.author.tag}'s card`, new Discord.Attachment(await card(utils.getAccCreate(msg, accs), msg.author)));
    return accs;
}