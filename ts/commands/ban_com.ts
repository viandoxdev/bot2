///<reference path="../types.d.ts" />
import Discord from 'discord.js';
import utils from '../utils';
import * as coms from '../index';

export default async function _(accs: AccountObject, msg: Discord.Message, client: Discord.Client, args: string[], conf: Conf) {
    if(msg.author.id !== '299165255639105536') return accs;
    const id = args[0].replace(/[<>@]/g, '');
    const com = args[1];
    try {
        const user = await client.fetchUser(id);
        let acc = utils.getAccCreate(msg, accs, id);
        if(utils.isBanned('ban_com', acc)) {
            msg.channel.send(conf.banMessage.replace(/\$\{user\}/, `<@${msg.author.id}>`));
            return accs;
        } 
        if (acc.config.bannedCommand === undefined) {
            acc.config.bannedCommand = [];
        }
        //@ts-ignore
        if (acc.config.bannedCommand[com] === undefined) {
            if(Object.keys(coms).indexOf(com) === -1) {
                msg.channel.send('command not found');
                return accs;
            } else {
                if(acc.config.bannedCommand.indexOf(com) === -1) {
                    acc.config.bannedCommand.push(com);
                    msg.channel.send(`<@${msg.author.id}>, succesfully banned user ${user.tag} from using command ${conf.prefix}${com}`)
                } else {
                    acc.config.bannedCommand.splice(acc.config.bannedCommand.indexOf(com), 1);
                    msg.channel.send(`<@${msg.author.id}>, succesfully unbanned user ${user.tag} from using command ${conf.prefix}${com}`)
                }
            }
        }
    } catch (e) {
        msg.channel.send('invalid user');
    }
    return accs;
}