const mongoose = require('mongoose');

async function connectToMongoB(url){
    return mongoose.connect(url)
}

module.exports = {
    connectToMongoB
}