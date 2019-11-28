///<reference path="../types.d.ts" />
import Discord from 'discord.js';
import utils from '../utils';

export default async function _(accs: AccountObject, msg: Discord.Message, client: Discord.Client, args: string[], conf: Conf) {
    const acc = utils.getAccCreate(msg, accs);
    if (acc.rank === 0) {
        msg.channel.send(`you can't use this command, <@${msg.author.id}>`);
        return
    };
    if (utils.isBanned('say', acc)) {
        msg.channel.send(conf.banMessage.replace(/\$\{user\}/, `<@${msg.author.id}>`));
        return accs;
    }
    const c = args.join(' ');
    msg.delete();
    msg.channel.send(c);
    return accs;
}