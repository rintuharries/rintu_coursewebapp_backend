
// Accessing monngose package
const mongoose = require('mongoose');

// Database connection (connecting server with database using mongoose package)
// mongoose.connect('mongodb://localhost:27017/libraryapp', { useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.set('useCreateIndex', true);


mongoose.connect('mongodb://localhost:27017/coursemanagement', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false  });


// Schema definition
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    firstname:String,
    lastname:String,
    qualification:String,
    email:String,
    password:String,
    phone:String,
    
});



// Model Creation
var Student=mongoose.model('student',UserSchema);

module.exports = Student;