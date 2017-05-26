var mongoose = require ('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type : String,
        required : true,
        trim : true,
        minlength : 1
    },
    completed : {
        type : Boolean,
        default : false
    },
    completedAt : {
        type : Number,
        default : 0
    }
});

module.exports = {Todo};



// var newTodo = new Todo ({
//     text : 'Cook dinner'
// });

// newTodo.save().then ((doc) => {
//     console.log('Saved todo', doc)
// }, (e) => {
//     console.log('Unable to save todo');
// });

// var newTodo = new Todo ({
//     text : 'Add validations to code'
// });

// newTodo.save().then ((doc) => {
//     console.log('Saved todo', doc)
// }, (e) => {
//     console.log('Unable to save todo', e);
// });