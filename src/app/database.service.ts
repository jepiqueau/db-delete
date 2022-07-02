import { Injectable } from "@angular/core";
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Capacitor } from "@capacitor/core";
import { Guid } from "guid-typescript";

@Injectable({providedIn: 'root'})
export class DatabaseService{
    private readonly isWeb: boolean;
    private readonly sqlite: SQLiteConnection;
    private _db: SQLiteDBConnection | null = null;

    private readonly t1 = 'table1';
    private readonly t2 = 'table2';

    constructor() {
        this.isWeb = !Capacitor.isNativePlatform();
        this.sqlite = new SQLiteConnection(CapacitorSQLite);
    }

    public async initialize(){
        if (this.isWeb) {
            const webStoreName = 'jeep-sqlite';
            if (!document.querySelector(webStoreName)) {
                const jeepSqlite = document.createElement(webStoreName);
                document.body.appendChild(jeepSqlite);
                await customElements.whenDefined(webStoreName);
            }
            await this.sqlite.initWebStore();
        }
        
        this._db = await this.sqlite.createConnection('test',false  , 'no-encryption', 1);
        
        await this.ensureTablesExist();
    }

    public async deleteDb(){
        await this._db?.close();
        await this._db?.delete();
    }

    private async ensureTablesExist(){
        await this._db?.open();
        await this._db!.execute(`PRAGMA journal_mode=WAL;`,false);
        await this._db!.execute(`CREATE TABLE IF NOT EXISTS ${this.t1} (id text, nb number, description text);`);
        await this._db!.execute(`CREATE TABLE IF NOT EXISTS ${this.t2} (id text, nb number, description text);`);
    }
}
