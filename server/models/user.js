const validator = require('validator');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const lodash = require('lodash')
const bcrypt = require('bcryptjs')

// UserModel = {
//     email : 'kpa@forzaconsulting.eu',
//     password : 'some password string',
//     tokens : [{
//         access : 'token type',
//         token : 'token value'
//     }]
// }

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        }
    }]
})

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return lodash.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'kathirvSecret').toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function (token) {
   var user = this;

   return user.update({
       $pull : {
           tokens : {token}
       }
   });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'kathirvSecret');
    }
    catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

var User = mongoose.model('User', UserSchema);

module.exports = { User };

// var newUser = new User({
//     name : 'Karthikeyan',
//     email : 'kpa@forzaconsulting.eu'
// })

// newUser.save().then ((doc) => {
//     console.log('Saved User', doc)
// }, (e) => {
//     console.log('Unable to save user', e);
// });