// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log ("Connection error!");
    }

    console.log("Connection established.");

    // db.collection('Todos').find({completed : true}).toArray().then ( (docs) => {
    //     console.log('Todos');
    //     console.log(docs);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // })

    // db.collection('Todos').find({completed : true}).count().then ( (count) => {
    //     console.log('Todos');
    //     console.log(count);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // })

    db.collection('Users').find({name : 'Karthikeyan'}).count().then ( (count) => {
        console.log('Users');
        console.log(count);
    }, (err) => {
        console.log('Unable to fetch Users', err);
    })

    db.close();
});