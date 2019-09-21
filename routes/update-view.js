
var express = require('express');
var router = express.Router();
let mongoClient=require('mongodb').MongoClient;
let objectId=require('mongodb').ObjectId;
let assert=require('assert');


/* GET home page. */
router.get('/', function(req, res, next) {

    let url='mongodb://localhost:27017';

    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Database connection error' + err)

        } else {
            let myDB = client.db('signupdb');

            if (myDB) {
                console.log('show data');

                myDB.collection('formCollection').find().toArray( function (err,docs) {
                    if (err) {
                        console.log('error' + err)
                    } else {
                        console.log('displayed' + docs);

                        res.render('update-view',{data:docs});

                    }

                })
            }
        }

    });
});



module.exports = router;