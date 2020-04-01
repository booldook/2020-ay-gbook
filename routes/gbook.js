const path = require('path');
const router = require('express').Router();
const connect = require('../modules/mysql');
const moment = require('moment');
const pager = require('../modules/pager');
const { upload } = require('../modules/multer');

router.get(["/", "/list", "/list/:page"], async (req, res, next) => {
	let page = Number(req.params.page || 1);
	req.app.locals.page = page;
	let sql, sqls, result, pagerVals;
	sql = "SELECT count(id) FROM gbook"; // gbook의 모든 행-row(record)의 갯수
	try {
		result = await connect.execute(sql);
		console.log(	result[0][0]["count(id)"]	);
		pagerVals = pager({ 
			page, 
			total: result[0][0]['count(id)'], 
			list: 3,
			grp: 3 
		});
		console.log(pagerVals);
		sql = "SELECT * FROM gbook ORDER BY id DESC LIMIT ?, ?";
		sqls = [pagerVals.stRec, pagerVals.list];
		result = await connect.execute(sql, sqls);
		// res.json(	moment(result[0][6].created).format('MM-DD HH:mm:ss')	);
		let ext;
		for(let v of result[0]) {
			v.created = moment(v.created).format('MM-DD HH:mm:ss');
			if(v.realfile) {
				v.realfile = "/storages/"+v.realfile.substr(0, 6)+"/"+v.realfile;
				ext = path.extname(v.realfile).substr(1).toLowerCase();
				if(ext === "jpeg") ext = "jpg";
				v.icon = "/img/"+ext+".png";
			}
		}
		res.render("gbook", {name: "gbook", lists: result[0], pager: pagerVals});
		// res.json(result[0]);
	}
	catch(err) {
		next(err);
	}
});

router.post("/save", upload.single("upfile"), async (req, res, next) => {
	let { writer, content } = req.body;
	let sql, result, sqls = [writer, content];
	sql = "INSERT INTO gbook SET writer=?, content=?";
	if(req.file) {
		sql += " , orifile=?, realfile=?";
		sqls.push(req.file.originalname);
		sqls.push(req.file.filename);
	}
	result = await connect.execute(sql, sqls);
	res.redirect("/gbook");
});

router.get("/delete/:id", async (req, res, next) => {
	let id = req.params.id;
	let sql, result;
	sql = "DELETE FROM gbook WHERE id=?";
	result = await connect.execute(sql, [id]);
	res.redirect("/gbook");
});

router.post("/api/get", async (req, res, next) => {
	let id = req.body.id;
	let sql, result;
	sql = "SELECT * FROM gbook WHERE id=?";
	result = await connect.execute(sql, [id]);
	res.json(result[0][0]);
});

router.get("/api/max", async (req, res, next) => {
	let sql, result;
	sql = "SELECT id FROM gbook ORDER BY id DESC LIMIT 0, 1";
	result = await connect.execute(sql);
	res.json(result[0][0]);
});

router.post("/update", async (req, res, next) => {
	let {id, writer, content} = req.body;
	let sql, result;
	sql = "UPDATE gbook SET writer=?, content=?, updated=NOW() WHERE id=?";
	result = await connect.execute(sql, [writer, content, id]);
	res.redirect("/gbook");
});


router.get("/download/:id", async (req, res, next) => {
	let sql = "SELECT realfile, orifile FROM gbook WHERE id="+req.params.id;
	const result = await connect.execute(sql);
	let file = path.join(__dirname, "../uploads/" + result[0][0].realfile.substr(0, 6) + "/" + result[0][0].realfile);
	// res.json(result[0][0]);
	res.download(file, result[0][0].orifile);
});

module.exports = router;