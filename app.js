const express = require('express')
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const getAmericanDate = require(__dirname+'/date.js')


mongoose.connect('mongodb://localhost:27017/TODOLIST');

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const taskschema = new mongoose.Schema({
    task:{
        type: String,
        required : true
    }   
})

const Task = mongoose.model('task',taskschema)


app.get('/',async(req,res)=>{
    const todo = await Task.find()
    var date2 = getAmericanDate()
    console.log(date2)
    res.render('index',{todo:todo,date:date2});
})

app.post('/',async(req,res)=>{
    const task1 = new Task({task:req.body.newItem})
    try{
        await task1.save();
        res.redirect('/')
    }catch(err){
        if(err){
            res.redirect('/') 
        }
    }
    
    
})
app.post('/delete',async (req,res)=>{
    const dltitem = req.body.checkbox;
    await Task.findByIdAndRemove(dltitem)
    res.redirect('/')
})

// app.get('/:pathid',(req,res)=>{
//     const pathid = req.params.pathid

// })

app.listen(3000,()=>{
    console.log('app running succesfully')
})