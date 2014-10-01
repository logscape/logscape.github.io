function appendQuery(e){ 
	if (e.keyCode == 13) { 
		var q=$("#searchBox").val(); 
		console.log(q) ; 
		$("#searchBox").val(appendSite(q)); 
		console.log(">>"+ appendSite("moo")); 
	} 
} 


