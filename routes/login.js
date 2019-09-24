var express = require('express');
var router = express.Router();
let mongoClient=require('mongodb').MongoClient;



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});


router.post('/signin',function (req,res) {

    let email=req.body._email;
    let password=req.body._password;

    console.log(email);


    let url = 'mongodb://localhost:27017';



    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Database connection error' + err)

        } else {
            let myDB = client.db('signupdb');

            if (myDB){
                myDB.collection('formCollection').findOne({_email:email,_password:password}, function (err, user)  {
                    if (err) {
                        console.log('error', err)
                        res.send(false);
                    } else {

                        if(user){
                            res.send(true);
                        }
                        else{
                            res.send(false)
                        }

                    }

                })
            }
        }

    })
});


module.exports = router;