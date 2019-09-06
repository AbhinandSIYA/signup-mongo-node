var express = require('express');
var router = express.Router();
let mongoClient=require('mongodb').MongoClient;


router.post('/',function (req,res) {

    let url = 'mongodb://localhost:27017';

    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Database connection error' + err)

        } else {
            let myDB = client.db('signupdb');

            myDB.collection('formCollection').findOne({_email:email}, function (err, user) {

                if (user) {
                    res.send(false);
                } else {
                    res.send(true);
                }
            })

        }

    })
});
module.exports = router;