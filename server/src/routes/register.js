const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const userTemplate = require("../mongodb/user");

router.get('/:username/:password', (req, res, next) => {
    userTemplate.findOne({"username": req.params.username, "password": req.params.password}, (err, person) => {
        if (err) console.log(err);
        if (person) {
            res.json({user: req.params.username});
        } else {
            const user = new userTemplate({
                _id: mongoose.Types.ObjectId(),
                username: req.params.username,
                password: req.params.password,
                documents: [],
                theme: {}
            });
            user.save(err => {
                if (err) console.error(err);
            });
        }
    });
});

module.exports = router;
