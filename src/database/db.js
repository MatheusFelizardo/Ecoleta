// importar a dependencia do sqlite3
const sqlite3 = require ("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db") // criou o arquivo de bd no local 

module.exports = db

// utilizar o bd para operações

 db.serialize(() => {
 //criar uma tabela com comandos sql
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT       
        );
        
    `)
    
  /* DELETAR ITENS DO DB
    db.run (`DELETE FROM places WHERE id = ?`, [13], function(err){
        if (err) {
            return console.log(err)
        }
        console.log ("Registro deletado com sucesso") 
   }) */
})
    