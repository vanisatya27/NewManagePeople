/*In package.json, downloded nodemon. Use of nodemon to relaunch a debug session automatically, whenever the JavaScript source has been changed.*/

// Imports the required essentials to work
const http = require('http');
//
const express = require('express');
//
const bodyParser = require('body-parser')
var cors = require('cors');

// Import personInfo from "routes" folder 
const personsRouter = require('./routes/PersonInfo.js');
const expressValidator = require('express-validator');
// creates a new app
const app = express();
app.use(express.json());
//app.use(bodyParser.json())
//app.use(expressValidator())


// Below is the URL to access the APIs end-points
app.use(cors({origin: 'http://localhost:3000'}));

/* Here '/persons' URL will have four end-points:
First : http://www.localhost:3000/persons/ (This displays or return the objest of an array)
Second: http://www.localhost:3000/personInfo/:id (This display or return the single object of an array)
Third:  http://www.localhost:3000/ (This display "Work Successfully" message)
Fourth: http://www.localhost:3000/personInfo/:socialSecurityNumber (This displays the single object of any array)
*/
app.use('/persons', personsRouter);

// default URL to API
app.use('/', function(req, res) {
    res.send('Works Successfully');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('The Server is listening on port ' + port);