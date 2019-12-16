///<reference path="../types.d.ts" />
import Discord from 'discord.js';
import utils from '../utils';
import card from '../card'

export default async function _(accs: AccountObject, msg: Discord.Message, client: Discord.Client, args: string[], conf: Conf) {
    const id = args[0].replace(/[<>@!]/g, '');
    try {
        const user = await client.fetchUser(id);
        const acc = utils.getAccCreate(msg, accs, id);
        if (utils.isBanned('spec_account', acc)) {
            msg.channel.send(conf.banMessage.replace(/\$\{user\}/, `<@${msg.author.id}>`));
            return accs;
        }
        msg.channel.send(`${user.tag}'s card`, new Discord.Attachment(await card(accs[`<${id}>`], user)));
    } catch (e) {
        console.log(e);
        msg.channel.send('invalid user');
    }

    return accs;
}