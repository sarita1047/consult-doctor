const mongoose = require('mongoose');

const connectDB =async() =>{
    const conn= await mongoose.connect('mongodb+srv://sarita:Sarita123@cluster0.bktup.mongodb.net/Doctor?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology: true
    });

    console.log('Mongo Db connected:');
}


module.exports = connectDB;