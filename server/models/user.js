var mongoose = require ('mongoose');

var User = mongoose.model('User', {
    name: {
        type : String,
        required : true,
        trim : true,
        minlength : 1
    },
    email : {
        type : String,
        required : true,
        trim : true,
        minlength : 1
    },
    password : {
        type : String,
        trim : true,
        minlength : 1
    }
});

module.exports = {User};

// var newUser = new User({
//     name : 'Karthikeyan',
//     email : 'kpa@forzaconsulting.eu'
// })

// newUser.save().then ((doc) => {
//     console.log('Saved User', doc)
// }, (e) => {
//     console.log('Unable to save user', e);
// });