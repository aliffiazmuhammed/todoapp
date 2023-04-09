const express = require('express')
const bodyParser = require("body-parser");
const ejs = require("ejs");



const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const todo = []
app.get('/',(req,res)=>{
    res.render('index',{todo:todo});
})

app.post('/',(req,res)=>{
    todo.push(req.body.newItem)
    res.redirect('/')
})

app.listen(3000,()=>{
    console.log('app running succesfully')
})