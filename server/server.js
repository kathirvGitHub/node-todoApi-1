var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    // console.log(req.body);

    var newTodo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });

    newTodo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
})

app.get('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        res.status(400).send({ error: 'Invalid ID' });
    }
    else {
        Todo.findById(req.params.id).then((todos) => {
            res.send({ todos });
        }, (e) => {
            res.status(400).send(e);
        });
    }

})

app.listen(port, () => {
    console.log (`Server is running on port ${port}`)
});



