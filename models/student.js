var mongoose = require('mongoose');
var studentSchema = mongoose.Schema({
    _id : {
        type : String,
        required : true
    },
    number : {
        type : Number,
        required : true
    },
    mobile : {
        type : Number,
        required:true
    }
});
//insert
var Student = module.exports = mongoose.model('StudentCollection',studentSchema);
module.exports.addStudent = function(student,callback){
    Student.create(student,callback);
}
//update
module.exports.updateStudent = function(id,student,options,callback){
    var query = {
        _id:id
        };
var update = {
    number: student.number,
    mobile: student.mobile
}
Student.findOneAndUpdate(query,update,{},callback);
}
module.exports.getDetails = function(name,callback){
    Student.find({_id:name},callback);
}
module.exports.removee = function(id,callback){
    Student.remove(id,callback);
}
