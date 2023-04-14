const express = require('express')
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const getAmericanDate = require(__dirname+'/date.js')
const _ = require('lodash')


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


const pathschema = new mongoose.Schema({
    name : String,
    item : [taskschema]
})

const Task = mongoose.model('task',taskschema)
const Path = mongoose.model('path',pathschema)
var date2 = getAmericanDate()

app.get('/',async(req,res)=>{
    const todo = await Task.find()
    res.render('index',{todo:todo,date:date2});
})



app.post('/',async(req,res)=>{
    const task1 = new Task({task:req.body.newItem})
    if(date2 === req.body.list){
        
    try{
        await task1.save();
        res.redirect('/')
    }catch(err){
        if(err){
            res.redirect('/') 
        }
    }
    }else{
        const list = await Path.findOne({name:req.body.list})
        console.log(list)
        list.item.push(task1)
        await list.save()
        res.redirect('/'+req.body.list) 
    }
    
    
    
})


app.post('/delete',async (req,res)=>{
    const dltitem = req.body.checkbox;
    const dltpath = req.body.hidden;
    if(date2 === dltpath){
        await Task.findByIdAndRemove(dltitem)
        res.redirect('/')
    }else{
        const dltpathitem = await Path.findOneAndUpdate({name:dltpath},{$pull:{item:{_id:dltitem}}})
        res.redirect('/'+dltpath)
    }
    
})



const defualitems=['welcome to todolist']
app.get('/:pathid',async(req,res)=>{
    const pathid = _.capitalize(req.params.pathid)
    try{
        const hello=await Path.findOne({name:pathid})
        if(hello ===null){
            const path1 = new Path({name:pathid})
            await path1.save()
            res.redirect('/'+Path.name) 
        }else{
            const pathfinder = hello.item
            res.render('index',{todo:pathfinder,date:pathid});
        }
        
        
    }catch(err){
        if(err){
            
        }
    }
})

app.listen(3000,()=>{
    console.log('app running succesfully')
})