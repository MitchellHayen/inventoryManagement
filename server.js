const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

//localhost
const hostname = 'localhost';
//root local
//user vps
const username = 'root';
//mysql local
//SE342 vps
const password = 'mysql';
const database = 'inventory_manager';
//displaying all items
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
//updating item
app.post("/items",async function(request,response){
    try{
        let conn = mysql.createConnection({host:hostname, user:username, password:password, database:database});
        await conn.connect();

        let itemID = request.body.itemID;
        let itemDescription = request.body.itemDescription;
        let itemQuantity = request.body.itemQuantity;
        let itemMinPar = request.body.itemMinPar;
        let itemMaxPar = request.body.itemMaxPar;
    //let sql = \UPDATE 'items' SET itemDescription = "${itemDescription}", itemQuantity = "${itemQuantity}", itemMinPar = "${itemMinPar}", itemMaxPar = "${itemMaxPar}" WHERE itemID = "${itemID}";\
        let sql = "UPDATE items SET itemDescription = '"
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
        console.log("Ran into error in /items post path ",error);
    }
})
//adding item
app.put("/items",async function(request,response){
    try{
        let conn = mysql.createConnection({host:hostname, user:username, password:password, database:database});
        await conn.connect();

        let itemDescription = request.body.itemDescription;
        let itemQuantity = request.body.itemQuantity;
        let itemMinPar = request.body.itemMinPar;
        let itemMaxPar = request.body.itemMaxPar;

        let sql = "INSERT INTO items (itemDescription, itemQuantity, itemMinPar, itemMaxPar) VALUES ('"
            +itemDescription+
            "',"
            +itemQuantity+
            ","
            +itemMinPar+
            ","
            +itemMaxPar+
            ");";

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
        console.log("Ran into error in /items put path ",error);
    }
})

//deleting record
app.put("/removeItem",async function(request,response){
    try{
        let conn = mysql.createConnection({host:hostname, user:username, password:password, database:database});
        await conn.connect();

        let itemID = request.body.itemID;

        let sql = `DELETE FROM items WHERE itemID = "${itemID}";`


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
        console.log("Ran into error in /removeItem put path ",error);
    }
})

app.listen(port, ()=>console.log("App listening on ",port));