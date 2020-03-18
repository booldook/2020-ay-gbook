const router = require('express').Router();
const connect = require('../modules/mysql');
const moment = require('moment');

router.get("/", async (req, res, next) => {
	let sql, result;
	sql = "SELECT * FROM gbook ORDER BY id DESC";
	result = await connect.execute(sql);
	// res.json(	moment(result[0][6].created).format('MM-DD HH:mm:ss')	);
	for(let v of result[0]) {
		v.created = moment(v.created).format('MM-DD HH:mm:ss');
	}
	res.render("gbook", {name: "gbook", lists: result[0]});
});

router.post("/save", async (req, res, next) => {
	let { writer, content } = req.body;
	let sql, result;
	sql = "INSERT INTO gbook SET writer=?, content=?";
	result = await connect.execute(sql, [writer, content]);
	res.redirect("/gbook");
});

module.exports = router;