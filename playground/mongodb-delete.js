// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("Connection error!");
    }

    console.log("Connection established.");

    // options available deleteMany, deleteOne and findOneAndDelete

    // Query the database, and see if there are any duplicates on users, if so delete them all

    db.collection('Users').find().toArray().then((docs) => {
        console.log(docs);
        docs.forEach((element) => {
            console.log(element.name);
            db.collection('Users').find({ name: element.name }).count().then((count) => {                
                console.log(count);
                if(count > 1){
                    db.collection('Users').deleteMany({ name: element.name }).then((result) => {
                        console.log(result);
                    })
                }
            }, (err) => {
                console.log('Unable to fetch Users', err);
            });
        });
    }, (err) => {
        console.log('Unable to fetch Users', err);
    })   

    db.collection('Users').findOneAndDelete({_id : new ObjectID('5927ff01f23e150cfb931156')}).then((result) => {
        console.log(result);
    })   

    // db.close();
});