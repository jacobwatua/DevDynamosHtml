const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const dotEnv = require("dotenv").config();
const port = process.env.PORT || 3000;


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('../client/build'));

app.get('/', function (req, res) {
    res.sendFile(path.resolve('../client/build/home.html'));
});

app.listen(port, function () {
    console.log('Server listening on port!', port);
});
