const mongoose = require('mongoose');


const DB_URL = 'mongodb://localhost:27017/demo';

mongoose.connect(DB_URL);


mongoose.connect.on('connected', function(){
    console.log('Mongoose connection open to' + DB_URL);
});

mongoose.connect.on('error', function(){
    console.log('Mongoose connection error:' + error);
});

mongoose.connect.on('disconnected', function(){
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;