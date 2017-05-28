var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
var lodash = require('lodash');
const bcrypt = require('bcryptjs')


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

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

app.delete('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        res.status(400).send({ error: 'Invalid ID' });
    }
    else {
        Todo.findByIdAndRemove(req.params.id).then((todos) => {
            if (!todos) {
                return res.status(400).send({ error: 'Invalid ID' });
            }
            res.send({
                todos,
                status: 'Removed'
            });
        }, (e) => {
            res.status(400).send(e);
        });
    }

})

app.patch('/todos/:id', (req, res) => {
    var updateBody = lodash.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send({ error: 'Invalid ID' });
    }

    Todo.findByIdAndUpdate(req.params.id, { $set: updateBody }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(400).send({ error: 'Invalid ID' });
        }
        res.send({
            todo,
            status: 'Updated'
        });
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.post('/users', (req, res) => {

    var userBody = lodash.pick(req.body, ['email', 'password']);

    var newUser = new User(userBody);

    newUser.save().then((userDoc) => {
        return userDoc.generateAuthToken();
        // res.send(doc);
    }).then((token) => {
        res.header('x-auth', token).send({ newUser, token });
    }).catch((e) => {
        res.status(400).send(e);
    });
})


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
})

app.post('/users/login', (req, res) => {

    var userBody = lodash.pick(req.body, ['email']);
    var userBodyPassword = lodash.pick(req.body, ['password']);

    // console.log('About to query', userBody);

    User.findOne(userBody).then((userDoc) => {
        // get the user by email first, then compare hashed password with the plain password sent 
        if (!userDoc) {
            // send back error
            return Promise.reject();
        }
        // console.log('user found', userDoc);

        bcrypt.compare(userBodyPassword.password, userDoc.password, (err, result) => {
            if (result) {
                // email and password matched, send back user info
                userDoc.generateAuthToken().then((token) => {
                    res.header('x-auth', token).status(200).send({ userDoc, token });
                }).catch((e) => {
                    res.status(404).send();
                });
                // res.status(200).send({
                //     userDoc, 
                //     token : userDoc.tokens
                // });
            }
            else {
                // send back error
                res.status(404).send();
            }
        })
    }).catch((e) => {
        res.status(404).send();
    });
})

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch((e) => {
        res.status(404).send();
    });
})

// app.get('users/me', (req, res) => {
//     var token = req.header('x-auth');

//     User.findByToken(token).then((user) => {
//         if (!user) {
//             return Promise.reject();
//         }

//         // res.send(user);
//         // req.user = user;
//         // req.token = token;

//         res.send(user);

//     }).cath((e) => {
//         res.status(401).send();
//     });
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});



