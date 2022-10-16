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

app.post("/items",async function(request,response){
    try{
        let conn = mysql.createConnection({host:hostname, user:username, password:password, database:database});
        await conn.connect();

        let itemID = request.body.itemID;
        let itemDescription = request.body.itemDescription;
        let itemQuantity = request.body.itemQuantity;
        let itemMinPar = request.body.itemMinPar;
        let itemMaxPar = request.body.itemMaxPar;

        let sql = "UPDATE 'items' SET itemDescription = '"
            +itemDescription+
            "', itemQuantity = '"
            +itemQuantity+
            "', itemMinPar = '"
            +itemMinPar+
            "', itemMaxPar = '"
            +itemMaxPar+
            "' WHERE itemID = '"
            +itemID+
            "';";

        await conn.query(sql,function(err,result){
            if(err) {
                console.log("An error occurred: ",err);
                response.send("error");
            }
            else {
                response.send("Success");
            }
        })
        conn.end();
    } catch (error){
        response.send("Ran into error ",error);
        console.log("Ran into error in /items get path ",error);
    }
})

app.listen(port, ()=>console.log("App listening on ",port));