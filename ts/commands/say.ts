///<reference path="../types.d.ts" />
import Discord from 'discord.js';
import utils from '../utils';

export default async function _ (accs: AccountObject, msg: Discord.Message, client: Discord.Client, args: string[], conf :Conf) {
    if(msg.author.id !== '299165255639105536') return;
    const c = args.join(' ');
    msg.delete();
    msg.channel.send(c);
    return accs;
}