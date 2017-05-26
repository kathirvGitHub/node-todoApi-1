var express = require('express');
var bodyParser = require('body-parser');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    // console.log(req.body);

    var newTodo = new Todo({
        text: req.body.text,
        completed : req.body.completed,
        completedAt : req.body.completedAt
    });

    newTodo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
})

app.listen(3000, () => {
    console.log('Server up and running');
});



