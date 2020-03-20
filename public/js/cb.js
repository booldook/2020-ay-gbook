/*
var sum = 0;
for(var i=1; i<=10000; i++) {
	sum += i; // sum = sum + i;
}
console.log(sum);
*/

/*
function hap(st, ed, cb) {
	setTimeout(function(){
		var sum = 0;
		for(var i=st; i<=ed; i++) {
			sum += i;
		}
		cb(sum);
	}, 0);
}

console.log("start");
hap(1, 100000000, function(res){
	console.log("callback");
	// $("body").html('<h1>'+res+'</h1>');
});
console.log("end");
*/

/*
console.log("start");
setTimeout(function(){
	console.log("cb");
}, 0);
console.log("end");
*/

/*
$.ajax({
	url: "/gbook/api/max",
	type: "GET",
	dataType: "json",
	success: function(res) {
		$.ajax({
			url: "/gbook/api/get",
			type: "POST",
			dataType: "json",
			data: {id: res.id},
			success: function(res2){
				console.log(res2);
			}
		})
	}
});
*/

/*
$.ajax({
	url: "/gbook/api/max",
	type: "GET",
	dataType: "json",
})
.then(function(res){
	return $.ajax({
		url: "/gbook/api/get",
		type: "POST",
		dataType: "json",
		data: {id: res.id}
	});
})
.then(function(res2){
	console.log(res2);
})
.catch(function(err) {
	console.log(err);
});
*/

(async function () {
	try {
		var res = await $.ajax({
			url: "/gbook/api/max",
			type: "GET",
			dataType: "json",
		});
		var res2 = await $.ajax({
			url: "/gbook/api/get",
			type: "POST",
			dataType: "json",
			data: {
				id: res.id
			}
		});
		console.log(res2);
	} catch (err) {
		console.log(err);
	}
})();