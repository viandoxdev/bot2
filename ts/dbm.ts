import sqlite3 from 'sqlite3';
import { isNull } from 'util';
import { Interface } from 'readline';
let Database : sqlite3.Database;
interface AccountObject {
    [propname: string]: {
        config: userConfigInterface,
        messages: number,
        coins: number,
    }
}
interface userConfigInterface {

}
export default {
    async init() {
        Database = await sqlite3Database('./db/database.db3');
        await sqlite3Run(Database, `CREATE TABLE IF NOT EXISTS "account" (
            "id"	TEXT NOT NULL UNIQUE,
            "config"	TEXT DEFAULT '{}',
            "messages"	INTEGER DEFAULT 0,
            "coins"	INTEGER DEFAULT 0,
            PRIMARY KEY("id")
        );`);
    },
    async getAccounts() {
        const res: AccountObject = {};
        await sqlite3Each(Database, 'SELECT * FROM account', (err, row) => {
            console.log(row);
            res[row.id] = {
                config: JSON.parse(row.config),
                messages: row.messages,
                coins: row.coins
            }
        })
        return res;
    },
    async setAccounts(acc: AccountObject) {
        const accs :AccountObject = await this.getAccounts();
        if(JSON.stringify(acc) == JSON.stringify(accs)) return;
        for(let i in acc) {
            const e = acc[i];
            if(accs[i] === undefined) {
                await sqlite3Run(Database, "INSERT INTO account values(?, ?, ?, ?)", [i, JSON.stringify(e.config), e.messages, e.coins]);
            } else {
                await sqlite3Run(Database, "UPDATE account SET config = ?, messages = ?, coins = ? WHERE id = ?", [JSON.stringify(e.config), e.messages, e.coins, i]);
            }
        }
    }
}

function sqlite3Database(filename: string) :Promise<sqlite3.Database>  {
    return new Promise((res, rej) => {
        const ret = new sqlite3.Database(filename, (err) => {
            if(!isNull(err)) {
                rej(err);
            } else {
                res(ret);
            }
        })
    })
}

function sqlite3Run(db :sqlite3.Database, sql: string, ...params: any[]) {
    return new Promise((res, rej) => {
        const ret = db.run(sql, ...params, (err: Error) => {
            if(!isNull(err)) {
                rej(err);
            } else {
                res(ret);
            }
        })
    });
}

function sqlite3Each(db :sqlite3.Database, sql: string, callBack?: ((this :sqlite3.Statement, err :Error | null, row: any) => void)) {
    return new Promise((res, rej) => {
        const ret = db.each(sql, callBack, err => {
            if(!isNull(err)) {
                rej(err);
            } else {
                res(ret);
            }
        })
    })
}