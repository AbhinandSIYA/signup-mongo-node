var express = require('express');
var router = express.Router();
let mongoClient=require('mongodb').MongoClient;


router.post('/phnum',function (req,res) {

    let mob=req.body._phnumber;

    let url = 'mongodb://localhost:27017';

    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Database connection error' + err)

        } else {
            let myDB = client.db('signupdb');

            if (myDB){
                myDB.collection('formCollection').findOne({_phnumber:mob}, function (err, user) {
                    console .log(user)
                    if(err){
                        console.log("error")
                    }else{
                        if (user) {
                            res.send(false);
                        } else {
                            res.send(true);
                        }
                    }

                })
            }
        }

    })
});


router.post('/email',function (req,res) {

    let email=req.body._email;

    let url = 'mongodb://localhost:27017';

    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Database connection error' + err)

        } else {
            let myDB = client.db('signupdb');

            if (myDB){
                myDB.collection('formCollection').findOne({_email:email}, function (err, user) {
                    console .log(user)
                    if(err){
                        console.log("error")
                    }else{
                        if (user) {
                            res.send(false);
                        } else {
                            res.send(true);
                        }
                    }

                })
            }
        }

    })
});

module.exports = router;