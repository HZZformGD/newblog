const mongoose=require('mongoose');

mongoose.Promise = global.Promise;

const connect=mongoose.connect('mongodb://localhost/todo');


module.exports={
    mongoose,
    connect
}