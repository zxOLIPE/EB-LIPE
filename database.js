const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./eblipe.db");

db.serialize(() => {

    // ===============================
    // MILITARES
    // ===============================

    db.run(`
        CREATE TABLE IF NOT EXISTS militares (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            roblox_id TEXT UNIQUE NOT NULL,

            nome TEXT NOT NULL,

            patente TEXT DEFAULT 'REC',

            rank INTEGER DEFAULT 0,

            grupo INTEGER DEFAULT 966849028,

            divisao TEXT DEFAULT 'Nenhuma',

            status TEXT DEFAULT 'Ativo',

            criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

            atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP

        )
    `);

    // ===============================
    // PROMOÇÕES
    // ===============================

    db.run(`
        CREATE TABLE IF NOT EXISTS promocoes (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            militar_id INTEGER NOT NULL,

            promovido_por INTEGER NOT NULL,

            patente_antiga TEXT,

            patente_nova TEXT,

            data DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (militar_id) REFERENCES militares(id)

        )
    `);

    // ===============================
    // ADVERTÊNCIAS
    // ===============================

    db.run(`
        CREATE TABLE IF NOT EXISTS advertencias (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            militar_id INTEGER NOT NULL,

            aplicador INTEGER NOT NULL,

            motivo TEXT NOT NULL,

            data DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (militar_id) REFERENCES militares(id)

        )
    `);

    // ===============================
    // MEDALHAS
    // ===============================

    db.run(`
        CREATE TABLE IF NOT EXISTS medalhas (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            militar_id INTEGER NOT NULL,

            medalha TEXT NOT NULL,

            entregue_por INTEGER,

            data DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (militar_id) REFERENCES militares(id)

        )
    `);

    // ===============================
    // DIVISÕES
    // ===============================

    db.run(`
        CREATE TABLE IF NOT EXISTS divisoes (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            nome TEXT UNIQUE,

            descricao TEXT

        )
    `);

});

module.exports = db;