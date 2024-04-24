const mongoose = require('mongoose');
const { config } = require('../../config/config');
const connectDB =  async ()=>{

    try{
        
        const conn = await mongoose.connect(config.uriDB,{
            useUnifiedTopology:true,
            useNewUrlParser: true,
            dbName:'myChat'
        });
        console.log('mongo database is connected!!!');
        process.on('SIGINT', function() {
            mongoose.connection.close(function () {
              console.log('Mongoose disconnected on app termination');
              process.exit(0);
            });
          });
    }catch(error){
        console.error(`Error: ${error} `)
        process.exit(1) //passing 1 - will exit the proccess with error
    }

}


module.exports = connectDB;