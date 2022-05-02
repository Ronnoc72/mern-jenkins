const express = require('express');
const router = express.Router();
const userTemplate = require("../mongodb/user");

router.get('/:username/:id', (req, res, next) => {
    userTemplate.findOne({"username": req.params.username}, (err, person) => {
        if (err) console.log(err);
        if (person) {
        	res.json({doc: person.documents[req.params.id]});
        }
    });
});

module.exports = router;