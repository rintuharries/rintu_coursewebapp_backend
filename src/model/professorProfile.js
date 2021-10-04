
// Accessing monngose package
const mongoose = require('mongoose');

// Database connection (connecting server with database using mongoose package)
// mongoose.connect('mongodb://localhost:27017/libraryapp', { useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.set('useCreateIndex', true);


mongoose.connect('mongodb://localhost:27017/coursemanagement', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false  });


// Schema definition
const Schema=mongoose.Schema;

const ProfSchema=new Schema({
    fullname:String,
    qualification:String,
    email:String,
    password:String,
    designation:String
});



// Model Creation
var Teacher=mongoose.model('teacher',ProfSchema);

module.exports = Teacher;