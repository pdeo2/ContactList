const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose')
const contact=require('./models/contact') // This module contain collection of schemas from database
const app=express();


// Register an error listener for the emitter
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));

app.use(express.static('Assest'));

// An Empty Array
var contactList=[];

// This function is used to fetch data from Database
app.get('/',(req,res)=>{
    // return res.render('home',
    // {title:"Contact List",
    // contact_list:contactList});
    contact.find({},(err,contacts)=>{
        if(err){
            console.log("Error Fetching Data from DB");
            return;
        }
        return res.render('home',{
            title:'ContactList',
            contact_list:contacts
    })

        })
    })
// Now this function is used to populate the database
app.post('/create-contact',function(req,res){
//    contactList.push({
//       name:req.body.name,
//      phone:req.body.phone
// })
contact.create({
    name:req.body.name,
    phone:req.body.phone

})
.then(newContact=>{
    console.log("!!!!!!!",newContact);
    return res.redirect('back');
})
.catch(err=>{
    console.log('Something Went Wrong',err);
        return;
});
// ,function(err,newContact){
//     if(err){
//         console.log('Something Went Wrong');
//         return;}

// console.log("!!!!!!!",newContact);
//     return res.redirect('back');
//contactList.push(req.body);
// console.log(req.body);
//  return res.redirect('back');
});

app.get('/delete-contct/',function(req,res){   //This function is used to delete  entry from the database
    // For Fetching Phone no 
    // let phone=req.query.phone;
    // console.log(phone);
    let id=req.query.id;

    // let contacI=contactList.findIndex(contact=>contact.phone==phone);
    contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error Fetching");
            return;
        }
        return res.redirect('back');
    })
    // if(contacI!=-1){
    //     contactList.splice(contacI,1);
    // }
    // return res.redirect('back');

})
  app.get('/',function(req,res){
     return res.render('home',{title:"Express Js"})
 });
app.get('/practice',function(req,res){
    return res.render('practice',{title:"Backend"})
 });
//This function is used to start the server
app.listen(port,function(err){
    if(err){
        console.log("Error in Runinng",err);
    }
    console.log("Express Server Running up",port);
});