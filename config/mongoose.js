
//Require the library
const mongoose=require('mongoose');
//connect to the database
mongoose.connect('mongodb://0.0.0.0:27017/Contactlist');
//Acquire the connection 
const db=mongoose.connection;
//error then print this
db.on('error',console.error.bind(console,'error sommething in DB'));
//otherwise print successful 
db.once('open',function(){
    console.log("Succesfully Connected to DB");
})