const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/coursemanagement', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false  });


// Schema definition
const Schema=mongoose.Schema;

const CourseappSchema=new Schema({
_id : mongoose.Schema.Types.ObjectId,
name:String,
email:String,
phno:Number,
qualification:String,
course:String,
mode:String,
Status : String,
student : String,
studentID : String

});



// Model Creation
var CourseApp=mongoose.model('courseapp',CourseappSchema);

module.exports = CourseApp;