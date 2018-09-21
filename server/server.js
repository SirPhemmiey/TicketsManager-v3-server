
require('dotenv').config();
import express from 'express';
import path from 'path';
import mongoose, { mongo } from 'mongoose';
import bodyParser from 'body-parser';
require('babel-polyfill');
const Router = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

//use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', Router);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET POST PUT DELETE OPTIONS");
    next();
});

//if (process.env.NODE_ENV === 'production') {
    //serve static files
    // app.use(express.static(path.join(__dirname, '../client/build')));

    // //Handle React routing, return all request to React app
    // app.get("*", function(req, res) {
    //     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    // });
//}

app.listen(port, () => {
    console.log(`Listening with 🔥 on port ${port}`);
    mongoose.connect ("mongodb://sirphemmiey:Algorithm212...@ds133262.mlab.com:33262/tickets-v2", () => {
        console.log("Database Connection is established 😄");
    });
});

export default app;