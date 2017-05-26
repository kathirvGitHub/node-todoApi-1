const mongoose = require ('./../server/db/mongoose');
const Todo = require ('./../server/models/todo');
const {User} = require ('./../server/models/user');

var id = '59282c193e74111e4c8eb8e3';

User.findById(id).then( (users) => {
    if(!users){
        console.log('User not found!');
    }
    else{
        console.log(users);
    }
}).catch((e) => {
    console.log(e);
} )