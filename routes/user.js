const router = require('express').Router();
const connect = require('../modules/mysql');
const bcrypt = require('bcrypt'); // 암호화 bcrypt.hash(), bcrypt.compare()
const { alert } = require('../modules/util');

router.get("/signup", (req, res, next) => {
	res.render("signup", {name: "user"});
});

router.post('/join', async (req, res, next) => {
	let { userid, userpw, username, email } = req.body;
	let sql, sqls, result, pugs;
	sql = "INSERT INTO user SET userid=?, userpw=?, username=?, email=?";
	//userpw = crypto.createHash('sha512').update(userpw + process.env.passSalt).digest('base64');
	userpw = await bcrypt.hash(userpw + process.env.passSalt, 8);
	sqls = [userid, userpw, username, email];
	result = await connect.execute(sql, sqls);
	res.send(alert("회원가입이 정상 처리되었습니다.", "/"));
});

router.post('/idchk', async (req, res, next) => {
	const userid = req.body.userid;
	const sql = "SELECT userid FROM user WHERE userid=?";
	const result = await connect.execute(sql, [userid]);
	res.json(result[0]);
});



module.exports = router;