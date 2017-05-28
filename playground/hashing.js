const {SHA256} = require ('crypto-js');
const jwt = require ('jsonwebtoken');

var data = {
    id : 4
};

var token = jwt.sign(data, 'kathirvSecret');
console.log(token);

var decoded = jwt.verify(token, 'kathirvSecret');
console.log(decoded);

// var password = 'mypassword123';
// var hashPassword = SHA256(password).toString();

// console.log(`Password is ${password} and its hashed value is ${hashPassword}`);

// var data = {
//     id : 4
// };

// console.log(data);

// var token = {
//     data,
//     hash : SHA256(JSON.stringify(data) + 'mysecret').toString()
// }

// console.log(token);

// var returnHash = SHA256(JSON.stringify(data) + 'mysecret').toString()

// console.log(returnHash);