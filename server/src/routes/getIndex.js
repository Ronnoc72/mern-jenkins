const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userTemplate = require("../mongodb/user");

router.get('/:username/:title/:text/:styles', function(req, res, next) {
  let obj = {"title": req.params.title, "text": req.params.text, "styles": req.params.styles};
  userTemplate.findOne({"username": req.params.username}, (err, person) => {
    if (err) console.error("Err: ", err);
    if (person) {
      if (!person.documents[0]) {
        res.json({index: 0});
        return;
      }
      for (let i = 0; i < person.documents.length; i++) {
        if (person.documents[i].title === obj.title) {
          res.json({index: i});
          return;
        }
      }
      res.json({index: person.documents.length});
    }
  })
});

module.exports = router;