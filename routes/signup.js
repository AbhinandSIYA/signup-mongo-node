var express = require('express');
var router = express.Router();
let mongoClient=require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/',function (req,res) {
    let firstName=req.body._firstname;
    let lastName=req.body._lastname;
    let gender=req.body._gender;
    let country=req.body._Select1;
    let email=req.body._email;
    let userName=req.body._username;
    let mob=req.body._phnumber;
    let password=req.body.password;
    let game=req.body._games;

    console.log(firstName)

    let url='mongodb://localhost:27017'

    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Database connection error' + err)

        } else {
            let myDB = client.db('signupdb');

            if (myDB) {
                console.log('connected');

                myDB.collection('formCollection').insertOne({
                    _firstname: firstName,
                    _lastname: lastName,
                    _gender: gender,
                    _Select1: country,
                    _email: email,
                    _username: userName,
                    _phnumber: mob,
                    password: password,
                    _games: game
                }, function (err, result) {
                    if (err) {
                        console.log('error' + err)
                    } else {
                        console.log('successfully inserted' + result)

                        res.redirect("/success")

                    }

                })
            }
        }

    })
});
module.exports = router;
