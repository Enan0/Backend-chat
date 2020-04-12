const mongoose = require('mongoose')
const URI = 'mongodb://localhost/chatApp';
const connectDb = async()=>{
    return mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(db=>{
        console.log("Db connected");
    })
}


connectDb()
.catch(err=>{
    console.log(`Error to connect db '${err.message}'`);
    connectDb();
})

module.exports =mongoose.connection;