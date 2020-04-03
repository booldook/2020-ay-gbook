const router = require('express').Router();

router.get("/", (req, res, next) => {
	res.redirect("/gbook");
});

module.exports = router;