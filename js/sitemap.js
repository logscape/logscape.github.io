//nar = $(".col-md-11")
//nar.html('')


var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			//console.log("calling 1")
		    if (xhr.readyState == 4) {
		    	try {
		    		var NAV = $(".col-md-11");
					NAV.html('');
		    		doNav(xhr.responseText);
		    	} catch (err) {
		    		console.log(err.stack)
		    	}

		        
		    }
		}
		xhr.open('GET', '/sitemap/nav.json', true);
		xhr.send(null);

function doNav(blah){
	var NAV = $(".col-md-11");
	NAV.html('')
	var json = JSON.parse(blah)

	var PROTO = "<li id='ID'><a href='REF'>KEY</a></li>";
	for(var i = 0; i < 8; i++){ 
		console.log(json.index[i]) 
		var cur = json.index[i]
		NAV.html(NAV.html() + PROTO.replace('ID', cur.display.replace(/ /g,'_')).replace('REF', cur.url).replace('KEY',cur.display));
		renderChildren(NAV, json.index[i].children)
		renderChildren(NAV, json.index[i].hiddenchildren)		
	}
}

function renderChildren(nav, children){
	for(var j = 0; j < children.length; j++){
			nav.html(nav.html() + "<ul><a href='" + children[j].url + "''> " + children[j].display + "</a></ul>")
			console.log("<ul><a href='" + children[j].url + "> " + children[j].display + "</a></ul>")
		}
}