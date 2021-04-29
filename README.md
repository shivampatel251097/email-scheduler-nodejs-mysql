# email-scheduler-nodejs-mysql

Problem statement:

Problem Statement : Build a simple API to schedule emails and send them
➔ Any Framework of your choice (NodeJS as backend)
➔ Any Database of your choice
➔ Any Email Provider of your choice (suggestion : Sendgrid)

Requirements :
● Create, Read, List, Update and Delete functionalities must be available for
scheduling
● Rescheduling (ie., Update) is an important feature
● API route to list all failed/unsent scheduled emails
Non-Requirements:
● UI is not required
● Authentication is not required
● Email templates are not required (simple email with text is enough) 


Mail Delivery Scheduler API DOCUMENTATION

1) To Visit HomePage or welcome to express server page: 
Link: http://localhost:3307/
2) Get list of all the users in database
Endpoint: http://localhost:3307/users
Method: GET
Response: [
    {
        "user_id": 1,
        "name": "Shivam Patel",
        "email": "shivampatel251097@gmail.com",
        "phone_number": "7355362257"
    },
    {
        "user_id": 3,
        "name": "shibbu",
        "email": "shibbu251097@gmail.com",
        "phone_number": "7355362257"
    }
]
Screenshot of Request from Postman: 
 


3) Add new User in mail user list
Endpoint: http://localhost:3307/users
Method: POST
Body: : raw/JSON
{
    "name":"shibbu",
    "email":"shibbu251097@gmail.com",
    "phone_number":"7355362257"
}
Response: "User created with id 4"
Screenshot of Request from Postman: 
 

4) Update User in list by user_id
Endpoint: http://localhost:3307/users/2
Method: POST
Body: raw/JSON
{
    "name":"shibbu patel",
    "email":"shibbu12345@gmail.com",
    "phone_number":"7355362257"
}
Response:User details updated successfully!
Screenshot of Request from Postman: 
 


5) Delete User from list by user_id
Endpoint: http://localhost:3307/users/2
Method: DELETE
Body: : raw/JSON
Response:User deleted with id 2
Screenshot of Request from Postman: 
 


6) Schedule job which sents mail to each and every mail id in user_list
Endpoint: http://localhost:3307/scheduleMail
Method: POST
Body:  raw/JSON
{
    "jobName":"job1",
    "dateTime":"29/03/2021T13:59:00",
    "subject": "Holi Celebration 2K21",
    "html": "<h2>Happy Holi to you and your family!</h2><p>Please visit Plenty mall at 9 Pm tomorrow for Holi celebration</p>"

}
Response: "Job scheduled successfully and Mail will be sent to all the Subscribers at the sheduled time!"
 


7) Cancel Shceduled Job
Endpoint: http://localhost:3307/cancelScheduledJob
Method: POST
Body: : raw/JSON
{
    "jobName": "job1"
}
Response: Job titled job1 has been removed from the Scheduler!
 

8) Reschedule scheduled job
Endpoint: http://localhost:3307/reScheduleJob
Method: POST
Body: : raw/JSON
{
    "jobName":"job1",
    "dateTime":"29/03/2021T13:58:00"
}
Response: Job titled job1 has been rescheduled to 29/03/2021T13:58:00
Screenshot: 
 

Database Architecture:  It has only 1 table user_list which has 4 fields.
 

