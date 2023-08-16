const express = require('express')
const app = express()
const bodyparser =require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactdance',{useNewUrlParser:true});
const port =8000
const path  =require("path")
// Defiend mongoose schema 
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String
});
const contact = mongoose.model('contact', contactSchema);
// Express specific STUff
app.use('/static',express.static('static'))  //for serving static files
app.use(express.urlencoded())
// PUB specific STUFF
app.set('view engine','pug')         //set a template engine as a pug
app.set('views',path.join(__dirname,'views'))// set the views directory 


// our pug demo Endpoint 
app.get('/', (req, res) => {
  const params = {'title':'pubg is the best game'} 
  res.status(200).render('index.pug')
})
app.get('/home', (req, res) => {
  const params = {'title':'pubg is the best game'} 
  res.status(200).render('home.pug')
})
app.get('/contact', (req, res) => {
  const params = {'title':'pubg is the best game'} 
  res.status(200).render('contact.pug')
})
app.post('/contact',(req,res)=> {
  const myData = new contact(req.body);
  myData.save().then(()=>{
    res.send('this item has been saved to the database')
  }).catch(()=>{
    res.status(400).send("items not save in database")
  })
  // res.status(200).render('contact.pug',)
})
  //Starting the Server
app.listen(8000,()=>{
    console.log('Express app listening at http://localhost:8000')
})