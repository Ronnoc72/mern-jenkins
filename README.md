Mern Project:
This is a project that is made with mongodb(M), express(E), react(R), and node(N).
Ideas:
<ul>
  <li>Chess</li>
  <li>Recreating my school’s website (front-end)</li>
  <li>Lite Google Docs Clone</li>
</ul>

><b>Chess</b> would be difficult where I am now and it would take a long time to complete with all the styling and functionality. This website would have to have two players to use, because I don’t know how to create a chess ai, and doing the research might take too long. However, this would be a really good exercise for react, which is something that I want to get good at.

><b>Recreating</b> a website would be mainly a styling exercise and not really use mongodb or express. However I could add features to the existing website.

>A <b>Google Docs Clone</b> would be really fun to code and would use a lot more mongodb and express. I could make it look very different from the original with the default as dark theme and different templates if the coding of the website doesn’t take that long.

>After a lot of thinking and reasoning, the website I would want to create is a Google Docs Clone. This would use all of my skills with back-end and front-end, it would be very balanced.

>I use this project open in a ternimal on the <i>MERN</i> directory, create two windows of that same directory. After that for one window type 'cd api', in the other type 'cd client', this lets you go into the other directories. For both windows type the following in order, 'npm install', 'npm start' (AGAIN, FOR BOTH WINDOWS).

Docker:
This project has been dockerized using docker compose and multiple docker files located in the client and server directories of the application. <br/>
The 'docker-compose.yml' file sets up each server to be able to run with each other. The react client and express api are built using their own docker files, triggered by the docker compose file. <br/>
In order to run the application locally, the user needs to have docker installed and running on their machine. Open this project in a terminal on the root directory, (where the 'docker-compose.yml' file is located). Run the command 'docker-compose up', (or without all the log messages, run 'docker-compose -d up').<br/>
Open the application like you would normally, using localhost:3000/login for the client.
