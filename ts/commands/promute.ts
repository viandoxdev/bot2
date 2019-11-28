///<reference path="../types.d.ts" />
import Discord from 'discord.js';
import utils from '../utils';

export default async function _(accs: AccountObject, msg: Discord.Message, client: Discord.Client, args: string[], conf: Conf) {
    const acc: ToastAccount = utils.getAccCreate(msg, accs);
    if (utils.isBanned('promute', acc)) {
        msg.channel.send(conf.banMessage.replace(/\$\{user\}/, `<@${msg.author.id}>`));
        return accs;
    }
    const id = args[0].replace(/[<>@]/g, '');
    const promRank = parseInt(args[1]);
    if (promRank < 0 || promRank > 2) {
        msg.channel.send(`invalid rank, <@${msg.author.id}>`)
    }
    const focAcc = utils.getAccCreate(msg, accs, id);
    if (acc.rank <= focAcc.rank) {
        msg.channel.send(`you do not have the level to promute to this rank, <@${msg.author.id}>`);
        return accs
    };
    focAcc.rank = promRank;
    msg.channel.send(`succesfully promoted (or demoted) a user to rank ${promRank}`)
    return accs;
}