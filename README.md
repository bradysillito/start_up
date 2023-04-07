# startup
Key Features
- Allows the User to add new workouts
- When a workout is selected they can see the past weight, sets, 
  and reps they completed
- Gives a suggestion of how to improve by allowing you to select 
  a greater amount of weight, sets or reps.

Images
![StartUp Sketch](https://github.com/bradysillito/startup/blob/main/StartUpDrawing.jpg)



Elevator Pitch
Introducing FitTrack, a website designed for all fitness enthusiasts out there. 
This website allows you to easily keep track of your workouts, the weights and 
sets associated with that workout, and monitor your progress over time. FitTrack 
provides you a clear and user-friendly interface that makes it easy for you to 
create, customize and manage your workout plans, and see the progress over time. 
It's an essential tool for those who want to stay on top of their fitness goals 
and see their progress.


Public IP
3.139.172.172

Web Address
http://startfit.click

EC2 Instance allows you to run your servers on amazons machines.

ssh -i [key pair file] ubuntu@[ip address]
key pair file location: Desktop/Winter\ 2023/CS260/production.pem

LEARNED IN SIMON:
- Was good to get more comfortable with HTML
- That you can deploy things to the sub domains that way
- Was great to practice different css techniques, things dont always seem to work the 
way I think they will so practice is important
- Node.js and Express will be super helpful when it comes to adding functionality. Study more about how to use. It is nice that we can run this locally as well. this will be helpfull to retrieve previous workouts for my website
- Important to make sure enviroment variables are set
- const {MongoClient} = require('mongodb');
  const client = new MongoClient(url);
  const scoreCollection = client.db('simon').collection('score');
- remember to reference the cookie authentification so user doesnt need to login every time the page reloads
- Websocket is a little confusing refure too simon code
  

Things to do:
- Figure out how to pass info to the next page(server or through url)
- Able to edit the type of workout
- finish workout button
- see all workouts page (orginzed by date, clicking on it will show type body focus and list of exercises)
