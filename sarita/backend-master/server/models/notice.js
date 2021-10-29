const mongoose = require('mongoose')
const validator = require('validator')
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const User = mongoose.model('User', {
//     name: {
const NoticeSchema =new  mongoose.Schema({
    description: {
        type: String,
        required: [true,'Please add Description'],
        
    },
   
    date:{
        type:Date,
        required:[true,'Please add Date']
    },
    title:{
        type:String,
        required:[true,'Please add Title']
    }
});

//Sign JWT and return
NoticeSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    }) ;
}



module.exports = mongoose.model('Notice',NoticeSchema);