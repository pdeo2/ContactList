const mongoose=require('mongoose');
const contctschema=new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    phone:{
        type:String,
        required:true
    }
});
const contact=mongoose.model('Contact',contctschema);
module.exports=contact;