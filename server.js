// server.js

//we are initializing our app as an instance of express, the framework
const express = require('express');

//we are using mongoclient in order to interact with the database
const MongoClient = require('mongodb').MongoClient;

const bodyParser = require('body-parser');

const db = require('./config/db');

const app = express();

//this is setting our port
const port = 2200;

//now you should see the body in the terminal
app.use(bodyParser.urlencoded({ extended: true}));

//this is connecting our MongoClient to our database
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
    require('./app/routes')(app, database);

    // //the database is not set up yet so we are passing in an empty object
    // require('./app/routes')(app, {});

    //this makes it so the app is listening to the port
    app.listen(port, () => {
        console.log('we are live on port: ' + port);
    });
});