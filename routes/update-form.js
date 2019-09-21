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

                        //selecting radio button of gender
                        let gen;
                        if (docs._gender==='male'){
                            gen=true;
                        }else {
                            gen=false;
                        }

                        //selecting a checkbox
                        let far;
                        let assassin;
                        let nfs;
                        if (docs._games==='farcry'){
                            far=true;
                        }else if (docs._games==='assassins creed'){
                            assassin=true;
                        }
                        else if (docs._games==='need for speed'){
                            nfs=true;
                        }
                        let country=['India','Nepal','China','Angola'];
                        let options='';
                        country.forEach((data)=>{
                            if (data===docs._Select1){
                                options=options+`<option value='${data}' selected>${data}</option>`;
                            }else {
                                options=options+`<option value='${data}'>${data}</option>`;
                            }

                        });

                        res.render('update-form',{data:docs,gen:gen,far:far,assassin:assassin,nfs:nfs,select:options});

                    }

                })
            }
        }

    });
});


router.post('/update', function(req, res, next) {

    let id=req.body.id;

    let firstName=req.body._firstname;
    let lastName=req.body._lastname;
    let gender=req.body._gender;
    let country=req.body._Select1;
    let email=req.body._email;
    let userName=req.body._username;
    let password=req.body.password;
    let mob=req.body._phnumber;
    let game=req.body._games;

    console.log(id);

    let url='mongodb://localhost:27017';


    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Database connection error' + err)

        } else {
            let myDB = client.db('signupdb');

            if (myDB) {
                console.log('reached');

                myDB.collection('formCollection').updateOne({_id:objectId(id)},{ $set: { _firstname: firstName, _lastname: lastName, _gender: gender, _Select1: country, _email: email, _username: userName,password: password, _phnumber: mob, _games: game }}, function (err,docs) {
                    if (err) {
                        console.log('error' + err)
                    } else {
                        console.log('Updated' + docs);

                        res.redirect('/update-view');
                    }

                })
            }
        }

    });
});

router.post('/delete', function(req, res, next) {

    let id=req.body.id;

    console.log(id);


    let url='mongodb://localhost:27017';

    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Database connection error' + err)

        } else {
            let myDB = client.db('signupdb');

            if (myDB) {

                myDB.collection('formCollection').deleteOne({_id:objectId(id)}, function (err,docs) {
                    if (err) {
                        console.log('error' + err)
                    } else {
                       // console.log('displayed' + docs);

                        res.send(true);

                    }

                })
            }
        }

    });
});



module.exports = router;