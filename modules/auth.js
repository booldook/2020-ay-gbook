const { alert } = require('./util');

const isLogin = (req, res, next) => {
	if(req.session.user) next();
	else res.send(alert("정상적인 접근이 아닙니다. 로그인 해 주세요.", "/"));
}

const isLoginDownload = (req, res, next) => {
	if(req.session.user) next();
	else res.send(alert("회원만 사용하실 수 있습니다. 로그인 해 주세요.", "/"));
}

const isLogout = (req, res, next) => {
	if(!req.session.user) next();
	else res.send(alert("로그인 상태에서는 사용하실 수 없습니다.", "/"));
}

module.exports = { isLogin, isLogout, isLoginDownload };