import Discord from 'discord.js';
import fs from 'fs';
import dbm from './ts/dbm';

const client = new Discord.Client();


interface Conf {
    prefix: string,
    token: string
}
interface AccountObject {
    [propname: string]: {
        config: userConfigInterface,
        messages: number,
        coins: number,
    }
}
interface userConfigInterface {

}

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
        if (msg.content === conf.prefix + "acc") {
            if(accs[msg.author.id] === undefined) {
                accs[msg.author.id] = {
                    config: {},
                    coins: 0,
                    messages: 0,
                }
                dbm.setAccounts(accs);
                msg.channel.send('account created');
            }
                msg.channel.send(JSON.stringify(accs[msg.author.id]));
        }
    })
}

Initialization().then(AfterInitialization);