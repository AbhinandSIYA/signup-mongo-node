var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/success', function(req, res, next) {
    res.render('success');
});

module.exports = router;