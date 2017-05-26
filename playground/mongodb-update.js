// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("Connection error!");
    }

    console.log("Connection established.");

    // do findOneAndUpdate

    db.collection('Users').findOneAndUpdate(
        {_id : new ObjectID('5927fee9f23e150cfb931154')},
        {
            $set:{
                name : 'Satkrith Karthikeyan'
            }
        },
        {
            returnOriginal : false
        }
    ).then((result) => {
        console.log(result);
    })  

    db.collection('Users').findOneAndUpdate(
        {_id : new ObjectID('5927fee9f23e150cfb931154')},
        {
            $inc:{
                age : 1
            }
        },
        {
            returnOriginal : false
        }
    ).then((result) => {
        console.log(result);
    })      

    // db.close();
});