'use strict';

var User = require('../model/loginModel.js');


//List all Users in the list
exports.listAllUsers = function(req, res) {
     User.listAllUsers(function(err, user) {
       if (err)
        res.status(500).send(err);
      res.status(200).json(user);
     });
   };


   //Post new User in DB
exports.postNewUser = function(req, res) {
     User.postNewUser(req.body, function(err, user) {
       if (err)
         res.status(500).send(err);
       res.status(200).json(user);
     });
   };


//Update user detail with the help of user_id
exports.updateUserDetails = function(req, res) {
    User.updateUserDetails(req.params.userID,req.body, function(err, user) {
      if (err)
        res.status(500).send(err);
      res.status(200).send(user);
    });
  };

  
//Delete the User from List
exports.deletUser = function(req, res) {
    User.deletUser(req.params.userID,function(err, user) {
      if (err)
        res.status(500).send(err);
      res.status(200).send(user);
    });
  };

//Schedule the new job 
exports.scheduleMail = function(req, res) {
    User.scheduleMail(req.body, function(err, user) {
      if (err)
        res.status(500).send(err);
      res.status(200).json(user);
    });
  };


  //Cancel the scheduled job
exports.cancelScheduledJob = function(req, res) {
    User.cancelScheduledJob(req.body,function(err, user) {
      if (err)
        res.status(500).send(err);
      res.status(200).send(user);
    });
  };

  //reschedule the scheduled job to other time
  exports.reScheduleJob = function(req, res) {
    User.reScheduleJob(req.body,function(err, user) {
      if (err)
        res.status(500).send(err);
      res.status(200).send(user);
    });
  };


