// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log ("Connection error!");
    }

    console.log("Connection established.");

    // db.collection('Todos').insertOne({
    //     text : 'Something to do',
    //     completed : false
    // }, (err, result) => {
    //     if(err){
    //         return console.log ("Insert error!", err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    db.collection('Users').insertOne({
        name : 'Shen',
        age : 31,
        location : 'Heverlee, Belgium'
    }, (err, result) => {
        if(err){
            return console.log ("Insert error!", err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    db.close();
});