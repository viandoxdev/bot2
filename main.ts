import Discord from 'discord.js';
import fs from 'fs';
import sqlite from 'sqlite3'
const client = new Discord.Client();
let conf: Conf;

interface Conf {
    prefix: string,
    token: string
}

if (fs.existsSync('./conf.json')) {
    const parsedJson :Conf = JSON.parse(fs.readFileSync('./conf.json').toString());
    if(parsedJson.token === "YOUR TOKEN HERE") {
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


client.on('ready', () => {
    console.log('working !');
});

client.on('message', msg =>  {
    if(msg.content === conf.prefix + "test") {
        msg.channel.send(`<@${msg.author.id}> , it's working`)
    }
})


