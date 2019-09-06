var express = require('express');
var router = express.Router();
let mongoClient=require('mongodb').MongoClient;


router.post('/',function (req,res) {

    let email=req.body._email;
    let userName=req.body._username;

    let url = 'mongodb://localhost:27017';

    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Database connection error' + err)

        } else {
            let myDB = client.db('signupdb');

            if (myDB){
                myDB.collection('formCollection').find({_email:email,_username:userName}, function (err, user) {

                    if (user) {
                        res.send(false);
                    } else {
                        res.send(true);
                    }
                })
            }
        }

    })
});

module.exports = router;