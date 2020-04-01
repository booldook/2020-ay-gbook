const multer = require("multer");
const path = require("path"); //node
const fs = require("fs"); //node
const moment = require("moment");

/* 해야될 일 */
// 1. 저장할 폴더 생성 - D:/node/booldook/uploads/200331
// 2. 저장할 파일명 생성 - 200331-1534523457-237.jpg
// 3. 허용된 파일만 필터링
// 4. 파일 저장

/* 저장할 폴더 생성 */
const makeFolder = () => {
	let folder = path.join(__dirname, "../uploads/" + moment(new Date()).format("YYMMDD"));
	if(!fs.existsSync(folder)) fs.mkdirSync(folder);
	return folder;
}

/* 저장할 파일명 생성 */
const makeFile = (filename) => {
	let ext = path.extname(filename); // 정리.jpg -> .jpg
	return moment(new Date()).format("YYMMDD") + "-" + Date.now() + "-" + Math.floor(Math.random()*900+100) + ext;
}

/* 허용된 파일만 필터링 */
const filter = (req, file, cb) => {
	let ext = path.extname(file.originalname).toLowerCase();
	if(['.jpg', '.jpeg', '.gif', '.png', '.pdf'].indexOf(ext) > -1) cb(null, true);
	else cb(null, false);
}

/* 파일저장 */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, makeFolder());
	},
	filename: (req, file, cb) => {
		cb(null, makeFile(file.originalname));
	}
});

module.exports = { upload: multer({ storage, filter }) };