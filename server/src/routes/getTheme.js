const express = require('express');
const router = express.Router();
const userTemplate = require("../mongodb/user");

router.get('/:username', (req, res, next) => {
    userTemplate.findOne({"username": req.params.username}, (err, person) => {
        if (err) console.log(err);
        if (person) {
          if (person.theme) res.json({theme: person.theme});
        }
    });
});

module.exports = router;