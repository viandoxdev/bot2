///<reference path="../types.d.ts" />
import Discord from 'discord.js';
import utils from '../utils';
import card from '../card'

export default async function _(accs: AccountObject, msg: Discord.Message, client: Discord.Client, args: string[], conf: Conf) {
    const id = args[0].replace(/[<>@]/g, '');
    try {
        const user = await client.fetchUser(id);
        let acc = accs[`<${id}>`];
        if (acc === undefined) {
            accs[`<${id}>`] = {
                config: {},
                coins: 0,
                messages: 0,
            }
            msg.channel.send('account created');
            acc = accs[`<${id}>`];
        }

        msg.channel.send(`${user.tag}'s card`, new Discord.Attachment(await card(accs[`<${id}>`], user)));
    } catch(e) {
        msg.channel.send('invalid user');
    }

    return accs;
}