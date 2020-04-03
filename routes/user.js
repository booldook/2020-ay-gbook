const router = require('express').Router();
const connect = require('../modules/mysql');
const bcrypt = require('bcrypt'); // 암호화 bcrypt.hash(), bcrypt.compare()
const { alert } = require('../modules/util');
const { isLogin, isLogout } = require('../modules/auth');

router.get("/signup", isLogout, (req, res, next) => {
	// isLogout(req, res, next);
	res.render("signup", {name: "user"});
});

router.post('/join', async (req, res, next) => {
	let { userid, userpw, username, email } = req.body;
	let sql, sqls, result, pugs;
	sql = "INSERT INTO user SET userid=?, userpw=?, username=?, email=?";
	//userpw = crypto.createHash('sha512').update(userpw + process.env.passSalt).digest('base64');
	userpw = await bcrypt.hash(userpw + process.env.PASS_SALT, 8);
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

router.post("/login", async (req, res, next) => {
	let { userid, userpw } = req.body;
	let sql = "SELECT * FROM user WHERE userid=?";
	let result = await connect.execute(sql, [userid]);
	if(result[0][0]) {
		if(await bcrypt.compare(userpw + process.env.PASS_SALT, result[0][0].userpw)) {
			req.session.user = {};
			req.session.user.id = result[0][0].id;
			req.session.user.userid = result[0][0].userid;
			req.session.user.username = result[0][0].username;
			req.session.user.email = result[0][0].email;
			res.redirect("/");
		}
		else {
			res.send(alert("아이디와 패스워드를 확인하세요.", "/"));
		}
	}
	else {
		res.send(alert("아이디와 패스워드를 확인하세요.", "/"));
	}
});

router.get("/logout", (req, res, next) => {
	req.session.destroy();
	res.send(alert("로그아웃 되었습니다.", "/"));
});

module.exports = router;