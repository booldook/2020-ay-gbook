// page: 요청한 페이지
// total: 전체 게시물 수
// cnt: 세트의 갯수(1,2,3)(4,5,6)(7) -> 3
const pager = (obj) => {
	if(!obj.list) obj.list = 3;	// 한페이지에 나타날 목록의 갯수
	if(!obj.grp) obj.grp = 3;		// 페이저에 나타날 페이지 수(1,2,3)->3
	obj.std = 0; 								// 세트의 시작번호
	obj.end = 0; 								// 세트의 마지막번호
	obj.prev = 0;								// prev버튼 클릭시 갈 페이지
	obj.next = 0;								// next버튼 클릭시 갈 페이지
	obj.first = 0;							// first버튼 클릭시 갈 페이지
	obj.last = 0;								// last버튼 클릭시 갈 페이지
	obj.totalPage = Math.ceil(obj.total/obj.list);			// 전체 페이지 갯수
	obj.grpIndex = Math.floor((obj.page - 1)/obj.grp);	// 페이저 그룹의 Index
	obj.cntIndex = Math.ceil(obj.totalPage / obj.grp) - 1;	// 마지막 그룹 Index
	obj.stRec = (obj.page - 1) * obj.list; 	//sql에서 시작 레코드

	// 페이저 세트의 시작 숫자
	obj.std = obj.grpIndex * obj.grp + 1;
	
	// 페이저 세트의 마지막 숫자
	obj.end = obj.std + obj.grp - 1;
	if(obj.end > obj.totalPage) obj.end = obj.totalPage;
	
	// first/prev 계산
	if(obj.page > 1) {
		obj.first = 1;
		obj.prev = obj.page - 1;
	}
	
	// last/next 계산
	if(obj.page < obj.totalPage) {
		obj.last = obj.totalPage;
		obj.next = obj.page + 1;
	}

	return obj;
}

module.exports = pager;

/*
// ES5에서 가변인자 사용법
let pagers = function (page, total, cnt) {
	if(!cnt) cnt = 3; 
}
pagers(1, 10, 5); // cnt=5
pagers(1, 10); // cnt=3 
*/