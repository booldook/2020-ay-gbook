const router = require('express').Router();

router.get("/", (req, res, next) => {
	console.log(req.session);
	res.render("index", {name: "index"});
});

module.exports = router;