const express = require("express")
const server = express ()
const db = require ("./database/db.js") //puxa o db da pasta

// configurar pasta publica
server.use(express.static("public"))

//habilitar uso do req.body na aplicação.

server.use(express.urlencoded({extended:true}))

//configurar os caminhos
//pagina inicial

server.get ("/", (req,res) => {
    return res.render ("index.html")
} )

server.get ("/cadastrar_ponto", (req,res) => {

//pegar o que tem na url (req.query -> query strings da url)
   // console.log (req.query)

    return res.render ("create-point.html")
} )


//recupera os elementos da url e encaminha para uma pagina criada com o post
server.post ("/savepoint", (req,res) => {

    //req.body: recupera o corpo do formulário
    // console.log(req.body)

    //inserir dados no banco de dados

    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (
            ?,?,?,?,?,?,?
        );
    `
    const values = [
        req.body.image, 
        req.body.name, 
        req.body.adress, 
        req.body.adress2, 
        req.body.state, 
        req.body.city, 
        req.body.items, 
    ]
    
    function afterInsertData (err) {
        if (err) {
            console.log(err)
            return res.send ("Erro no cadastro")
        }

        console.log ("Cadastrado com sucesso")
        console.log (this)

        return res.render ("create-point.html", {saved: true})
    }
    
    db.run (query, values, afterInsertData)


   
})

server.get ("/pontos_de_coleta", (req,res) => {

    const search = req.query.search

    if (search == "") {
        return res.render ("search-results.html", {total:0})
    }
    
    //consultar dados da tabela
    db.all (`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            return console.log(err)
        }
        console.log (rows)
        const total = rows.length
        //mostrar a pagina html com os dados do banco de dados
        return res.render ("search-results.html", {places: rows, total})


    } )
    
} )

// utilizando template egn
const nunjucks = require ("nunjucks")

nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



// ligar o servidor
server.listen(3000)