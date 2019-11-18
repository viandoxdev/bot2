///<reference path="../types.d.ts" />
import Discord from 'discord.js';
import utils from '../utils';
import card from '../card'

export default async function _(accs: AccountObject, msg: Discord.Message, client: Discord.Client, args: string[], conf: Conf) {
    if (utils.getAcc(msg, accs) === undefined) {
        accs[`<${msg.author.id}>`] = {
            config: {},
            coins: 0,
            messages: 0,
        }
        msg.channel.send('account created');
    }
    
    msg.channel.send(`${msg.author.tag}'s card`, new Discord.Attachment(await card(utils.getAcc(msg, accs), msg.author)));
    return accs;
}