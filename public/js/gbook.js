function onChg(el, id) {
	$.post("/gbook/api/get", {id: id}, function(res){
		// document.wrForm.writer.value = res.writer;
		// document.wrForm.content.value = res.content;
		// $("input[name='writer']").val(res.writer);
		// $("textarea[name='content']").val(res.content);
		var f = document.wrForm;
		$(f.writer).val(res.writer);
		$(f.content).val(res.content);
		$("#btSave").removeClass("btn-primary").addClass("btn-success").text("저장");
		$("#btReset").text("취소");
		$(f.id).val(res.id);
		f.action = "/gbook/update";
	});
}

function onReset() {
	var f = document.wrForm;
	$("#btSave").removeClass("btn-success").addClass("btn-primary").text("글 남기기");
	$("#btReset").text("다시작성");
	$(f.id).val("");
	f.action = '/gbook/save';
}

function onRev(el, id) {
	if(confirm("정말로 삭제하시겠습니까?")) {
		location.href = "/gbook/delete/"+id;
	}
}
