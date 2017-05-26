var mongoose = require ('mongoose');

mongoose.Promise = global.Promise;

// Have to see mongo DB appropriately if this on Heroku
if(process.env.PORT){
    mongoose.connect('mongodb://karthik:Forza123!@ds151631.mlab.com:51631/todoapp1');
}
else{
    mongoose.connect('mongodb://localhost:27017/TodoAppMongoose');
}


module.exports = {mongoose};