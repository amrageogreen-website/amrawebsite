const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

let dbInstance = null;

async function getDB() {
    if (dbInstance) return dbInstance;

    dbInstance = await open({
        filename: path.join(__dirname, 'amrageogreen.db'),
        driver: sqlite3.Database
    });

    await dbInstance.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        );

        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            category TEXT,
            location TEXT,
            year TEXT,
            status TEXT,
            client TEXT,
            budget TEXT,
            duration TEXT,
            description TEXT
        );

        CREATE TABLE IF NOT EXISTS enquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            subject TEXT,
            message TEXT,
            date TEXT,
            status TEXT DEFAULT 'new'
        );

        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            position TEXT,
            cv TEXT,
            cover_letter TEXT,
            date TEXT,
            status TEXT DEFAULT 'new'
        );

        -- Insert default admin user if not exists
        INSERT OR IGNORE INTO users (id, username, password) VALUES (1, 'admin', 'admin123');
    `);

    return dbInstance;
}

module.exports = { getDB };
