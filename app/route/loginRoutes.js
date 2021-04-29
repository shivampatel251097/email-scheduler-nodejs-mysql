'use strict';
module.exports = function(app) {
  var UserController = require('../controller/loginController.js');

    app.route('/users')
    .get(UserController.listAllUsers)
    .post(UserController.postNewUser);

    app.route('/users/:userID')
    .post(UserController.updateUserDetails)
    .delete(UserController.deletUser);

    app.route('/scheduleMail')
    .post(UserController.scheduleMail);

    app.route('/cancelScheduledJob')
    .post(UserController.cancelScheduledJob);

    app.route('/reScheduleJob')
    .post(UserController.reScheduleJob);

   };