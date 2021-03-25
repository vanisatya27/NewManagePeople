// import required essentials
const express = require('express');
// creates a new router
const router = express.Router();

// create a JSON person information in an array
let personInfo = [
    { firstName: 'Joy', lastName: 'Papa', dateOfBirth: '1978/12/08', emailAddress: 'joy@gmail.com', socialSecurityNumber: 123456789, },
    { firstName: 'Harper', lastName: 'Kiwi', dateOfBirth: '1971/01/12', emailAddress: 'harper@gmail.com', socialSecurityNumber: 111556666, },
    { firstName: 'Linda', lastName: 'Nelison', dateOfBirth: '1960/04/03', emailAddress: 'linda@outlook.com', socialSecurityNumber: 418779002, },
    { firstName: 'Jalpa', lastName: 'Jack', dateOfBirth: '1985/03/10', emailAddress: 'jalpa@gmail.com', socialSecurityNumber: 123456789, },
    { firstName: 'Santosh', lastName: 'Papa', dateOfBirth: '1976/02/18', emailAddress: 'santosh@gmail.com', socialSecurityNumber: 324553545, },
    { firstName: 'Chintu', lastName: 'Kiwi', dateOfBirth: '1985/05/16', emailAddress: 'chintu@gmail.com', socialSecurityNumber: 565202389, },
];

//Create Const for FristName, LastName, DateOfBirth and emailPattern(To validate pattern)
const firstNamePattern = /^[a-zA-Z0-9 ]{2,30}$/;
const lastNamePattern = /^[a-zA-Z0-9 ]{2,30}$/;
const dateOfBirthPattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//From the API End-Point returns data in an array in JSON format
router.get('/', (req, res) => {
    res.status(200).json(personInfo);
});

// This API End-Point returns an object from a personInfo array find by social security number
router.get('/:socialSecurityNumber', (req, res) => {
    // Below code, finds an object from "personInfo" array by using "Social Security Number"
    let found = personInfo.find((personSocialSecurityNumber) => 
         parseInt(personSocialSecurityNumber.socialSecurityNumber, 10) === parseInt(req.params.socialSecurityNumber, 10)
    );
    // if object is found returns an object else returns 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// Post(Create a new person information)
//This API End-Point create an new object person information
//If SSN is already exists, then it won't create new person information. It's throw an error. 
router.post('/', (req, res) => {
        const foundEntry = personInfo.find((person) => parseInt(person.socialSecurityNumber, 10) === parseInt(req.body.socialSecurityNumber, 10));
        if (foundEntry) {
            res.status('400').json('Social Security number already exists');
        } else if (!emailPattern.test(req.body.emailAddress)) {
            res.status('400').json('Enter a valid email address');
        } else if (!firstNamePattern.test(req.body.firstName)) {
            res.status('400').json('Enter a valid first name');
        } else if (!lastNamePattern.test(req.body.lastName)) {
            res.status('400').json('Enter a valid last name');
        } else if (!dateOfBirthPattern.test(req.body.dateOfBirth)) {
            res.status('400').json('Enter a valid date of birth');
        } else {
            let newPersonInfo = {  //Create new Person information
                firstName: req.body.firstName, //  The "first name" gets data from POST req
                lastName: req.body.lastName,  // The "last name" gets datafrom POST req
                dateOfBirth: req.body.dateOfBirth, // The "date of birth" gets data  from POST req 
                emailAddress: req.body.emailAddress, // The "email address" gets data from POST req 
                socialSecurityNumber: req.body.socialSecurityNumber, // The "social security number" gets date from POST req
            }
            personInfo.push(newPersonInfo);
            res.status(201).json(newPersonInfo)
        }
    },
);

// Put(Updates existing Person information(FirstName, LastName, DateOfBirth and EmailAddress. We cannot updates SSN))
//This API End-Point updates the existing object person information
router.put('/:socialSecurityNumber', (req, res) => {
    // get person information by matching by  "Social Security Number"
    let foundIndex = personInfo.findIndex((person) => 
        parseInt(person.socialSecurityNumber, 10) === parseInt(req.params.socialSecurityNumber, 10)
    );
    if (foundIndex >= 0) {
        if (req.body.firstName && firstNamePattern.test(req.body.firstName)) {
            personInfo[foundIndex].firstName = req.body.firstName;
        }
        if (req.body.lastName && lastNamePattern.test(req.body.lastName)) {
            personInfo[foundIndex].lastName = req.body.lastName;
        }
        if (req.body.dateOfBirth && dateOfBirthPattern.test(req.body.dateOfBirth)) {
            personInfo[foundIndex].dateOfBirth = req.body.dateOfBirth;
        }
        if (req.body.emailAddress && emailPattern.test(req.body.emailAddress)) {
            personInfo[foundIndex].emailAddress = req.body.emailAddress;
        }
        // If person information is updated then the return success code 200 means
        // that the updated has successfully
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});


// DELETE THE SPECIFIC PERSON INFORMATION WITH THE HELP OF "SOCIAL SECURITY NUMBER"
// Below code, this API End-Point deletes an existing person information from an
// personInfo(array), with the help of "Social Security Number", finds the person information and then delete it.
router.delete('/:socialSecurityNumber', (req, res) => {
    // find person information from array of personInfo
    let foundIndex = personInfo.findIndex((personSocialSecurityNumber) => 
        parseInt(personSocialSecurityNumber.socialSecurityNumber, 10) === parseInt(req.params.socialSecurityNumber, 10)
    );

    if (foundIndex >= 0) {
        // splice means delete item from `data` array using index
        personInfo.splice(foundIndex, 1);
        // If person information is deleting then return with the status code "200"
        // The code 200 indicates that the request is successfully
        res.sendStatus(200);
    } else {
        //If we tries to deletes the "Social Security Number" not exists,then It returns missing code 404
        res.sendStatus(404);
    }
});

// module.exports is an object included in every JS file of Node.js
// application, whatever we assign to module.exports will be exposed as a module. 

module.exports = router;