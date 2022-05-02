const express = require('express');
const router = express.Router();
const userTemplate = require("../mongodb/user");

router.get('/:username/:background/:page', (req, res, next) => {
  const query = {"username": req.params.username};
  const update = {"$set": {"theme": {background: req.params.background, page: req.params.page}}};
  userTemplate.updateOne(query, update, (err) => {
    if (err) return;
  });
});

module.exports = router;