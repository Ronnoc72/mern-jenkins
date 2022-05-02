var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log("this is working.");
});

module.exports = router;
