///<reference path="../types.d.ts" />
import Discord from 'discord.js';
import utils from '../utils';
import letter from '../letter';

export default async function _(accs: AccountObject, msg: Discord.Message, client: Discord.Client, args: string[], conf: Conf) {
    const acc: ToastAccount = utils.getAccCreate(msg, accs);
    if (utils.isBanned('basic', acc)) {
        msg.channel.send(conf.banMessage.replace(/\$\{user\}/, `<@${msg.author.id}>`));
        return accs;
    }
    const str: string = args[0];
    const DefSize = 500;
    const foundSize = parseInt(args[1]);
    const mode = args[2] === "true" ? true : false; // so if not given default to false
    const size = isNaN(foundSize) ? DefSize : foundSize;
    const bg = typeof args[4] === 'string' ? args[4] : "transparent";
    const fg = typeof args[3] === 'string' ? args[3] : "white";

    if (acc.rank < 2 && mode) {
        msg.channel.send("spelling feature disabled for regular users");
        return accs
    }

    if (mode) { // then spell the letters one by one
        for (let i of str) {
            msg.channel.send(new Discord.Attachment(await letter(i, size, bg, fg)));
        }
    } else { // or just draw the whole sentence
        msg.channel.send(new Discord.Attachment(await letter(str, size, bg, fg)));
    }

    msg.delete();

    return accs;
}