///<reference path="../types.d.ts" />
import Discord from 'discord.js';
import utils from '../utils';

export default async function _ (accs: AccountObject, msg: Discord.Message, client: Discord.Client, args: string[], conf :Conf) {
    const size = args[0] === undefined ? '?'+msg.author.avatarURL.split('?')[1] : isNaN(parseInt(args[0])) ? '?'+msg.author.avatarURL.split('?')[1] : '?size='+utils.nearestPow2(parseInt(args[0]));
    msg.channel.send(msg.author.avatarURL.split('?')[0] + size);
    return accs;
}