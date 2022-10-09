const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

const hostname = 'localhost';
const username = 'root';
const password = 'mysql';
const database = 'inventory_manager';

app.get("/items",async function(request,response){
    try{
        let conn = mysql.createConnection({host:hostname, user:username, password:password, database:database});
        await conn.connect();

        let sql = "SELECT * FROM items";

        await conn.query(sql,function(err,result){
            if(err) {
                response.send(err);
            }
            response.send(result);
        })
        conn.end();
    } catch (error){
        response.send("Ran into error ",error);
        console.log("Ran into error in /items get path ",error);
    }
})

app.listen(port, ()=>console.log("App listening on ",port));