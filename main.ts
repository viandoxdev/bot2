///<reference path="./ts/types.d.ts" />
import Discord from 'discord.js';
import fs from 'fs';
import dbm from './ts/dbm';
import * as commands from './ts/index'
import utils from './ts/utils';

const client = new Discord.Client();


async function Initialization() {
    let conf :Conf;
    let accs :AccountObject;
    await dbm.init();
    accs = await dbm.getAccounts();
    if (fs.existsSync('./conf.json')) {
        const parsedJson: Conf = JSON.parse(fs.readFileSync('./conf.json').toString());
        if (parsedJson.token === "YOUR TOKEN HERE") {
            console.log("edit the conf.json file with the token");
            process.exit();
        } else {
            conf = parsedJson;
            client.login(conf.token);
        }
    } else {
        fs.appendFileSync('./conf.json', '{\n   "prefix": "..",\n    "token": "YOUR TOKEN HERE"\n}');
        console.log('no conf.json file were detected, a file has been created edit the token value to make it works');
        process.exit(0);
    }
    console.log('init finalized')
    //@ts-ignore
    return {conf: conf, accs, accs}
}
    
function AfterInitialization({conf, accs}: {conf: Conf, accs: AccountObject}) {
    client.on('ready', () => {
        console.log('bot working !');
    });

    client.on('message', msg => {
        if(msg.content.startsWith(conf.prefix)) {
            const noPrefixSplitedcommand = () => {return msg.content.split('').splice(conf.prefix.length, msg.content.split('').length - conf.prefix.length).join('').split(' ');}
            const args = noPrefixSplitedcommand().splice(1, noPrefixSplitedcommand.length-1);
            const msgCom = noPrefixSplitedcommand().splice(0, 1).join('');
            for(let com in commands) {
                if(msgCom === com) {
                    //@ts-ignore
                    commands[com](accs, msg, client, args, conf).then(e => dbm.setAccounts(e));
                    //commands[com](accs, msg, client, args, conf).then(dbm.setAccounts); not working
                }
            }
        }
    })
}

Initialization().then(AfterInitialization);