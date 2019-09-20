var express = require('express');
var router = express.Router();
let mongoClient=require('mongodb').MongoClient;
let objectId=require('mongodb').ObjectId;

router.get('/', function(req, res, next) {

    let id=req.query.id;


    let url='mongodb://localhost:27017';

    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Database connection error' + err)

        } else {
            let myDB = client.db('signupdb');

            if (myDB) {
                console.log('connected');

                myDB.collection('formCollection').findOne({_id:objectId(id)}, function (err,docs) {
                    if (err) {
                        console.log('error' + err)
                    } else {
                        console.log('displayed' + docs);


                        res.render('update-form',{data:docs});

                    }

                })
            }
        }

    });
});


// router.post('/update', function(req, res, next) {
//
//     let firstName=req.body._firstname;
//     let id=req.body._id;
//
//     console.log(firstName);
//     console.log(id);
//
//     let url='mongodb://localhost:27017';
//
//
//     mongoClient.connect(url, function (err, client) {
//         if (err) {
//             console.log('Database connection error' + err)
//
//         } else {
//             let myDB = client.db('signupdb');
//
//             if (myDB) {
//                 console.log('reached');
//
//                 myDB.collection('formCollection').updateOne({"_id":objectId(id)},{$set:{_firstname:firstName}}, function (err,docs) {
//                     if (err) {
//                         console.log('error' + err)
//                     } else {
//                         console.log('Updated' + docs);
//
//
//                     }
//
//                 })
//             }
//         }
//
//     });
// });


module.exports = router;