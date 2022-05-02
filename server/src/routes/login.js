const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userTemplate = require("../mongodb/user");

router.get('/:username/:password', (req, res, next) => {
    userTemplate.findOne({"username": req.params.username, "password": req.params.password}, (err, person) => {
        if (err) console.log(err);
        if (person) {
            res.json({mes: "Logged In"});
            return;
        }
        res.json({mes: "Account doesn't exist"});
    });
});

module.exports = router;
