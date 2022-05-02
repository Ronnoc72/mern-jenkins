const { json } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const userTemplate = require("../mongodb/user");

const updateTempate = (query, updateObj) => {
	userTemplate.updateOne(query, updateObj, (err) => {
		if (err) console.error("Err: ", err);
	});
}

router.get('/:title/:text/:styles/:username/:id', (req, res, next) => {
	let query = {"username": req.params.username};
	const index = req.params.id;
	// the update that creates a new file.
	let pushUpdate = {"$push": {"documents": 
	{"title": req.params.title, "text": req.params.text, "styles": req.params.styles}}};
	// the updates that renews a file, with an index.
	let update = {[`documents.${index}`]: {"title": req.params.title, "text": req.params.text, "styles": req.params.styles}};
	userTemplate.findOne(query, (err, person) => {
		if (err) console.error("Err: ", err);
		if (person) {
			if (!person.documents[0]) {
				// if the person doesn't have any documents at first.
				updateTempate(query, pushUpdate);
				return;
			}
			// using the push variable to avoid repeat documents from forming.
			if (person.documents[index]) {
				console.log("update");
				updateTempate(query, update);
				return;
			}
			console.log("push");
			updateTempate(query, pushUpdate);
		}
	});
});

module.exports = router;
