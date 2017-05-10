 var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/student');
var Student = require('./models/student.js');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
//Insert
app.post('/insert',function(req,res){
    var data=req.body;
    console.log(data);
    Student.addStudent(data,function(err,result){
    if(result){
response = {
    "result": "Data inserted"
}
res.json(response);
}
else{
    error = {
        "error" : "Insertion Failed!"
    }
    res.json(error);
}
});
});
app.get('/getter',function(req,res){
    var roll = req.query.roll;
    Student.getDetails(roll,function(err,data){
      if(err){
    res.json({"err":"error"});
      } else{
        res.json(data);
        }
    })
})

app.post('/updte',function(req,res){
    var id= req.body._id;
    var mobile,number;
    var data ={
        mobile : req.body.mobile,
        number : req.body.number
    }
    Student.updateStudent(id,data,{upsert: true},function(err,data){
       if(err){
    throw err;
      } else{
        res.json(data);
      } 
    })
})
app.post('/delete',function(req,res){
    var id = req.body._id;
    Student.removee(id,function(err,data){
        if(err){
            throw err;
        } else{
        result ={
            "Message":"Data removed"
        }
        res.json(result);
        }
    })
})
app.listen('8080');
console.log("listening at : 3000");