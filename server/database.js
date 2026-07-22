const sqlite3 = require("sqlite3").verbose();


const db = new sqlite3.Database("./eblipe.db");



db.serialize(()=>{


    db.run(`

    CREATE TABLE IF NOT EXISTS militares (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        roblox_id TEXT UNIQUE,

        nome TEXT,

        patente TEXT DEFAULT 'REC',

        divisao TEXT DEFAULT 'Nenhuma',

        status TEXT DEFAULT 'Ativo',

        data_entrada DATETIME DEFAULT CURRENT_TIMESTAMP

    )

    `);



});



module.exports = db;