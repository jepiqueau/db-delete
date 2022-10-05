import { Injectable } from "@angular/core";
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Capacitor } from "@capacitor/core";
import { Guid } from "guid-typescript";

@Injectable({providedIn: 'root'})
export class DatabaseService{
    private isWeb: boolean = false;
    private readonly sqlite: SQLiteConnection;
    private _db: SQLiteDBConnection | null = null;

    private readonly t1 = 'table1';
    private readonly t2 = 'table2';

    constructor() {
        if(Capacitor.getPlatform() === "web") this.isWeb = true;
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
        try {
          this._db = await this.sqlite.createConnection('test',false  , 'no-encryption', 1, false);
          if(this._db === null) {
            console.log(`database.service initialize Error: _db is null`);
          }
          console.log(`$$$ initialize createConnection successful`);

          await this.ensureTablesExist();
          console.log(`$$$ initialize successful`);
        } catch (err) {
          console.log(`database.service initialize Error: ${JSON.stringify(err)}`);
        }
    }

    public async deleteDb(){
      try {
        if(this._db !== null) {
          await this._db.close();
          console.log(`$$$ deleteDb close successful`);
          await this._db.delete();
          console.log(`$$$ deleteDb successful`);
        } else {
          console.log(`database.service deleteDb Error: _db is null`);
        }

      } catch (err) {
        console.log(`database.service deleteDb Error: ${JSON.stringify(err)}`);
      }
    }

    private async ensureTablesExist(){
      try {
        if(this._db !== null) {
          await this._db.open();
          await this._db.execute(`PRAGMA journal_mode=WAL;`,false);
          await this._db.execute(`CREATE TABLE IF NOT EXISTS ${this.t1} (id text, nb number, description text);`);
          await this._db.execute(`CREATE TABLE IF NOT EXISTS ${this.t2} (id text, nb number, description text);`);
          console.log(`$$$ ensureTablesExist successful`);
        } else {
          console.log(`database.service ensureTablesExist Error: _db is null`);
        }
      } catch (err) {
        console.log(`database.service ensureTablesExist Error: ${JSON.stringify(err)}`);
      }
    }
}
