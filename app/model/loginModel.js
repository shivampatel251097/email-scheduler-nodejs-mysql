'user strict';
var express = require("express");
const schedule = require('node-schedule');

const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      // type: "OAuth2",
      user: "patelshivam251097@gmail.com",
      pass: process.env.PASS
      // clientId: process.env.CLIENT_ID_GMAIL,
      // clientSecret: process.env.CLIENT_SECRET_GMAIL,
      // refreshToken: process.env.REFRESH_TOKEN_GMAIL
    }
  });

//logging
const log = require('log-to-file');

var pool = require('./db.js');
//User object constructor

var User = function(user){
    this.user_id=user.user_id;
    this.name=user.name;
    this.email=user.email;
    this.phone_number=user.phone_number;
};

//List all Users in the list
User.listAllUsers = function (result) {
    //Getting pool connection
    pool.getConnection(function(errorC,conn)
    {
        if(errorC){
            result(null,'Error occured while connecting to database');
            log('Error while connecting to the database with error'+errorC); 
        }
        else{           
            conn.query("Select * from user_list;", function (err, res) {             
            if(err) {
                console.log("error: ", err);
                log('Error while getting list of all users with '+err); 
                result(err, null);
            }
            else{
                conn.release(); 
                log('Successfully extracted all the users list'); 
                result(null, res);
            }
                })  
            }       
    })
};


   //Post new User in DB
User.postNewUser = function (newUser,result) {
    //Getting pool connection
    pool.getConnection(function(errorC,conn)
    {
        if(errorC){
            result(null,'Error occured while connecting to database');
            log('Error while connecting to the database with error'+errorC); 
        }
        else{           
           conn.query("INSERT INTO user_list set ?", [newUser], function (err, res) {         
            if(err) {
                console.log("error: ", err);
                log('Error while creating new user with error '+err); 
                result(err, null);
            }
            else{
                conn.release();
                log('User created successfully with '+ res.insertId); 
                result(null, "User created with id "+res.insertId);
            }
                })  
            }       
    })
};


//Update user detail with the help of user_id
User.updateUserDetails = function (userID,updatedData,result) {
    //Getting pool connection
    pool.getConnection(function(errorC,conn)
    {
        if(errorC){
            result(null,'Error occured while connecting to database');
            log('Error while connecting to the database with error'+errorC); 
        }
        else{           
           conn.query("update user_list set name= ? , email = ? , phone_number = ? where user_id =?", [updatedData.name, updatedData.email, updatedData.phone_number, userID], function (err, res) {         
            if(err) {
                console.log("error: ", err);
                log('Error while updating user with user_id = '+userID + ' with error '+err); 
                result(err, null);
            }
            else{
                conn.release();  
                log('User detail successfully updated with user_id = '+userID); 
                result(null, "User details updated successfully!");
            }
                })  
            }       
    })
};


//Delete the User from List
User.deletUser = function (userID,result) {
    //Getting pool connection
    pool.getConnection(function(errorC,conn)
    {
        if(errorC){
            result(null,'Error occured while connecting to database');
            log('Error while connecting to the database with error'+errorC); 
        }
        else{           
           conn.query("DELETE from user_list where user_id =?", [userID], function (err, res) {         
            if(err) {
                console.log("error: ", err);
                log('Error while deleting user with user_id = '+userID + ' with error '+err); 
                result(err, null);
            }
            else{
                conn.release();
                log('User deleted successfully with user_id = '+userID); 
                result(null, "User deleted with id "+userID);
            }
                })  
            }       
    })
};

//Schedule the new job 
User.scheduleMail = function (reqData,result) {
    var reqdata = reqData;
    //Getting pool connection
    pool.getConnection(function(errorC,conn)
    {
        if(errorC){
            result(null,'Error occured while connecting to database');
            log('Error while connecting to the database with error'+errorC); 
        }
        else{           
            conn.query("Select * from user_list;", function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                conn.release();
                var dateTime = reqdata.dateTime;
                var datePart = dateTime.split('T')[0];
                var date = datePart.split('/')[0];
                var month = datePart.split('/')[1];
                var year = datePart.split('/')[2];
            
                var timePart = dateTime.split('T')[1];
                var hour = timePart.split(':')[0];
                var min = timePart.split(':')[1];
                var sec = timePart.split(':')[2];
            
                const scheduleDate =new Date(year,month,date,hour,min,sec);
                var job = schedule.scheduleJob(reqdata.jobName,scheduleDate, ()=>{
                    console.log(reqdata.jobName);
                    for(let i=0;i<res.length;i++){
                    let mailOptions = {
                    from: 'patelshivam251097@gmail.com',
                    to: res[i].email,
                    subject: reqdata.subject,
                    html: reqdata.html
                    }
                    transporter.sendMail(mailOptions, function(err, res){
                        if (err) {
                        log('Error while sending mail to  '+mailOptions.to+' and error is '+err, 'mail-logs.log');
                        console.log(err);
                        } 
                        else {
                        log('Mail sent successfully to '+mailOptions.to +' with message '+res.response,'mail-logs.log');
                        console.log('Email sent: ' + res.response);
                    }
                      });
                    }
                    console.log("Mail Sent to all the users in UsersList!")
                })
                // console.log("schedule Object: "+schedule);
                result(null,"Job scheduled successfully and Mail will be sent to all the Subscribers at the sheduled time!");
            }
                })  
            }       
    })
};

  //Cancel the scheduled job
User.cancelScheduledJob = function (reqData,result) {
    var myJob = schedule.scheduledJobs[reqData.jobName];
    if(typeof(myJob) === 'undefined'){
        log('Error while cancelling the scheduled job: '+reqData.jobName);
        result(null, "There is no job Scheduled with the name "+reqData.jobName);
    }
    else{
    myJob.cancel();
    log('Successfully cancelled the scheduled job with the name: '+reqData.jobName);
    result(null,"Job titled "+reqData.jobName+" has been removed from the Scheduler!");
    }
};


//reschedule the scheduled job to other time
User.reScheduleJob = function (reqData,result) {
    var dateTime = reqData.dateTime;
    var datePart = dateTime.split('T')[0];
    var date = datePart.split('/')[0];
    var month = datePart.split('/')[1];
    var year = datePart.split('/')[2];

    var timePart = dateTime.split('T')[1];
    var hour = timePart.split(':')[0];
    var min = timePart.split(':')[1];
    var sec = timePart.split(':')[2];

    const scheduleDate =new Date(year,month,date,hour,min,sec);
    var myJob = schedule.scheduledJobs[reqData.jobName];
    if(typeof(myJob) === 'undefined'){
        log('Error while rescheduling the scheduled job: '+reqData.jobName);
        result(null, "There is no job Scheduled with the name "+reqData.jobName+". Please try with correct jobname!");
    }
    else{
    myJob.cancel(true);
    myJob.reschedule(scheduleDate);
    log('Successfully rescheduled the scheduled job with the name: '+reqData.jobName);
    result(null,"Job titled "+reqData.jobName+" has been rescheduled to "+reqData.dateTime);
    }
};

module.exports= User;