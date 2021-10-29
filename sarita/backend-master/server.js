const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./src/middleware/logger');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const errorHandler = require('./server/middleware/error');
const mongoose = require("mongoose");


//Route files 
const admin= require('./server/routes/admin')
const user= require('./server/routes/user')
const doctor = require('./server/routes/doctor')
const hospital = require('./server/routes/hospital')
//const notice= require('./server/routes/notice')
const healthCenter = require('./server/routes/healthCenter')

const auth= require('./server/routes/auth')
//Load env vars
// dotenv.config({path:'./config/config.env'});

const http =require('https');  //add lter
var fs = require('fs');  //addded later

const app = express();
//Connect Db
//connectDB();

const PORT = process.env.PORT || 5000;

//Body parser

app.use(express.json());
// app.use(logger);
//Dev logging middleware
// if(process.env.NODE_ENV ==='development'){
//     app.use(morgan('dev'));
// }

//File uploading
app.use(fileupload());

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Mount routers

app.get('/', function (req, res) {
    res.send('hello world')
  })
  app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET ,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use('/api/user',user);
app.use('/api/auth',auth);
app.use('/api/doctor',doctor);
app.use('/api/hospital',hospital);
//app.use('/api/notice',notice);
app.use('/api/healthCenter',healthCenter);
app.use('/api/admin',admin)

app.use(errorHandler);


const mongoUri =
  "mongodb+srv://sarita:Sarita123@cluster0.bktup.mongodb.net/Doctor?retryWrites=true&w=majority";
if (!mongoUri) {
  throw new Error(`MongoURI Error `);
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connection successfull", () => {
  console.log("Connected to mongo ");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo DB ", err);
});
//app.listen(
   // PORT,
    // '192.168.1.164',
   // console.log('Server running in + mode on port'+PORT)
   // );
   
   app.listen(PORT, () => {
    console.log("Listening on port"+PORT);
  });

