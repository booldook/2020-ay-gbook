function onChg(el, id) {
	$.post("/gbook/api/get", {id: id}, function(res){
		// document.wrForm.writer.value = res.writer;
		// document.wrForm.content.value = res.content;
		// $("input[name='writer']").val(res.writer);
		// $("textarea[name='content']").val(res.content);
		var f = document.wrForm;
		$(f.writer).val(res.writer);
		$(f.content).val(res.content);
	});
}

function onRev(el, id) {
	if(confirm("정말로 삭제하시겠습니까?")) {
		location.href = "/gbook/delete/"+id;
	}
}