import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("szarek_konrad_4i11.db"); // proszę o taki schemat nazywania swojej bazy danych, zwłaszcza podczas testów na telefonach w pracowni

class Database {
  static createTable() {
    db.transaction((tx) => {
      //tx.executeSql("DROP TABLE alarms;");

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS alarms (id integer primary key not null, time text, days text, vibrations text, music text);"
      );
    });
  }

  static add(id, time, days, vibrations, music) {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO alarms (id,time, days,vibrations,music) values ('${id}','${time}', '${days}','${vibrations}','${music}');`
      );
    });
  }

  static getAll() {
    var query = "SELECT * FROM alarms";
    //
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          query,
          [],
          (tx, results) => {
            resolve(JSON.stringify(results));
          },
          function (tx, error) {
            reject(error);
          }
        );
      })
    );
  }

  static remove(id) {
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM alarms WHERE (id = ${id});`);
    });
  }

  static update(id, str) {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE alarms
        SET days = '${str}'
        WHERE id = ${id};`
      );
    });
  }

  static updateVibrations(id, str) {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE alarms
        SET vibrations = '${str}'
        WHERE id = ${id};`
      );
    });
  }

  static updateMusic(id, str) {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE alarms
        SET music = '${str}'
        WHERE id = ${id};`
      );
    });
  }
}

export default Database;
