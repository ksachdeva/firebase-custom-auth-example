# Note at this time the application is not functional because of the bug in AngularFire2 beta 2

# Custom authentication using AngularFire2

Custom authentication means that your server is going to take care of authenticating the user. On successful
authentication the server will return a JWT (JSON Web Token) that the front end client application will 
submit to the firebase.

## Setup 

Both the server and client applicaticons require their corresponsing credentials.

### Server setup
* Please follow the instructions at https://firebase.google.com/docs/server/setup#add_firebase_to_your_app to setup 
the service account. 
* Make sure to download your credential file (JSON file) and rename it to fb_credentials.json. 
* Copy fb_credentials.json to server folder
* In server/app.js, replace FB_DB_URL to your database URL

### Client setup

* Go to your firebase console
* Go to the Auth menu
* Click on Web Setup and copy the client credentials
* In client/src/app/main.ts update the constants to use the values from Web Setup

## Running

### Server

```
cd firebase-custom-auth-example/server
npm install
nodemon app.js
```

You will have the application running at http://localhost:8080

#### Client

```
cd firebase-custom-auth-example/server
npm install
typings install
npm start
```

You will have the application running at http://localhost:3000

## Test Credentials

```
Email : ksachdeva@someemail.com
Password: password1
```







