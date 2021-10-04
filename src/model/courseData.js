
// Accessing monngose package
const mongoose = require('mongoose');

// Database connection (connecting server with database using mongoose package)
// mongoose.connect('mongodb://localhost:27017/libraryapp', { useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.set('useCreateIndex', true);


mongoose.connect('mongodb://localhost:27017/coursemanagement', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false  });


// Schema definition
const Schema=mongoose.Schema;

const CourseSchema=new Schema({
  coursetitle:String,
  description:String,
  imageUrl:String,
  duration:String,
  coursefee:String

});



// Model Creation
var CourseData=mongoose.model('course',CourseSchema);

module.exports = CourseData;