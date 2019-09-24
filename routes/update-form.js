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
                        let country=["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
                            ,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
                            ,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
                            ,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
                            ,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
                            ,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
                            ,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
                            ,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
                            ,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
                            ,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
                            ,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
                            ,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
                            ,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
                            ,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay"
                            ,"Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
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

                myDB.collection('formCollection').updateOne({_id:objectId(id)},{ $set: { _firstname: firstName, _lastname: lastName, _gender: gender, _Select1: country, _username: userName,password:password, _games: game }}, function (err,docs) {
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