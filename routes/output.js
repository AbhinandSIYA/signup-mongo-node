var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/output', function(req, res, next) {
    res.render('output');
});

module.exports = router;