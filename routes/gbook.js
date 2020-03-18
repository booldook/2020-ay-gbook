const router = require('express').Router();

router.get("/", (req, res, next) => {
	res.render("gbook", {name: "gbook"});
});

module.exports = router;