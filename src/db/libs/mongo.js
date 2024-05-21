const mongoose = require('mongoose');
const { config } = require('../../config/config');
const connectDB = async() =>{
    try {
        const conn = await mongoose.connect("mongodb+srv://noinblake-336:m673xuaXmAOT4cvv@cluster0.xaxibxw.mongodb.net/?retryWrites=true&w=majority",{
            dbName: 'myChat',
        })
        console.log('mongo database is connected');
        process.on('SIGINT',(()=>{
            console.log('Disconnection');
            process.exit(0)
        }))
    } catch (error) {
        console.log('[DB] Connection error',error)
        process.exit(1);
    }
};


module.exports = connectDB;