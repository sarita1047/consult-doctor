const mongoose = require('mongoose')
const validator = require('validator')
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const User = mongoose.model('User', {
//     name: {
const HospitalSchema =new  mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add Hospitals name'],
        trim: true,
        unique:true
    },
    phone:{
        type:String,
        maxLength:[10,'Phone number can not be longer than 10 characters']
    },
    address:{
        type:String,
        required:[true,'Please add Hospitals address ']
    },
    services:{
        type:String,
        required:[true,'Please add Hospitals service provided']
    },
    parking:{
        type:String,
        required:[true,'Please mention if parking available at hospitals ']
    }
    // open:{
    //     type:String,
    //     required:[true,'Please add hospitals open']
    // }
    
});
//Sign JWT and return
HospitalSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    }) ;
}
module.exports = mongoose.model('Hospital',HospitalSchema);