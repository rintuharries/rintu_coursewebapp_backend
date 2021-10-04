const express=require('express');
const app = new express();
const cors=require('cors');
const jwt=require('jsonwebtoken');
const nodemailer = require('nodemailer');

const Student = require('./src/model/studentProfile');
const Teacher = require('./src/model/professorProfile');


const courseData = require('./src/model/courseData');
const courseApp=require('./src/model/course');



app.use(cors());
app.use(express.json());


    //signup
    
    app.post('/signup', (req, res) => {
      res.header("Access-Control-Allow-Origin","*")
      res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
      // console.log("hi")
        console.log(req.body);
         Student.findOne({email : req.body.email}).exec(function(err,user){
        console.log(user);
        if(user) {
          res.status(401).send('User exists')
          console.log("user exists");
        } 

        else{

         var data = {
              firstname : req.body.firstname,
              lastname: req.body.lastname,
              qualification:req.body.qualification,
              email : req.body.email,
              password : req.body.password,
              phone: req.body.phone,
            
    }
    var data = new Student(data);
    data.save();
  }
})
 })

 app.get('/studuser/:id', function (req, res) {
  const id = req.params.id
  // console.log("the user object id is" + id);
  Student.findOne({ "_id": id })
      .then((student) => {
          res.send(student);
      });
});


 //signup for teachers

 app.post('/signupprof', (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  console.log(req.body);
     Teacher.findOne({email : req.body.email}).exec(function(err,user){
    console.log(user);
    if(user) {
       res.status(200).send({user})
      console.log("user exists");
    } 

    else{

     var data = {
      fullname:req.body.fullname,
      qualification:req.body.qualification,
      email:req.body.email,
      password:req.body.password,
      designation:req.body.designation
}
var data = new Teacher(data);
data.save();  
}
})
})

app.get('/profs', function(req,res){
Teacher.find()
.then(function(profs){
    // console.log(res.body.users.name);
    res.send(profs);
})
.catch(err => {
    console.log(err);
});
});

 


//login for teachers
app.post('/login', (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  if(req.body.email=="" && req.body.password=="anumary12"){
    let payload={subject:email+password}
    let token=jwt.sign(payload,'secretKey')  
    res.status(200).send({token})
    console.log("token")
  }
  else {
    Teacher.findOne({email: req.body.email, password:req.body.password},function(err,user){

    if(!user){ 
      res.status(401).send('User not registered');
    }
    else{
     res.status(200).send({user});
     console.log("success");
    }
  })
} 
    
  });

//student login
 email="arunima90M@gmail.com"
 password="Anumary@1"
app.post('/loginstud', (req, res) => {
  
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

      
      if(req.body.email=="admin@gmail.com" && req.body.password=="Admin123@"){
        let payload={subject:email+password}
        let token=jwt.sign(payload,'secretKey')  
        res.status(200).send({token})
        console.log("token")
      }
      else{
        Student.findOne({email: req.body.email, password:req.body.password},function(err,student){
          // console.log("email : "+email)
          if(!student){ 
            res.status(401).send('Student not registered')
          }
          else{
           res.status(200).send({student})
           console.log("success")
          }
        })
      }
      })


//*******************************************************


app.post('/addcourse',function (req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.file);
 var item={
  
   coursetitle:req.body.coursetitle,
   description:req.body.description,
   imageUrl:req.body.imageUrl,
   duration:req.body.duration,
   coursefee:req.body.coursefee
}
var course = courseData(item); 
console.log("course details :" +item)
course.save();
});
app.get('/courses',function(req,res){
    
  courseData.find()
              .then(function(courses){
                  res.send(courses);
              });
});

app.get('/courses',  (req, res) => {
  
  const id = req.params.id;
    courseData.findOne({"_id":id})
    .then((course)=>{
        res.send(course);
    });
})

app.post('/editcourse', (req, res) => {
  
      id = req.body._id;
  
    courseData.findByIdAndUpdate({ "_id": id },
      {
          $set: {
            "coursetitle":coursetitle,
            "description":description,
            "imageUrl":imageUrl,
           "duration":duration,
            "coursefee":coursefee
          }
      })
      .then(function () {
          res.send();
      })
})

// app.post('/applycourse',function (req,res){
//   res.header("Access-Control-Allow-Origin","*")
//   res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
//   // console.log(req.file);
// var item={
//   _id: new mongoose.Types.ObjectId(),
//   name:req.body.name,
//   email:req.body.email,
//   phno:req.body.phno,
//   qualification:req.body.qualification,
//   course:req.body.course,
//   mode:req.body.mode,
//   Status :req.body.Status,
//   student :req.body.student,
//   studentID :req.body.studentID
// }
// var courseapp = courseApp(item);
// courseapp.save();
// })

app.post('/applycourse' ,function(req, res){
  //console.log(req.body);
  const mongoose = require('mongoose');
  var item = {
    _id: new mongoose.Types.ObjectId(),
    name:req.body.name,
    email:req.body.email,
    phno:req.body.phno,
    qualification:req.body.qualification,
    course:req.body.course,
    mode:req.body.mode,
    Status :req.body.Status,
    student :req.body.student,
    studentID :req.body.studentID
  };
  var courseapp = new courseApp(item);
  courseapp.save();
});

app.get('/coursesapp',function(req,res){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT,DELETE,OPTIONS ");
   courseApp.find()
    .then(function(courseapp){
      console.log(courseapp)
          res.send(courseapp);           
      })    

    });
    app.get('/studuser/:id', function (req, res) {

      const courseid = req.params.id
      // const courseid="60fb1bcfb650c7e41eb0c1bd"
      // console.log("courseid is " + courseid);
      courseApp.findOne({ "_id": courseid })
          .then((courseapp) => {
              // console.log("course details are " + course);
              res.send(courseapp);
          });
  });

  app.get('/courseapp/:id', function(req, res){
   
    res.header("Access-Control-Allow-Origin","*");
     res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT,DELETE,OPTIONS ");
     const id =req.params.id
        courseApp.findOne({"_id": id})
       .then(function(courseapp){
        
             res.send(courseapp);     
  
  });
  });
app.get('/appliedcourses/:id', function (req, res) {
  const courseid = req.params.id
  // console.log("student id  is " + courseid);
  courseApp.find({ "studentID": courseid })
      .then((courses) => {
          res.send(courses);
      });
});

app.get('/appliedcourse/:id', function (req, res) {

  const courseid = req.params.id
 
  courseApp.findOne({ "_id": courseid })
      .then((course) => {
          // console.log("course details are " + post);
          res.send(course);
      });
});
app.post('/approvecourse',(req,res)=>{
  let user={
    id:req.body._id,
    email:req.body.email,
    course:req.body.course

  }

  console.log("course is",user.course);
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'arunima90M@gmail.com',
      pass: 'anumary12'
    }
  });
  console.log("user email",user.email);
  let mailDetails = {
    from: 'arunima90M@gmail.com',
    to: user.email,
    subject: 'Status of Application',
    html:`<h1>The application for ${user.course} is approved </h1>`
  };
  
  mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
      console.log('Error Occurs');
    } else {
      console.log('Email sent successfully');
    }
  });
  
 
})

app.post('/rejectcourse',(req,res)=>{

    id=req.body._id,
    email=req.body.email,
    course=req.body.course,
    Status=req.body.Status

  // let mailTransporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'arunima90M@gmail.com',
  //     pass: 'anumary12'
  //   }
  // });
  
  // let mailDetails = {
  //   from: 'arunima90M@gmail.com',
  //   to: user.email ,
  //   subject: 'Status of Application',
  //   html:`<h1>The application for ${user.course} is rejected </h1>`

  // };
  
  // mailTransporter.sendMail(mailDetails, function(err, data) {
  //   if(err) {
  //     console.log('Error Occurs');
  //   } else {
  //     console.log('Email sent successfully');
  //   }
  // });
})
app.get('/', function (req, res) {
 
  courseApp.find({ "Status":"Approved"})
      .then((courseapp) => {
          console.log("course details are " + courseapp);
          res.send(courseapp);
      });
});

app.get('/', function (req, res) {
 
  courseApp.find({ "Status":"Rejected"})
      .then((courseapp) => {
          console.log("course details are " + courseapp);
          res.send(courseapp);
      });
});
  app.listen(8000, function(){
    console.log('listening to port 8000');
});