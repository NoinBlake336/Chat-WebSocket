const transformObject ={
    json:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id;
        delete returnedObject._id
        delete returnedObject.__v
    }
};


module.exports = {transformObject};