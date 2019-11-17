import sqlite3 from 'sqlite3';
import { isNull } from 'util';
let Database : sqlite3.Database;


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
        const ret = db.run(sql, params, err => {
            if(!isNull(err)) {
                rej(err);
            } else {
                res(ret);
            }
        })
    });
}