const mongoose = require ('./../server/db/mongoose');
const Todo = require ('./../server/models/todo');
const {User} = require ('./../server/models/user');

const { ObjectID } = require('mongodb');

// To delete, use remove command
// remove({}) -> removes all
// findOneAndRemove
// findByIdAndRemove

//Todo.findOneAndRemove({})

Todo.findByIdAndRemove('').then( (todo) => {
    if(!todo){
        console.log('Todo not found!');
    }
    else{
        console.log(todo);
    }
}).catch((e) => {
    console.log(e);
} )

