import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("pills_db4.db");
export const createTables = () => {
  // Create Pills table
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Pills (
      pill_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      colors TEXT
    );`
    );
  });

  // Create Users table
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    );`
    );
  });

  // Create Notifications table
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Notifications (
      notification_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      pill_id INTEGER NOT NULL,
      notification_type TEXT NOT NULL,
      notification_time TIME,
      days_of_week TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(user_id),
      FOREIGN KEY (pill_id) REFERENCES Pills(pill_id)
    );`
    );
  });

  // Create PillLogs table
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS PillLogs (
      log_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      pill_id INTEGER NOT NULL,
      log_date DATE NOT NULL,
      taken BOOLEAN NOT NULL,
      FOREIGN KEY (user_id) REFERENCES Users(user_id),
      FOREIGN KEY (pill_id) REFERENCES Pills(pill_id)
    );`
    );
  });
};
